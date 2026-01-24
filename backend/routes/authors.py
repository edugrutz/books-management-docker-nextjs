from flask import Blueprint, jsonify
from services import get_authors

authors_bp = Blueprint('authors', __name__)

@authors_bp.route('/api/v1/authors', methods=['GET'])
def get_all_authors():
    return jsonify(get_authors())
