package main

import (
	"os"
)

func main() {
	file, _ := os.ReadFile("meriem.txt")
	var chob []byte
	for i := 0; i < len(file); i++{
		count := 0
		if count == 50  {
			if file[i+1] == ' ' ||file[i-1] == ' '{

			}
		}
	}
	
}
