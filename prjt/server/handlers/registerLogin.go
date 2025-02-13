package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"prjt/server/controllers"
	"prjt/server/database"
	"prjt/server/models"
	"prjt/server/utils"
	"strconv"
)

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	user := models.User{}

	if r.Method != http.MethodPost {
		utils.ResponseJSON(w, utils.Resp{Msg: "Method not allowed", Code: http.StatusMethodNotAllowed})
		return
	}

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		utils.ResponseJSON(w, utils.Resp{Msg: "invalid credentials", Code: http.StatusBadGateway})
		return
	}

	if notunique, err := utils.UsernameIsUnique(user.Username); notunique || err != nil {
		utils.ResponseJSON(w, utils.Resp{Msg: "Username already exist", Code: http.StatusNotAcceptable})
		return
	}

	if notunique, err := utils.EmailIsUnique(user.Email); notunique || err != nil {
		utils.ResponseJSON(w, utils.Resp{Msg: "Email already exist", Code: http.StatusNotAcceptable})
		return
	}

	// check username
	valid_username, err := utils.CheckUsernameFormat(user.Username)
	if err != nil {
		fmt.Println(err)
		return
	} else if !valid_username {
		utils.ResponseJSON(w, utils.Resp{Msg: "Invalid username format", Code: http.StatusBadRequest})
		return
	}

	// check email
	valid_email, err := utils.CheckEmailFormat(user.Email)
	if err != nil {
		fmt.Println(err)
		return
	} else if !valid_email {
		utils.ResponseJSON(w, utils.Resp{Msg: "Invalid email format", Code: http.StatusBadRequest})
		return
	}

	// check password
	if !utils.CheckPasswordFormat(user.Password) {
		utils.ResponseJSON(w, utils.Resp{Msg: "Invalid password format", Code: http.StatusBadRequest})
		return
	}

	user.Id, err = controllers.RegisterUser(user)
	if err != nil {
		utils.ResponseJSON(w, utils.Resp{Msg: err.Error(), Code: http.StatusInternalServerError})
		return
	}

	session, err := GenerateSession()
	if err != nil {
		utils.ResponseJSON(w, utils.Resp{Msg: err.Error(), Code: http.StatusInternalServerError})
	}

	utils.AddSession(w, "session", session)
	utils.AddSession(w, "userId", strconv.Itoa(user.Id))
	utils.AddSession(w, "username", user.Username)
	utils.ResponseJSON(w, utils.Resp{Msg: "You have been successfully logged in.", Code: http.StatusAccepted})
	// also need the template for it.
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	userCredentials := models.Credentials{}
	if err := json.NewDecoder(r.Body).Decode(&userCredentials); err != nil {

		utils.ResponseJSON(w, utils.Resp{Msg: "invalid credentials", Code: http.StatusBadGateway})
		return
	}
	var err error
	var createsession models.CreateSession
	if createsession, err = controllers.LoginUser(userCredentials); err != nil {
		utils.ResponseJSON(w, utils.Resp{Msg: err.Error(), Code: http.StatusBadRequest})
		return
	}

	session, err := GenerateSession()
	if err != nil {
		utils.ResponseJSON(w, utils.Resp{Msg: err.Error(), Code: http.StatusInternalServerError})
	}

	if err := controllers.StoreSession(session, createsession.ID); err != nil {
		utils.ResponseJSON(w, utils.Resp{Msg: err.Error(), Code: http.StatusInternalServerError})
		return
	}

	utils.AddSession(w, "session", session)
	utils.AddSession(w, "userId", strconv.Itoa(createsession.ID))
	utils.AddSession(w, "username", createsession.Username)

	utils.ResponseJSON(w, utils.Resp{Msg: "You have been successfully logged in.", Code: http.StatusAccepted})
}

func LogoutHandler(w http.ResponseWriter, r *http.Request) {
	query := `DELETE FROM sessions WHERE session = ?`

	session, _ := r.Cookie("session")

	if _, err := database.Db.Exec(query, session.Value); err != nil {
		utils.ResponseJSON(w, utils.Resp{Msg: err.Error(), Code: http.StatusInternalServerError})
		return
	}

	utils.DeleteCookie(w, "session")
	utils.DeleteCookie(w, "userId")
	utils.DeleteCookie(w, "username")

	utils.ResponseJSON(w, utils.Resp{Msg: "You have been logged out.", Code: http.StatusAccepted})
}
