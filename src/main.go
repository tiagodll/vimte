package main

import (
	"log"
	"net/http"
	"os"
	"text/template"
)

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir(os.Getenv("STATIC_PATH")))))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.Error(w, "Not found", http.StatusNotFound)
			return
		}

		tmpl, _ := template.ParseFiles("index.gohtml")
		tmpl.Execute(w, nil)
	})

	log.Println("Server starting on " + os.Getenv("APP_PORT"))
	log.Fatal(http.ListenAndServe(os.Getenv("APP_PORT"), nil))
}
