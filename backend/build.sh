#!/bin/bash

# Optional argument
DELETE_DB=false
if [[ "$1" == "--delete-database" ]]; then
  DELETE_DB=true
fi

# Frontend build
cd "/home/brad/Code/Web/Fullstack Web/frontend" || exit
bun run build

# Backend database reset if requested
cd "/home/brad/Code/Web/Fullstack Web/backend/" || exit
if $DELETE_DB; then
  echo "Deleting existing database..."
  rm -f database.db
  echo "Recreating database from database.sql..."
  sqlite3 database.db <database.sql
fi

# Run backend server
go run server.go
