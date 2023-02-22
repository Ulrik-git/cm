package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("http://localhost:8080")
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("./"))))
	http.Handle("/images", http.StripPrefix("/images", http.FileServer(http.Dir("./images"))))
	http.Handle("/css", http.StripPrefix("/css", http.FileServer(http.Dir("./css"))))
	http.Handle("/js", http.StripPrefix("/js", http.FileServer(http.Dir("./js"))))
	http.Handle("/music", http.StripPrefix("/music", http.FileServer(http.Dir("./music"))))
	http.Handle("/video", http.StripPrefix("/video", http.FileServer(http.Dir("./video"))))
	http.Handle("/fonts", http.StripPrefix("/fonts", http.FileServer(http.Dir("./fonts"))))
	http.ListenAndServe(":8080", nil)
}
