package comments

import (
	"errors"
	"forum/app/modules"
)

func GetComents(conn modules.Connection) ([]Comment,error) {
post_id:=conn.Req.URL.Query().Get("p_id")
if post_id=="" {
	return nil,errors.New("")
}
	return nil,nil
}
