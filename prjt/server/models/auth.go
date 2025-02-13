package models

type Token struct {
	Access_token string
	Token_type   string
	Scope        string
}
type CreateSession struct {
	Username string
	ID       int
}
