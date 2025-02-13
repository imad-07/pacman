package main

import (
	"bytes"
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
)

// Download and split audio
func downloadAndSplit(youtubeURL string) ([]string, error) {
	// Step 1: Download & Convert
	cmdYTDL := exec.Command("yt-dlp", "-f", "bestaudio", "--exec", "ffmpeg -i {} -ar 44100 -ac 2 -f wav audio.wav", youtubeURL)
	cmdYTDL.Stdout = os.Stdout
	cmdYTDL.Stderr = os.Stderr
	fmt.Println("Downloading and converting audio...")
	if err := cmdYTDL.Run(); err != nil {
		return nil, fmt.Errorf("yt-dlp error: %v", err)
	}

	// Step 2: Split WAV to 30s chunks
	fmt.Println("Splitting audio into chunks...")
	cmdSplit := exec.Command("ffmpeg", "-i", "audio.wav", "-f", "segment", "-segment_time", "30", "-c", "copy", "chunk_%03d.wav")
	cmdSplit.Stdout = os.Stdout
	cmdSplit.Stderr = os.Stderr
	if err := cmdSplit.Run(); err != nil {
		return nil, fmt.Errorf("ffmpeg split error: %v", err)
	}

	// Get chunks
	chunkFiles, err := filepath.Glob("chunk_*.wav")
	if err != nil {
		return nil, fmt.Errorf("error listing chunks: %v", err)
	}

	return chunkFiles, nil
}

// Worker function for transcription
func transcribeWorker(jobs <-chan string, results chan<- string, wg *sync.WaitGroup) {
	defer wg.Done()
	for chunk := range jobs {
		var out bytes.Buffer
		cmdWhisper := exec.Command("whisper", chunk, "--model", "tiny")
		cmdWhisper.Stdout = &out
		cmdWhisper.Stderr = os.Stderr

		fmt.Println("Transcribing:", chunk)
		if err := cmdWhisper.Run(); err != nil {
			fmt.Printf("Error transcribing %s: %v\n", chunk, err)
			results <- ""
		} else {
			results <- out.String()
		}
	}
}

// Main function
func main() {
	youtubeURL := "https://www.youtube.com/watch?v=liTfD88dbCo" // Example

	// Step 1: Download, convert, and split
	chunkFiles, err := downloadAndSplit(youtubeURL)
	if err != nil {
		log.Fatalf("Error: %v\n", err)
	}

	// Step 2: Transcribe using a fixed number of goroutines (4 workers)
	numWorkers := 4
	jobs := make(chan string, len(chunkFiles))
	results := make(chan string, len(chunkFiles))
	var wg sync.WaitGroup

	// Launch 4 goroutines
	for i := 0; i < numWorkers; i++ {
		wg.Add(1)
		go transcribeWorker(jobs, results, &wg)
	}

	// Feed chunks to workers
	for _, chunk := range chunkFiles {
		jobs <- chunk
	}
	close(jobs)

	// Wait for workers to finish
	wg.Wait()
	close(results)

	// Combine results into a single string
	var finalTranscript strings.Builder
	for transcript := range results {
		finalTranscript.WriteString(transcript + "\n")
	}

	// **Mchi file.txt, direct f variable**
	transcriptionString := finalTranscript.String()

	// Print transcription (optional)
	fmt.Println("Transcription:\n", transcriptionString)
}
