package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"net/http"
)

func main() {
	conn, err := sql.Open("sqlite3_extended", "./foo.db")
	http.HandleFunc("/", Handler)
	http.ListenAndServe(":8080", nil)
}
func Handler(w http.ResponseWriter, r *http.Request) {
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
