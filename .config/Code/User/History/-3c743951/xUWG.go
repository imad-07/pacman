package comments

type Comment struct {
	//Item_id string 
	User_id    string `json:"User_id"`
	Post_id    string `json:"Post_id"`
	Content    string `json:"Content"`
//	Created_at string 
}
