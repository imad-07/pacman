package routers

import (
	"net/http"
)

func SetupRoutes(router *http.ServeMux) {
	router.Handle("/", GetRequests())
}
