package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"log"
	"net/http"
	_ "github.com/mattn/go-sqlite3"
)

type DB struct {
	db *sql.DB
}

func main() {
	conn, err := sql.Open("sqlite3", "./db.db")
	if err != nil {
		log.Fatal("Failed to connect to the database: %v", err)
		
	}
	defer conn.Close()

	data := &DB{db: conn}

	if err := data.InitUsersTable(); err != nil {
		log.Fatal("Failed to initialize users table: %v", e

	fs := http.FileServer(http.Dir("./asset"))
	http.Handle("/asset/", http.StripPrefix("/asset/", fs))
	http.HandleFunc("/", data.Handler)
	fmt.Println("Server Started on http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("Server failed: %v", e
}

func (d *DB) Handler(w http.ResponseWriter, r *http.Request) {
	tpl, err := template.ParseFiles("./tpl.html")
	if err != nil {
		http.Error(w, "Failed to parse template", http.StatusInternalServerError)
		log.Fatal("Template parsing error: %v", err)
		return
	}

	input := r.FormValue("input")
	if input != "" {
	input = "Hello: " + input

	id, err := d.InsertUser(input)
	if err != nil {
		http.Error(w, "Failed to insert user", http.StatusInternalServerError)
		log.Fatal("Insert user error: %v", err)
		return
	}

	user, err := d.GetUserByID(int(id))
	if err != nil {
		http.Error(w, "Failed to retrieve user", http.StatusInternalServerError)
		log.Fatal("Retrieve user error: %v", err)
		return
	}

	if err := tpl.Execute(w, user); err != nil {
		http.Error(w, "Failed to render template", http.StatusInternalServerError)
		log.Fatal("Template execution error: %v", err)
		return
	}
}else{
	tpl.Execute(w,nil)
}
}

func (d *DB) InitUsersTable() error {
	query := `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL
	)`
	_, err := d.db.Exec(query)
	return err
}

func (d *DB) InsertUser(name string) (int64, error) {
	query := `INSERT INTO users (name) VALUES (?)`
	result, err := d.db.Exec(query, name)
	if err != nil {
		return 0, err
	}
	return result.LastInsertId()
}

func (d *DB) GetUserByID(id int) (string, error) {
	query := `SELECT name FROM users WHERE id = ?`
	row := d.db.QueryRow(query, id)

	var name string
	if err := row.Scan(&name); err != nil {
		if err == sql.ErrNoRows {
			return "", fmt.Errorf("no user found with id %d", id)
		}
		return "", err
	}
	return name, nil
}
