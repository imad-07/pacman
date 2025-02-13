package main

import (
	"fmt"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)
var (
	db *sqlite3.db
	clients = make(map[string]*websocket.Conn) // username -> WebSocket connection
	mutex   = sync.Mutex{}
)

// WebSocket upgrader
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

// Message struct
type Message struct {
	Sender   string `json:"sender"`
	Receiver string `json:"receiver"`
	Time     time.Time `json:"time"`
	Text     string `json:"text"`
}

// Handle WebSocket connections
func handleConnections(w http.ResponseWriter, r *http.Request) {
	// Upgrade HTTP to WebSocket
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		http.Error(w, "Could not open websocket connection", http.StatusBadRequest)
		return
	}
	defer ws.Close()

	// Get username from query parameters
	username := r.URL.Query().Get("username")
	if username == "" {
		ws.WriteMessage(websocket.TextMessage, []byte("Username required"))
		return
	}

	// Store the WebSocket connection
	mutex.Lock()
	clients[username] = ws
	mutex.Unlock()

	fmt.Println(username, "connected")

	// Handle incoming messages
	for {
		var msg Message
		err := ws.ReadJSON(&msg)
		msg.Time = time.Now()
		if err != nil {
			fmt.Println("Error reading message:", err)
			break
		}

		// Send the message to the intended recipient
		sendMessageToUser(msg)
	}

	// Cleanup on disconnect
	mutex.Lock()
	delete(clients, username)
	mutex.Unlock()
	fmt.Println(username, "disconnected")
}

// Send a message to a specific user
func sendMessageToUser(msg Message) {
	mutex.Lock()
	receiverConn, exists := clients[msg.Receiver]
	mutex.Unlock()

	if exists {
		err := receiverConn.WriteJSON(msg)
		if err != nil {
			fmt.Println("Error sending message:", err)
		}
	} else {
		fmt.Println("User", msg.Receiver, "not connected")
	}
}

func main() {
	fs := http.FileServer(http.Dir("./public"))
	http.Handle("/", fs)
	http.HandleFunc("/ws", handleConnections)

	fmt.Println("Server running on :8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println("Server error:", err)
	}
}
