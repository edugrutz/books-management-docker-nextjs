from flask import Blueprint, jsonify, request
from services import (
    search_books,
    get_books_by_author_slug,
    get_all_books,
    get_all_subjects,
    create_new_book,
    delete_book_by_id,
    get_book_by_id,
    update_book_by_id
)

books_bp = Blueprint('books', __name__)

@books_bp.route('/api/v1/books', methods=['GET'])
def get_books():
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)
    result = get_all_books(page=page, page_size=page_size)
    return jsonify(result)

@books_bp.route('/api/v1/books/author/<author_slug>', methods=['GET'])
def get_books_by_author(author_slug):
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)
    return jsonify(get_books_by_author_slug(author_slug=author_slug, page=page, page_size=page_size))

@books_bp.route('/api/v1/books/subjects', methods=['GET'])
def get_subjects():
    return jsonify(get_all_subjects())

@books_bp.route('/api/v1/books/subjects/<subject>', methods=['GET'])
def books_by_subject_slug(subject):
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)
    return jsonify(search_books(subject=subject, page=page, page_size=page_size))

@books_bp.route('/api/v1/books/search', methods=['GET'])
def search_books_route():
    title = request.args.get('title', default='', type=str)
    author_name = request.args.get('author_name', default='', type=str)
    q = request.args.get('q', default='', type=str)
    pubdate = request.args.get('pubdate', default='', type=str)
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)

    return jsonify(search_books(
        title=title if title else None,
        author_name=author_name if author_name else None,
        q=q if q else None,
        pubdate=pubdate if pubdate else None,
        page=page,
        page_size=page_size
    ))

@books_bp.route('/api/v1/books', methods=['POST'])
def create_book():
    book_data = request.get_json()
    if not book_data:
        return jsonify({'error': 'Corpo da requisição vazio ou inválido'}), 400
    
    result, status_code = create_new_book(book_data)
    return jsonify(result), status_code

@books_bp.route('/api/v1/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    result, status_code = delete_book_by_id(book_id)
    return jsonify(result), status_code

@books_bp.route('/api/v1/books/<int:book_id>', methods=['GET'])
def get_book_route(book_id):
    result, status_code = get_book_by_id(book_id)
    return jsonify(result), status_code

@books_bp.route('/api/v1/books/<int:book_id>', methods=['PUT'])
def update_book_route(book_id):
    book_data = request.get_json()
    if not book_data:
        return jsonify({'error': 'Corpo da requisição vazio ou inválido'}), 400
        
    result, status_code = update_book_by_id(book_id, book_data)
    return jsonify(result), status_code
