//go:build !go1.24.4

package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"text/template"
)

func main() {

	config := GetEnvConfig()

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir(config.StaticPath))))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.Error(w, "Not found", http.StatusNotFound)
			return
		}
		w.Header().Set("Access-Control-Allow-Origin", "*")
		RenderGame(config, "cpp.cpp", w)
	})

	http.HandleFunc("/{code}", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		code := r.PathValue("code")
		RenderGame(config, code, w)
	})

	log.Println("Server starting on " + config.AppPort)
	log.Println("code files: " + config.CodePath)
	log.Println("static files: " + config.StaticPath)
	log.Fatal(http.ListenAndServe(config.AppPort, nil))
}

// func enableCors(w *http.ResponseWriter) {
// 	(*w).Header().Set("Access-Control-Allow-Origin", "*")
// }

func RenderGame(config Config, code string, w http.ResponseWriter) {

	code_ext := filepath.Ext(code)
	data_bytes, _ := os.ReadFile(config.CodePath + "/" + code)
	data := map[string]any{
		"code":        fmt.Sprintf("%s", data_bytes),
		"import_lang": GetImportLang(code_ext),
		"lang_code":   code_ext,
	}
	tmpl, _ := template.ParseFiles("./index.gohtml")
	tmpl.Execute(w, data)
}
func GetImportLang(ext string) string {
	switch ext {
	case ".cs":
		return "csharp"
	default:
		return ext[1:]
	}
}
