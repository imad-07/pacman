package comments

import (
	"encoding/json"
	"errors"
	"io"
)

func AddComment(data io.ReadCloser) error {
	var comment Comment
	err := json.NewDecoder(data).Decode(&comment)
	if err != nil {
		return errors.New("invalid data format")
	}
	query:=""
}
