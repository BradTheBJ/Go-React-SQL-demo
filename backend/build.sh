#!/bin/bash
cd "/home/brad/Code/Web/Fullstack Web/frontend" && bun run build
cd "/home/brad/Code/Web/Fullstack Web/backend/" && go run server.go
