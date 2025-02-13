package comments

import (
	"errors"
	"forum/app/modules"
	"strconv"
)

func GetComents(conn modules.Connection) ([]Comment, error) {
	post_id := conn.Req.URL.Query().Get("p_id")
	if post_id == "" {
		return nil, errors.New("invalid url")
	}
	p_id, err := strconv.Atoi(post_id)
	return nil, nil
}
