// Initialize game variables
let score = 0;
let lives = 3;
// Set up the grid and game elements (e.g., Pac-Man, dots, ghosts)
const grid = document.querySelector(".game-board")
let maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
    [1,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,0,1,1,0,1,1,0,0,1,1,0,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,1,2,0,0,2,1,0,0,0,0,0,0,1],
    [1,0,1,0,1,1,0,1,1,1,1,1,1,0,1,1,0,1,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,0,1,1,0,1,1,0,0,1,1,0,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,1,2,0,0,2,1,0,0,0,0,0,0,1],
    [1,0,1,0,1,1,0,1,1,1,1,1,1,0,1,1,0,1,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,2,0,0,0,1,1,1,1,0,3,1,1,1,1,0,0,0,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]
maze.forEach(row => {
    row.forEach(e => {
    let div = document.createElement("div")
    if ( e == 1){
        div.classList.add("wall")
    }else if ( e == 0){
        div.classList.add("path")
        let pellet = document.createElement("div")
        pellet.classList.add("pellet")
        div.appendChild(pellet)
    }else if ( e == 2){
      div.classList.add("path")
      let pellet = document.createElement("div")
      pellet.classList.add("powerpellet")
      div.appendChild(pellet)
  }else if ( e == 3){
    div.classList.add("path")
    div.id = "start"
  }
    grid.appendChild(div)
})
})
let start = document.getElementById("start")
let pacman = Document.createElement("div").classList.add("pacman")
grid.appendChild(pacman)
// Event listener for keyboard input
document.addEventListener('keydown', function(e) {
  // Handle movement logic for Pac-Man
  let pacman = document.querySelector(".pacman")
  if(e.key == "ArrowLeft"){

  }else if(e.key == "ArrowRight"){

  }else if(e.key == "ArrowUp"){

  }else if(e.key == "ArrowDown"){

  }
});

// Game loop function to update the game state
function gameLoop() {
  // Update game state (move Pac-Man, check for collisions)
  // Render new game state to the screen
  requestAnimationFrame(gameLoop); // Keeps the game running
}

gameLoop(); // Start the game loop
