package comments

import (
	"encoding/json"
	"errors"
	"io"
)

func UpdateComent(data io.ReadCloser) error {
	var newcomment Comment
	err := json.NewDecoder(data).Decode(&newcomment)
	if err != nil {
		return errors.New("invalid format")
	}
	query:=`UPDATE comments SET content=?,  WHERE item_id= ?`
	return nil
}
