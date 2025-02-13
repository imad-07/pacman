package comments

type Comment struct {
	//Item_id string 
	User_id    string `json:"user_id"`
	Post_id    string `json:"post_id"`
	Content    string `json:"content"`
//	Created_at string 
}
