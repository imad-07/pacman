package database

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3" // SQLite driver
)

var Db *sql.DB

// CreateTables executes the SQL schema
func CreateTables() {
	var err error
	Db, err = sql.Open("sqlite3", "database.db")
	if err != nil {
		log.Fatal(err)
	}
	schema, err := os.ReadFile("./server/database/database.sql")
	if err != nil {
		log.Fatal(err)
	}

	_, err = Db.Exec(string(schema))
	if err != nil {
		log.Fatal("Error creating tables:", err)
	}
}
