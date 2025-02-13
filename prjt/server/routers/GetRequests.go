package routers

import (
	"net/http"
	gethandlers "prjt/server/handlers/getHandlers"
)

func GetRequests() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("/assets/", gethandlers.GetAssets)
	mux.HandleFunc("/", gethandlers.LoginHandler)
	return mux
}
