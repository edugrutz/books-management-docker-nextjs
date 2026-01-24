import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS
from routes.books import books_bp
from routes.authors import authors_bp
from services import get_connection

app = Flask(__name__)
CORS(app)

app.register_blueprint(books_bp)
app.register_blueprint(authors_bp)

@app.route("/", methods=["GET"])
def hello_world():
    return "Hello, World!"

@app.route("/health", methods=["GET"])
def health_check():
    try:
        conn = get_connection()
        conn.execute("SELECT 1").fetchone()
        conn.close()
        return jsonify({"status": "healthy", "database": "connected"}), 200
    except Exception as e:
        return jsonify({"status": "unhealthy", "reason": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

