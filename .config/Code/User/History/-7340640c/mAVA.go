package main

import (
	"os"
)

func main() {
	file, _ := os.ReadFile("meriem.txt")
	var chob []string
	for i := 0; i < len(file); i++{
		count := 0
		tmp := ""
		if count == 50  {
			if file[i+1] == ' ' ||file[i-1] == ' '{
				chob = append(chob, tmp)
				tmp = ""
				count = 0 
			}
			count = 0
		}
	}
	
}
