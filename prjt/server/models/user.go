package models

type User struct {
	Id       int
	Username string `json:"username"`
	Age      int    `json:"age"`
	Gender   string `json:"gender"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Credentials struct {
	Id       int
	Username string `json:"username"`
	Password string `json:"password"`
}
