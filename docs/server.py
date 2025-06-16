from flask import Flask, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def init_db():
    conn = sqlite3.connect('orders.db')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            phone TEXT,
            email TEXT,
            comment TEXT,
            specs TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/order', methods=['GET', 'POST'])
def order():
    if request.method == 'POST':
        data = request.form
        conn = sqlite3.connect('orders.db')
        conn.execute('''
            INSERT INTO orders (name, phone, email, comment, specs)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            data.get('fio'),
            data.get('phone'),
            data.get('email'),
            data.get('comment'),
            data.get('specs')
        ))
        conn.commit()
        conn.close()
        return 'OK'
    return 'Метод не підтримується', 405

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
