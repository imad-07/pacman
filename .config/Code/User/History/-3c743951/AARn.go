package comments

type Comment struct {
	//Item_id string 
	user_id    string `json:"user_id"`
	post_id    string `json:"post_id"`
	content    string `json:"content"`
//	Created_at string 
}
