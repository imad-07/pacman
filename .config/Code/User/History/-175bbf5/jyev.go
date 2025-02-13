package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"log"
	"net/http"
)

type DB struct {
	db *sql.DB
}

func main() {
	var Data DB

	conn, err := sql.Open("sqlite3", "./foo.db")
	if err != nil  {
		log.Fatal(err)
	}
	Data.db = conn

	err1 := Data.InitUsersTable()
	if err1 != nil  {
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
	fmt.Println(input)
	input = "Hello: " + input
	er := tpl.Execute(w, input)
	if er != nil {
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