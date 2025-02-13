// Initialize game variables
let score = 0;
let lives = 3;
let pacoords = {X:250, Y:450, O:0}
// Set up the grid and game elements (e.g., Pac-Man, dots, ghosts)
const grid = document.querySelector(".game-board")
let maze = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,
    1,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,1,
    1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,
    1,0,1,0,1,1,0,1,1,0,0,1,1,0,1,1,0,1,0,1,
    1,0,0,0,0,0,0,1,2,0,0,2,1,0,0,0,0,0,0,1,
    1,0,1,0,1,1,0,1,1,1,1,1,1,0,1,1,0,1,0,1,
    1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,
    1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,
    1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,0,1,
    1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,
    1,0,1,0,1,1,0,1,1,0,0,1,1,0,1,1,0,1,0,1,
    1,0,0,0,0,0,0,1,2,0,0,2,1,0,0,0,0,0,0,1,
    1,0,1,0,1,1,0,1,1,1,1,1,1,0,1,1,0,1,0,1,
    1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,
    1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1,1,0,1,
    1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,
    1,2,0,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,2,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
]
  
maze.forEach((e , i) => {
    let div = document.createElement("div")
    if ( e == 1){
        div.classList.add("wall")
        div.id = i
    }else if ( e == 0){
        div.classList.add("path")
        let pellet = document.createElement("div")
        pellet.classList.add("pellet")
        div.appendChild(pellet)
        div.id = i
    }else if ( e == 2){
      div.classList.add("path")
      let pellet = document.createElement("div")
      pellet.classList.add("powerpellet")
      div.appendChild(pellet)
      div.id = i
  }
    grid.appendChild(div)
})
let pacman = document.createElement("div")
  pacman.classList.add("pacman")
  pacman.style.transform = `translate(${pacoords.X}px, ${pacoords.Y}px) rotate(${pacoords.O}deg)`;
  grid.appendChild(pacman)
const walls = document.querySelectorAll(".wall");

document.addEventListener('keydown', function(e) {
  let pacman = document.querySelector(".pacman");

  // If the left arrow key is pressed
  if (e.key === "ArrowLeft") {
      pacoords.X -= 1;
      let b = (Math.floor((pacoords.X/ 25)) + Math.ceil((pacoords.Y/ 25))*20)
      let j = (Math.floor((pacoords.X/ 25)) + Math.floor((pacoords.Y/ 25))*20)      
      if (maze[b] != 1 || maze[j] != 1){
        pacoords.O = 0;
        pacman.style.transform = `translate(${pacoords.X}px, ${pacoords.Y}px) rotate(${pacoords.O}deg)`;
      }else{
        pacoords.X += 1;
      }
  }else if(e.key == "ArrowRight"){
    pacoords.X += 1
    let b = (Math.ceil((pacoords.X/ 25)) + Math.ceil((pacoords.Y/ 25))*20)
    let j = (Math.ceil((pacoords.X/ 25)) + Math.floor((pacoords.Y/ 25))*20)
    if (maze[b] != 1 || maze[j] != 1){
      pacoords.O = 180;
      pacman.style.transform = `translate(${pacoords.X}px, ${pacoords.Y}px) rotate(${pacoords.O}deg)`;
    }else{
      pacoords.X -= 1
      }
  }else if(e.key == "ArrowUp"){
    pacoords.Y -= 1
    let b = (Math.floor((pacoords.X/ 25)) + Math.ceil((pacoords.Y/ 25))*20)
    let j = (Math.floor((pacoords.X/ 25)) + Math.floor((pacoords.Y/ 25))*20)
    if(maze[b]!= 1 || maze[j]!= 1){
    pacoords.O = 90
    pacman.style.transform = `translate(${pacoords.X}px, ${pacoords.Y}px) rotate(${pacoords.O}deg)`;
    }else{
      pacoords.Y += 1
    }
  }else if(e.key == "ArrowDown"){
    pacoords.Y += 1
    let b = (Math.floor((pacoords.X/ 25)) + Math.ceil((pacoords.Y/ 25))*20)
    let j = (Math.floor((pacoords.X/ 25)) + Math.floor((pacoords.Y/ 25))*20)
    if(maze[b] != 1){
      pacoords.O = 270
      pacman.style.transform = `translate(${pacoords.X}px, ${pacoords.Y}px) rotate(${pacoords.O}deg)`;
    }else{
      pacoords.Y -= 1
    }
  }
});

// Game loop function to update the game state
function gameLoop() {
  // Update game state (move Pac-Man, heck for collisions)
  // Render new game state to the screen
  requestAnimationFrame(gameLoop); // Keeps the game running
}
gameLoop(); // Start the game loop
