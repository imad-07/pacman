package handlers

import "github.com/gofrs/uuid/v5"

func GenerateSession() (string, error) {
	session, err := uuid.NewV7()
	if err != nil {
		return "", err
	}
	return session.String(), nil
}
