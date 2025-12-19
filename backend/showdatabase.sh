#!/bin/bash

DB_FILE="database.db"

if [ ! -f "$DB_FILE" ]; then
  echo "Database file '$DB_FILE' not found!"
  exit 1
fi

echo "Showing contents of 'users' table:"
sqlite3 "$DB_FILE" <<EOF
.headers on
.mode column
SELECT * FROM users;
EOF
