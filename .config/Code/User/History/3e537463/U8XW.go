package service

import (
	"fmt"
	"sync"

	"forum/server/data"
	"forum/server/shareddata"

	"github.com/gorilla/websocket"
)

type Wservice struct {
	Wsdata data.WsData
}

var (
	Clients = make(map[string][]*websocket.Conn)
	mutex   = sync.Mutex{}
)

// Register a new WebSocket connection for a user
func (Ws *Wservice) RegisterConnection(user string, conn *websocket.Conn) {

	 Ws.HandleConnection(user, conn)

	username, userid := GetUser(Ws.Wsdata.Db, user)
	if userid != 0 {
		mutex.Lock()
		Clients[username] = append(Clients[username], conn)
		mutex.Unlock()
		fmt.Println(username, "registered")
		var msg shareddata.ChatMessage
		msg.Type = "signal-on"
		msg.Content = username
		BroadcastMessage(username, msg)
	} else {
		fmt.Println("Attempt to register invalid user")
	}
}

// Handle an incoming WebSocket connection
func (Ws *Wservice) HandleConnection(uuid string, conn *websocket.Conn) {
	username, _ := GetUser(Ws.Wsdata.Db, uuid)

	mutex.Lock()
	users := Ws.Wsdata.Getusers(username)
	for i := 0; i < len(users); i++ {
		if _, exists := Clients[users[i].Username]; exists {
			users[i].State = true
		}
	}
	mutex.Unlock()

	conn.WriteJSON(users)
}
func Notify(username string){
	fmt.Println(Clients)
	var message shareddata.ChatMessage
	message.Content = username
	message.Type = "signal-off"
	for userID, connections := range Clients {
		if userID == username {
			continue
		}
		for _, conn := range connections {
			fmt.Println("111")
			err := conn.WriteJSON(message)
			if err != nil {
				fmt.Println("Error sending message:", err)
			}
		}
	}
}
// Broadcast a message to all WebSocket connections except the sender
func BroadcastMessage(senderID string, message shareddata.ChatMessage) {
	mutex.Lock()
	fmt.Println("Broadcasting message:",message)
	defer mutex.Unlock()
	for userID, connections := range Clients {
		if userID == senderID {
			continue
		}
		for _, conn := range connections {
			err := conn.WriteJSON(message)
			if err != nil {
				fmt.Println("Error sending message:", err)
			}
		}
	}
}
