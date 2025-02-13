package controllers

import (
	"database/sql"
	"fmt"
	"prjt/server/database"
	"prjt/server/models"

	"github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(user models.User) (int, error) {
	cryptedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return 0, err
	}

	query := `INSERT INTO users (username, age, gender, email, password) VALUES (?, ?, ?, ?, ?)`

	result, err := database.Db.Exec(query, user.Username, user.Age, user.Gender, user.Email, string(cryptedPassword))
	if err != nil {
		return 0, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}

func LoginUser(user models.Credentials) (models.CreateSession, error) {
	userlog := models.User{}

	query := `SELECT user_id,password FROM users WHERE username = ? OR email = ?`
	id := 0
	username := ""
	if err := database.Db.QueryRow(query, user.Username, user.Username).Scan(&id, &userlog.Password); err != nil {
		if err == sql.ErrNoRows {
			return models.CreateSession{}, fmt.Errorf("first invalid credentials")
		}
	}

	if err := bcrypt.CompareHashAndPassword([]byte(userlog.Password), []byte(user.Password)); err != nil {
		return models.CreateSession{}, fmt.Errorf("second invalid credentials")
	}
	err := database.Db.QueryRow("SELECT username FROM users WHERE user_id=?", id).Scan(&username)
	if err != nil {
		return models.CreateSession{}, err
	}

	return models.CreateSession{
		Username: username,
		ID:       id,
	}, nil
}

func StoreSession(session string, id int) error {
	query := `INSERT INTO sessions (session, user_id) VALUES (?, ?)`
	if _, err := database.Db.Exec(query, session, id); err != nil {

		if sqlerr := err.(sqlite3.Error); sqlerr.Code != sqlite3.ErrConstraint {
			return err
		}
	}

	query = `UPDATE sessions SET session = ? WHERE user_id = ?`
	if _, err := database.Db.Exec(query, session, id); err != nil {
		return err
	}

	return nil
}
