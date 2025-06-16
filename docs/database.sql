CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    email TEXT,
    comment TEXT,
    specs TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);