package main

import (
	"fmt"
	"log"
	"net/http"
	"prjt/server/database"
	"prjt/server/routers"
)

func main() {
	database.CreateTables()
	router := http.NewServeMux()
	routers.SetupRoutes(router)

	fmt.Println("URL: http://localhost:8080")

	if err := http.ListenAndServe(":8080", router); err != nil {
		log.Fatal(err)
	}
}
