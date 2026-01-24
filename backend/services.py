import sqlite3
import math


def get_connection():
    """
    Cria e retorna uma conexão com o banco de dados SQLite.
    
    Returns:
        sqlite3.Connection: Conexão configurada com row_factory = sqlite3.Row
    """
    conn = sqlite3.connect('db.sqlite')
    conn.row_factory = sqlite3.Row
    return conn


def success_response(data, meta=None):
    response = {"data": data}
    if meta:
        response["meta"] = meta
    return response


def error_response(message, status_code=400):
    return {"data": None, "meta": {"error": message}}, status_code


def serialize_book(book):
    """
    Serializa um registro de livro do banco de dados para dicionário.
    
    Args:
        book: sqlite3.Row retornado do banco de dados
    
    Returns:
        dict: Dicionário com os dados do livro
    """
    return {
        'id': book['id'],
        'title': book['title'],
        'author': book['author'],
        'biography': book['author_bio'],
        'authors': book['authors'],
        'publisher': book['publisher'],
        'synopsis': book['synopsis'],
        'pubdate': book['pubdate'],
        'pages': book['pages']
    }


def search_books(title=None, author_name=None, subject=None, q=None, pubdate=None, page=1, page_size=10):
    """
    Função unificada para buscar livros por diferentes critérios.
    
    Args:
        title: Busca por título (LIKE)
        author_name: Busca por nome do autor (LIKE)
        subject: Busca por subject (exact match)
        q: Busca geral por título, autor ou data de publicação (OR LIKE)
        page: Número da página (padrão: 1)
        page_size: Itens por página (padrão: 10)
    
    Returns:
        dict: Resposta padronizada com data e meta
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    # Construir query dinamicamente baseado nos parâmetros
    query = 'SELECT * FROM book WHERE id IS NOT NULL'
    params = []
    search_meta = {}
    
    if q:
        query += ' AND (title LIKE ? OR author LIKE ? OR pubdate LIKE ?)'
        params.extend([f'%{q}%', f'%{q}%', f'%{q}%'])
        search_meta['q'] = q
    
    if title:
        query += ' AND title LIKE ?'
        params.append(f'%{title}%')
        search_meta['title'] = title
    
    if author_name:
        query += ' AND author LIKE ?'
        params.append(f'%{author_name}%')
        search_meta['author_name'] = author_name
    
    if pubdate:
        query += ' AND pubdate LIKE ?'
        params.append(f'%{pubdate}%')
        search_meta['pubdate'] = pubdate
    
    if subject:
        query += ' AND subjects = ?'
        params.append(subject)
        search_meta['subject'] = subject
    
    count_query = query.replace('SELECT *', 'SELECT COUNT(*)')
    cursor.execute(count_query, params)
    total_count = cursor.fetchone()[0]
    
    total_pages = math.ceil(total_count / page_size) if total_count > 0 else 0
    offset = (page - 1) * page_size
    
    # Executar query com paginação
    query += ' LIMIT ? OFFSET ?'
    params.extend([page_size, offset])
    cursor.execute(query, params)
    books = cursor.fetchall()
    
    # Converter para lista de dicionários
    book_list = [serialize_book(book) for book in books]
    
    conn.close()
    
    return success_response(
        data=book_list,
        meta={
            'pagination': {
                'page': page,
                'page_size': page_size,
                'total': total_count,
                'total_pages': total_pages
            },
            'search': search_meta
        }
    )


def get_books_by_author_slug(author_slug, page=1, page_size=10):
    """
    Busca livros por slug do autor (exact match).
    
    Args:
        author_slug: Slug do autor (exact match)
        page: Número da página (padrão: 1)
        page_size: Itens por página (padrão: 10)
    
    Returns:
        dict: Resposta padronizada com data e meta
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute('SELECT COUNT(*) FROM book WHERE author_slug = ? AND id IS NOT NULL;', (author_slug,))
    total_count = cursor.fetchone()[0]
    
    total_pages = math.ceil(total_count / page_size) if total_count > 0 else 0
    offset = (page - 1) * page_size
    
    # Executar query com paginação
    cursor.execute(
        'SELECT * FROM book WHERE author_slug = ? AND id IS NOT NULL LIMIT ? OFFSET ?;',
        (author_slug, page_size, offset)
    )
    books = cursor.fetchall()
    
    book_list = [serialize_book(book) for book in books]
    
    conn.close()
    
    return success_response(
        data=book_list,
        meta={
            'pagination': {
                'page': page,
                'page_size': page_size,
                'total': total_count,
                'total_pages': total_pages
            },
            'author_slug': author_slug
        }
    )


