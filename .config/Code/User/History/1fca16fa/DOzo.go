package comments

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"forum/app/modules"
)

func AddComment(conn modules.Connection) error {
	var comment Comment
	err := json.NewDecoder(conn.Req.Body).Decode(&comment)
	
	if err != nil {
		return errors.New("invalid data format")
	}
	db, err := sql.Open("sqlite3", "forum.db")
	if err != nil {
		return errors.New("internal pointer variable")
	}
	query := `INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)`
	_, err = db.Exec(query, comment.Post_id, comment.User_id, comment.Content)
if err!=nil {
	return errors.New("internal pointer variable")
}
fmt.Printf("comment: %v\n", comment)
return  nil
}
 