package gethandlers

import (
	"net/http"
	"os"
	"path/filepath"
	"prjt/server/utils"
	"strings"
	"text/template"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodGet {
		utils.ResponseJSON(w, utils.Resp{Msg: "Method not allowed", Code: http.StatusMethodNotAllowed})
		return
	}

	if r.URL.Path != "/" {
		http.Redirect(w, r, "/", http.StatusFound)
		return
	}

	temp, err := template.ParseFiles("web/template/index.html")
	if err != nil {
		utils.ResponseJSON(w, utils.Resp{Msg: err.Error(), Code: http.StatusNotFound})
		return
	}

	if err := temp.Execute(w, nil); err != nil {
		utils.ResponseJSON(w, utils.Resp{Msg: err.Error(), Code: http.StatusInternalServerError})
		return
	}
}

func GetAssets(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.ResponseJSON(w, utils.Resp{Msg: "Method not allowed", Code: http.StatusMethodNotAllowed})
		return
	}

	fp, _ := strings.CutPrefix(r.URL.Path, "/assets")
	fp = filepath.Join("web/assets", fp)
	fp = strings.ReplaceAll(fp, "\\", "/")

	_, err := os.Stat(fp)
	if err != nil || strings.HasSuffix(r.URL.Path, "/") {
		utils.ResponseJSON(w, utils.Resp{Msg: err.Error(), Code: http.StatusNotAcceptable})
		return
	}
	http.ServeFile(w, r, fp)
}
