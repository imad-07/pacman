package main

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"sync"
)

func sendForm(data string) {
	serverURL := "http://localhost:8080/submit"
	formData := url.Values{}
	formData.Set("input", data)

	req, err := http.NewRequest("POST", serverURL, bytes.NewBufferString(formData.Encode()))
	if err != nil {
		fmt.Printf("Error creating request: %v\n", err)
		return
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("Error making request: %v\n", err)
		return
	}
	defer resp.Body.Close()

	_, err1 := ioutil.ReadAll(resp.Body)
	if err1 != nil {
		fmt.Printf("Error reading response: %v\n", err)
		return
	}

	fmt.Printf("Status: %d\n", resp.StatusCode)
}

func main() {
	const numRequests = 900000
	const numWorkers = 1000

	var wg sync.WaitGroup
	jobs := make(chan int, numRequests)
	for i := 0; i < numWorkers; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for range jobs {
				sendForm("you have to be better")
			}
		}()
	}
	for i := 0; i < numRequests; i++ {
		jobs <- i
	}
	close(jobs) 
	wg.Wait()
	fmt.Println("All requests completed.")
}
