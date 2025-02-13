package comments

import (
	"encoding/json"
	"forum/app/modules/errors"
	"io"
)

func AddComment(data io.ReadCloser) error {
	var comment Comment
	err := json.NewDecoder(data).Decode(&comment)
	if err != nil {
		return errrs.New()
	}
}
