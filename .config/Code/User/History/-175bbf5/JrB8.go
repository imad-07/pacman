package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"sqlite3"
)

type DB struct {
	db *sql.DB
}

func main() {
	var Data DB

	conn, err := sql.Open("sqlite3", "./db.db")
	if err != nil {
		log.Fatal(err)
	}
	Data.db = conn

	err1 := Data.InitUsersTable()
	if err1 != nil {
		log.Fatal(err1)
	}

	http.HandleFunc("/", Data.Handler)
	http.ListenAndServe(":8080", nil)
}
func (d *DB) Handler(w http.ResponseWriter, r *http.Request) {
	tpl, err := template.ParseFiles("./tpl.html")
	if err != nil {
		return
	}
	input := r.FormValue("input")
	input = "Hello: " + input
	id, er := d.InsertUser(input)
	if er != nil {
		return
	}
	user, er1 := d.GetUserByID(int(id))
	if er1 != nil {
		return
	}
	fmt.Println(user)

	er2 := tpl.Execute(w, user)
	if er2 != nil {
		return
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
	rslt, err := d.db.Exec(query, name)
	if err != nil {
		return 0, err
	}
	return rslt.LastInsertId()
}
func (d *DB) GetUserByID(id int) (string, error) {
	query := `SELECT name FROM users WHERE id = ?`
	row := d.db.QueryRow(query, id)

	var user string
	err := row.Scan(&user)
	if err == sql.ErrNoRows {
		return user, fmt.Errorf("no user found with id %d", id)
	} else if err != nil {
		return "", err
	}

	return user, nil
}
