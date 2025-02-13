package comments

type Comment struct {
	//Item_id string 
	User_id    string `json:"Userid"`
	Post_id    string `json:"Postid"`
	Content    string `json:"Content"`
//	Created_at string 
}