def get_all_books(page=1, page_size=10):
    """
    Lista todos os livros com paginação.
    
    Args:
        page: Número da página (padrão: 1)
        page_size: Itens por página (padrão: 10)
    
    Returns:
        dict: Resposta padronizada com data e meta
    """
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT COUNT(*) FROM book WHERE id IS NOT NULL;')
    total_count = cursor.fetchone()[0]

    total_pages = math.ceil(total_count / page_size)

    offset = (page - 1) * page_size

    cursor.execute('SELECT * FROM book WHERE id IS NOT NULL LIMIT ? OFFSET ?;', (page_size, offset))
    books = cursor.fetchall()

    book_list = [serialize_book(book) for book in books]

    conn.close()
    return success_response(
        data=book_list,
        meta={
            'pagination': {
                'page': page,
                'page_size': page_size,
                'total': total_count,
                'total_pages': total_pages
            }
        }
    )


def get_authors():
    """
    Lista todos os autores.
    
    Returns:
        dict: Resposta padronizada com data e meta
    """
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM author;')
    authors = cursor.fetchall()

    author_list = []

    for author in authors:
        author_dict = {
            'id': author['id'],
            'title': author['title'],
            'slug': author['slug'],
            'biography': author['biography']
        }
        author_list.append(author_dict)

    conn.close()

    return success_response(data=author_list, meta={})


def get_all_subjects():
    """
    Lista todos os subjects.
    
    Returns:
        dict: Resposta padronizada com data e meta
    """
    conn = get_connection()
    cursor = conn.cursor()

    # Execute a SELECT query to fetch all subjects, and the slug from the table subject
    cursor.execute("SELECT subjects FROM book;")
    subjects = cursor.fetchall()

    conn.close()

    return success_response(data=subjects, meta={})


def create_new_book(book_data):
    """
    Cria um novo livro no banco de dados.
    
    Args:
        book_data: Dicionário com os dados do livro
    
    Returns:
        tuple: (dict resposta, int status_code)
    """
    # Validação de campos obrigatórios
    required_fields = ['title', 'author']
    
    missing_fields = [field for field in required_fields if field not in book_data]
    if missing_fields:
        return error_response(f'Campos obrigatórios faltando: {", ".join(missing_fields)}')
    
    empty_fields = [field for field in required_fields if not book_data[field] or not str(book_data[field]).strip()]
    if empty_fields:
        return error_response(f'Campos não podem estar vazios: {", ".join(empty_fields)}')

    title = str(book_data['title']).strip()
    if len(title) < 1 or len(title) > 500:
        return error_response('Título deve ter entre 1 e 500 caracteres')
    
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        # Gerar novo ID manualmente (tabela não tem PK/AutoIncrement)
        cursor.execute('SELECT MAX(id) FROM book;')
        max_id = cursor.fetchone()[0] or 0
        new_id = max_id + 1
        
        author = str(book_data['author']).strip()
        
        # Extrai campos opcionais (usa string vazia se não fornecido)
        author_slug = str(book_data.get('author_slug', '')).strip()
        author_bio = str(book_data.get('author_bio', '')).strip()
        authors = str(book_data.get('authors', '')).strip()
        publisher = str(book_data.get('publisher', '')).strip()
        synopsis = str(book_data.get('synopsis', '')).strip()
        pubdate = str(book_data.get('pubdate', '')).strip()
        pages = int(book_data.get('pages', 0))
        
        # Execute a query to create a new book
        cursor.execute(
            'INSERT INTO book (id, title, author, author_slug, author_bio, authors, publisher, synopsis, pubdate, pages) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
            (new_id, title, author, author_slug, author_bio, authors, publisher, synopsis, pubdate, pages)
        )
        
        conn.commit()
        
        # Buscar o livro recém-criado pelo ID gerado
        cursor.execute('SELECT * FROM book WHERE id = ?;', (new_id,))
        created_book = cursor.fetchone()
        
        conn.close()
        
        if not created_book:
            return error_response('Erro ao recuperar o livro criado', 500)
        
        book_dict = serialize_book(created_book)
        
        return success_response(data=book_dict, meta={'message': 'Book created successfully.'}), 201
        
    except sqlite3.Error as e:
        return error_response(f'Erro no banco de dados: {str(e)}', 500)
    except Exception as e:
        return error_response(f'Erro inesperado: {str(e)}', 500)


