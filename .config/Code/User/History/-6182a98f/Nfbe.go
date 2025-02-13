package main

import (
	"html/template"
	"net/http"
)

func main() {
	// Serve static files from the "static" directory
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// Serve the home page
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		tmpl := template.Must(template.ParseFiles("index.html"))
		tmpl.Execute(w, nil)
	})

	// Serve the /res page
	http.HandleFunc("/res", func(w http.ResponseWriter, r *http.Request) {
		tmpl := template.Must(template.ParseFiles("templates/res.html"))
		tmpl.Execute(w, nil)
	})

	// Start the server
	http.ListenAndServe(":8080", nil)
}
