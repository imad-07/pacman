package utils

import (
	"net/http"
)

func AddSession(w http.ResponseWriter, name, session string) {
	http.SetCookie(w, &http.Cookie{
		Name:   name,
		Value:  session,
		Path:   "/",
		MaxAge: 60 * 60 * 24,
	})
}

func DeleteCookie(w http.ResponseWriter, session_name string) {
	http.SetCookie(w, &http.Cookie{
		Name:   session_name,
		Value:  "",
		Path:   "/",
		MaxAge: -1,
	})
}