def delete_book_by_id(book_id):
    """
    Deleta um livro pelo ID.
    
    Args:
        book_id: ID do livro a ser deletado
    
    Returns:
        tuple: (dict resposta, int status_code)
    """
    conn = get_connection()
    cursor = conn.cursor()

    # Verifica se o livro existe antes de deletar
    cursor.execute('SELECT id FROM book WHERE id = ?;', (book_id,))
    book = cursor.fetchone()

    if not book:
        conn.close()
        return error_response('Book not found.', 404)

    # Executa a remoção
    cursor.execute('DELETE FROM book WHERE id = ?;', (book_id,))
    
    conn.commit()
    conn.close()

    return success_response(data=None, meta={'message': 'Book deleted successfully.'}), 200


def get_book_by_id(book_id):
    """
    Busca um livro pelo ID.
    
    Args:
        book_id: ID do livro
    
    Returns:
        tuple: (dict resposta, int status_code)
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute('SELECT * FROM book WHERE id = ?;', (book_id,))
        book = cursor.fetchone()
        conn.close()
        
        if not book:
            return error_response('Book not found.', 404)
            
        return success_response(data=serialize_book(book)), 200
    except sqlite3.Error as e:
        if conn: conn.close()
        return error_response(f'Erro no banco de dados: {str(e)}', 500)


def update_book_by_id(book_id, book_data):
    """
    Atualiza um livro pelo ID.
    
    Args:
        book_id: ID do livro
        book_data: Dicionário com os campos a serem atualizados
    
    Returns:
        tuple: (dict resposta, int status_code)
    """

    updatable_fields = ['title', 'author', 'author_slug', 'author_bio', 'authors', 'publisher', 'synopsis', 'pubdate', 'pages']
    
    # Filtrar dados para incluir apenas campos permitidos
    update_data = {k: v for k, v in book_data.items() if k in updatable_fields}
    
    if not update_data:
        return error_response('Nenhum campo válido para atualização fornecido')

    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        # Verifica se o livro existe
        cursor.execute('SELECT id FROM book WHERE id = ?;', (book_id,))
        if not cursor.fetchone():
            conn.close()
            return error_response('Book not found.', 404)

        # Construir query dinamicamente
        set_clause = ', '.join([f"{field} = ?" for field in update_data.keys()])
        params = list(update_data.values())
        params.append(book_id)
        
        query = f"UPDATE book SET {set_clause} WHERE id = ?;"
        cursor.execute(query, params)
        conn.commit()
        
        # Retornar o livro atualizado
        cursor.execute('SELECT * FROM book WHERE id = ?;', (book_id,))
        updated_book = cursor.fetchone()
        conn.close()
        
        if not updated_book:
            return error_response('Erro ao recuperar o livro atualizado', 500)
            
        return success_response(data=serialize_book(updated_book), meta={'message': 'Book updated successfully.'}), 200
        
    except sqlite3.Error as e:
        if conn: conn.close()
        return error_response(f'Erro no banco de dados: {str(e)}', 500)
    except Exception as e:
        if conn: conn.close()
        return error_response(f'Erro inesperado: {str(e)}', 500)
