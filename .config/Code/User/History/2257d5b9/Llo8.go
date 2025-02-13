package comments

import "forum/app/modules"

func GetComents(conn modules.Connection) []Comment {
post_id:=conn.Req.URL.Query().Get("p_id")
	return nil
}
