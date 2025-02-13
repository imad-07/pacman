package main

import (
	"fmt"
	"html/template"
	"net/http"
	"time"
)

func main() {
	http.HandleFunc("/", Handler)
	http.ListenAndServe(":8080",nil)
}
func Handler(w http.ResponseWriter, r *http.Request){
	t := 200* time.Millisecond
	timer := time.NewTimer(t)
	<-timer.C
	tpl,err := template.ParseFiles("./tpl.html")
	if err != nil{
		return
	}
	input := r.FormValue("input")
	fmt.Println(input)
	input = "Hello: " + input
	er := tpl.Execute(w,input)
	if er != nil {
		return 
	}
}