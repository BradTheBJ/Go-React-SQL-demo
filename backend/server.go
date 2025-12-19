package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	router := gin.Default()

	db, err := sql.Open("sqlite3", "./database.db")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// LOGIN
	router.POST("/login", func(c *gin.Context) {
		var json struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		if err := c.ShouldBindJSON(&json); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		

		var storedPassword string
		err := db.QueryRow(
			"SELECT password FROM users WHERE email = ?",
			json.Email,
		).Scan(&storedPassword)

		if err == sql.ErrNoRows {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid email"})
			return
		} else if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		if json.Password != storedPassword {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "wrong password"})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": fmt.Sprintf("Successfully logged in as user: %s", json.Email),
		})
	})

	// SIGNUP
	router.POST("/signup", func(c *gin.Context) {
		var json struct {
			Email    string `json:"email"`
			Password string `json:"password"`
		}

		if err := c.ShouldBindJSON(&json); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if json.Email == "" || json.Password == "" {
    	c.JSON(http.StatusBadRequest, gin.H{"error": "email and password are required"})
    	return
		}

		_, err := db.Exec(
			"INSERT INTO users (email, password) VALUES (?, ?)",
			json.Email,
			json.Password,
		)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": fmt.Sprintf("Successfully signed up user: %s", json.Email),
		})
	})

	router.Static("/assets", "../frontend/dist/assets")

	router.NoRoute(func(c *gin.Context) {
		c.File("../frontend/dist/index.html")
	})

	router.Run(":8080")
}

