import sqlite3

from flask import Flask, jsonify, request
from flask_cors import CORS
from services import (
    search_books,
    get_books_by_author_slug,
    get_all_books,
    get_authors,
    get_all_subjects,
    create_new_book,
    delete_book_by_id
)

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def hello_world():
    return "Hello, World!"

# GET /api/v1/books - returns a list of all books


@app.route('/api/v1/books', methods=['GET'])
def get_books():
    # Get the page and page_size parameters from the request arguments
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)

    # Call the get_all_books function with the page and page_size parameters
    result = get_all_books(page=page, page_size=page_size)

    # Return the books as a JSON response with pagination metadata
    return jsonify(result)


# GET /api/v1/books/author/<author> - returns a list of all books by the given author


@app.route('/api/v1/books/author/<author_slug>', methods=['GET'])
def get_books_by_author(author_slug):
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)
    return jsonify(get_books_by_author_slug(author_slug=author_slug, page=page, page_size=page_size))

# GET /api/v1/books/subject/<subject_slug> - returns a list of all books by the given subject


@app.route('/api/v1/books/subjects', methods=['GET'])
def get_subjects():
    return jsonify(get_all_subjects())

# GET /api/v1/books/subjects/<subject_slug> - returns a list of books by the given subject


@app.route('/api/v1/books/subjects/<subject>', methods=['GET'])
def books_by_subject_slug(subject):
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)
    return jsonify(search_books(subject=subject, page=page, page_size=page_size))

# GET /api/v1/authors - returns a list of all authors


@app.route('/api/v1/authors', methods=['GET'])
def get_all_authors():
    return jsonify(get_authors())

# GET /api/v1/books/search - busca livros por título


@app.route('/api/v1/books/search', methods=['GET'])
def search_books_route():
    # Get the search term and pagination parameters
    title = request.args.get('title', default='', type=str)
    author_name = request.args.get('author_name', default='', type=str)
    page = request.args.get('page', default=1, type=int)
    page_size = request.args.get('page_size', default=10, type=int)

    # Call the unified search function
    return jsonify(search_books(
        title=title if title else None,
        author_name=author_name if author_name else None,
        page=page,
        page_size=page_size
    ))

# POST /api/v1/books - creates a new book


@app.route('/api/v1/books', methods=['POST'])
def create_book():
    # Valida se o corpo da requisição existe
    book_data = request.get_json()
    
    if not book_data:
        return jsonify({'error': 'Corpo da requisição vazio ou inválido'}), 400
    
    result, status_code = create_new_book(book_data)
    return jsonify(result), status_code

# DELETE /api/v1/books/<id> - Deleta um livro pelo ID


@app.route('/api/v1/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    result, status_code = delete_book_by_id(book_id)
    return jsonify(result), status_code

