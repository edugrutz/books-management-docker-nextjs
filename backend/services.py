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
    }


def search_books(title=None, author_name=None, subject=None, page=1, page_size=10):
    """
    Função unificada para buscar livros por diferentes critérios.
    
    Args:
        title: Busca por título (LIKE)
        author_name: Busca por nome do autor (LIKE)
        subject: Busca por subject (exact match)
        page: Número da página (padrão: 1)
        page_size: Itens por página (padrão: 10)
    
    Returns:
        dict: Resposta padronizada com data e meta
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    # Construir query dinamicamente baseado nos parâmetros
    query = 'SELECT * FROM book WHERE 1=1'
    params = []
    search_meta = {}
    
    if title:
        query += ' AND title LIKE ?'
        params.append(f'%{title}%')
        search_meta['title'] = title
    
    if author_name:
        query += ' AND author LIKE ?'
        params.append(f'%{author_name}%')
        search_meta['author_name'] = author_name
    
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
    
    cursor.execute('SELECT COUNT(*) FROM book WHERE author_slug = ?;', (author_slug,))
    total_count = cursor.fetchone()[0]
    
    total_pages = math.ceil(total_count / page_size) if total_count > 0 else 0
    offset = (page - 1) * page_size
    
    # Executar query com paginação
    cursor.execute(
        'SELECT * FROM book WHERE author_slug = ? LIMIT ? OFFSET ?;',
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

    cursor.execute('SELECT COUNT(*) FROM book;')
    total_count = cursor.fetchone()[0]

    total_pages = math.ceil(total_count / page_size)

    offset = (page - 1) * page_size

    cursor.execute('SELECT * FROM book LIMIT ? OFFSET ?;', (page_size, offset))
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
        
        author = str(book_data['author']).strip()
        
        # Extrai campos opcionais (usa string vazia se não fornecido)
        author_slug = str(book_data.get('author_slug', '')).strip()
        author_bio = str(book_data.get('author_bio', '')).strip()
        authors = str(book_data.get('authors', '')).strip()
        publisher = str(book_data.get('publisher', '')).strip()
        synopsis = str(book_data.get('synopsis', '')).strip()
        
        # Execute a query to create a new book
        cursor.execute(
            'INSERT INTO book (title, author, author_slug, author_bio, authors, publisher, synopsis) VALUES (?, ?, ?, ?, ?, ?, ?);',
            (title, author, author_slug, author_bio, authors, publisher, synopsis)
        )
        
        conn.commit()
        conn.close()
        
        return success_response(data=None, meta={'message': 'Book created successfully.'}), 201
        
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
