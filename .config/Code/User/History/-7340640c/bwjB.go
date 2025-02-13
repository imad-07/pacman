package main

import (
	"os"
	"strings"
)

func main() {
	file, _ := os.ReadFile("meriem.txt")
	var chob []string
	tmp := ""

	for i := 0; i < len(file); i++{
		count := 0
		if file[i] == '.'{
			chob = append(chob, tmp)
			tmp = ""
		}
		if count == 25 {
			if file[i+1] == ' ' ||file[i-1] == ' '{
				chob = append(chob, tmp)
				tmp = ""
				count = 0 
			}
			count = 0
		}
		tmp += string(file[i])
	}	
	if tmp != ""{
		chob = append(chob, tmp)
		}
		err := os.WriteFile("amg.txt",[]byte(strings.Join(chob,"\n")),777)
		if err != nil{
			return
		}
}
