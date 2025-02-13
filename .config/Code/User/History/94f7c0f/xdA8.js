document.addEventListener('DOMContentLoaded',()=>{
    const scoreDisplay = document.getElementById('score')
    const width = 28
    let score = 0
    const grid = document.querySelector('.grid')
    const layout = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 4, 4, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 4, 4, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 1, 1, 4, 4, 1, 1, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 4, 4, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
        1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ]
    const squares = []
    function createboard(){
        for (let i = 0; i < layout.length; i++){
            const square = document.createElement('div')
            grid.appendChild(square)
            squares.push(square)
            if (layout[i] == 0){
                squares[i].classList.add('pac-dot')
            }
            if (layout[i] == 1){
                squares[i].classList.add('wall')
            }
            if (layout[i] == 3){
                squares[i].classList.add('power-pellet')
            }
        }
    }
    createboard()
    let pacmanpos = 490
    squares[pacmanpos].classList.add('pac-man')
    document.addEventListener('keyup',movepacman)
    function movepacman(e){
        switch (e.key){
            case 'ArrowLeft':
                if (pacmanpos % width !=0 && 
                !squares[pacmanpos-1].classList.contains('wall')

            ){
                squares[pacmanpos].classList.remove('pac-man')
                pacmanpos -= 1
                squares[pacmanpos].style.transform = 'scaleX(-1)'
                }
                break
                case 'ArrowRight':
                    if(pacmanpos% width < width -1&&
                        !squares[pacmanpos+1].classList.contains('wall')
                    ){
                    squares[pacmanpos].classList.remove('pac-man')
                        pacmanpos += 1
                        squares[pacmanpos].style.transform = 'scaleX(1)'
            }
                    break
                    case 'ArrowUp':
                        if (pacmanpos -width >= 8&&
                            !squares[pacmanpos - width].classList.contains('wall')
                       ){
                        squares[pacmanpos].classList.remove('pac-man')
                        pacmanpos -= width
                        squares[pacmanpos].style.transform = 'rotate(-90deg)'
}
                        break
                        case 'ArrowDown':
                            if ( pacmanpos+ width < width * width &&
                                !squares[pacmanpos + width].classList.contains('wall')
                            ){
                                    squares[pacmanpos].classList.remove('pac-man')
                                    pacmanpos += width
                                    squares[pacmanpos].style.transform = 'rotate(+90deg)'
                            }
                            break
        }
        squares[pacmanpos].classList.add('pac-man')
        paceat()
        pacpowereat()
    }
    function paceat(){
        if (squares[pacmanpos].classList.contains('pac-dot')){
            score++
            scoreDisplay.innerHTML = score
            squares[pacmanpos].classList.remove('pac-dot')
        }
    }
    function pacpowereat(){
        if (squares[pacmanpos].classList.contains('power-pellet')){
            score += 10
            scoreDisplay.innerHTML = score
            squares[pacmanpos].classList.remove('power-pellet')
        }    
    }
    class Ghost {
        constructor(classname, start, speed){
            this.classname = classname
            this.start = start
            this.speed = speed
            this.current = start
            this.isscared = false
            this.timerid = NaN
        }
    }
   let  Ghosts = [
        new Ghost('blinky',729,250),
        new Ghost('pinky',30,480),
        new Ghost('inky',754,300),
        new Ghost('clyde',54,500)
    ]
 Ghosts.forEach(ghost => {
    squares[ghost.current].classList.add(ghost.classname)
 })
 Ghosts.forEach(ghost => moveGhost(ghost))
  
 function moveGhost(ghost) {
    const directions = [-1, 1, width, -width]; // Possible movement directions (left, right, down, up)
  
    let direction = getBestDirection(ghost); // Calculate initial direction
  
    ghost.timerId = setInterval(function () {
      const nextPosition = ghost.current + direction;
  
      // Check if the ghost can move to the next position
      if (
        !squares[nextPosition].classList.contains('ghost') && // Avoid other ghosts
        !squares[nextPosition].classList.contains('wall') // Avoid walls
      ) {
        // Remove the ghost from the current square
        squares[ghost.current].classList.remove(ghost.classname, 'ghost');
        squares[ghost.current].classList.add('pac-dot'); // Restore pac-dot if present
  
        // Update ghost's position
        ghost.current += direction;
  
        // Update the ghost on the new square
        squares[ghost.current].classList.remove('pac-dot'); // Remove pac-dot
        squares[ghost.current].classList.add(ghost.classname, 'ghost');
      } else {
        // Recalculate direction if a wall or ghost is encountered
        direction = getBestDirection(ghost);
      }
    }, ghost.speed);
  }
  
  function getBestDirection(ghost) {
    const horizontalDifference = pacmanpos % width - ghost.current % width;
    const verticalDifference = Math.floor(pacmanpos / width) - Math.floor(ghost.current / width);
  
    // Choose the dominant axis to move towards Pac-Man
    if (Math.abs(horizontalDifference) > Math.abs(verticalDifference)) {
      // Prioritize horizontal movement
      return horizontalDifference < 0 ? -1 : 1; // Move left or right
    } else {
      // Prioritize vertical movement
      return verticalDifference < 0 ? -width : width; // Move up or down
    }
  }
  
})