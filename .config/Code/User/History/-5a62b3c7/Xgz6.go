package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
)

func sendForm(data string) {
	// Server URL and endpoint
	serverURL := "http://localhost:8080/submit" // Replace with your server URL and path

	// Encode form data
	formData := url.Values{}
	formData.Set("input", data)

	// Create a new POST request
	req, err := http.NewRequest("POST", serverURL, bytes.NewBufferString(formData.Encode()))
	if err != nil {
		fmt.Printf("Error creating request: %v\n", err)
		return
	}

	// Set headers
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	// Execute the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("Error making request: %v\n", err)
		return
	}
	defer resp.Body.Close()

	// Read response
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("Error reading response: %v\n", err)
		return
	}

	// Log the response
	fmt.Printf("Status: %d\nResponse: %s\n", resp.StatusCode, body)
}

func main() {
	// Send the form 9000 times
	for i := 0; i < 9000; i++ {
		sendForm("This is the text data to send to the server.")
	}
}
