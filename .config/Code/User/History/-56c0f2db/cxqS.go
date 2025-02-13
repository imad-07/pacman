package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"sync"
	"time"
)

func main() {
	// Define target server URL
	serverURL := "http://127.0.0.1:8080"

	// Number of requests and concurrent workers
	totalRequests := 1000000
	concurrentWorkers := 10000

	// Channel to control concurrency
	requests := make(chan int, totalRequests)

	// WaitGroup to wait for all workers
	var wg sync.WaitGroup

	// Start time to calculate duration
	startTime := time.Now()

	// Launch workers
	for i := 0; i < concurrentWorkers; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for range requests {
				// Make HTTP request
				resp, err := http.Get(serverURL)
				if err != nil {
					fmt.Println("Request failed:", err)
					continue
				}
				_, _ = ioutil.ReadAll(resp.Body) // Read response to avoid connection issues
				resp.Body.Close()
			}
		}()
	}

	// Send requests
	for i := 0; i < totalRequests; i++ {
		requests <- i
	}
	close(requests) // Close the channel to signal workers to stop

	// Wait for all workers to finish
	wg.Wait()

	// Calculate and print test duration
	duration := time.Since(startTime)
	fmt.Printf("Completed %d requests in %v\n", totalRequests, duration)
}
