import { LAYOUT, OBJECT_TYPE, DIRECTIONS, GRID_SIZE } from "./setup.js";
import { randomMovement } from "./ghostMoves.js";

// Classes
import GameBoard from "./GameBoard.js";
import Ghost from "./Ghost.js";
import Pacman from "./Pacman.js";

// Sounds

// DOM ELEMENTS
const layoutElement = document.querySelector('.game');
const score = document.querySelector('.score span');
const stateBtn = document.querySelector('.gameState');

// Game Constants
const POWER_PILL_TIME = 10000;
const GLOBAL_SPEED = 80;
const gameBoard = GameBoard.createGameBoard(layoutElement, LAYOUT);
const pacmanChar = new Pacman(1, 9, 14);
const ghosts = [
    new Ghost(2, 160, 200, "red", "blinky"),
    new Ghost(2, 180, 200, "red", "pinky"),
    new Ghost(2, 200, 200, "red", "clyde"),
    new Ghost(2, 220, 200, "red", "inky"),
];

ghosts.forEach(ghost => {
    ghost.createGhost(layoutElement, ghost.name);
    console.log(ghost.name)
    ghost.element = document.querySelector(`.${ghost.name}`)
})

pacmanChar.createPacMan(layoutElement);
pacmanChar.element = document.querySelector(".pacman");

// Initialze
let scoreCounter = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;


// game loop

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key.toLowerCase() == 'w') {
        pacmanChar.moveUp = true;
        pacmanChar.moveDown = false;
    } else if (event.key === 'ArrowDown' || event.key.toLowerCase() == 's') {
        pacmanChar.moveDown = true;
        pacmanChar.moveUp = false;
    } else if (event.key === 'ArrowLeft' || event.key.toLowerCase() == 'a') {
        pacmanChar.moveLeft = true;
        pacmanChar.moveRight = false;
    } else if (event.key === 'ArrowRight' || event.key.toLowerCase() == 'd') {
        pacmanChar.moveRight = true;
        pacmanChar.moveLeft = false;
    }
})

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp' || event.key.toLowerCase() == 'w') {
        if (gameBoard.objectExist(pacmanChar, OBJECT_TYPE.WALL)) {
            pacmanChar.moveUp = false;
            pacmanChar.moveDown = false;
        }
    } else if (event.key === 'ArrowDown' || event.key.toLowerCase() == 's') {
        if (gameBoard.objectExist(pacmanChar, OBJECT_TYPE.WALL)) {
            pacmanChar.moveDown = false;
            pacmanChar.moveUp = false;
        }
    } else if (event.key === 'ArrowLeft' || event.key.toLowerCase() == 'a') {
        if (gameBoard.objectExist(pacmanChar, OBJECT_TYPE.WALL)) {
            pacmanChar.moveLeft = false;
            pacmanChar.moveRight = false;
        }
    } else if (event.key === 'ArrowRight' || event.key.toLowerCase() == 'd') {
        if (gameBoard.objectExist(pacmanChar, OBJECT_TYPE.WALL)) {
            pacmanChar.moveRight = false;
            pacmanChar.moveLeft = false;
        }
    }
})

function gameLoop() {

    gameBoard.moveCharacter(pacmanChar)
    gameBoard.rotateDiv(pacmanChar)
    ghosts.forEach(ghost => {
        gameBoard.moveCharacter(ghost)
    })
    if (gameBoard.pacDotEaten(pacmanChar, OBJECT_TYPE.DOT)) {
        console.log("hhhh");        
        scoreCounter += 10;
        gameBoard.dotCount -= 1;
        if (gameBoard.dotCount == 0) {
            alert("you win")
        }
    }
    if (gameBoard.pacDotEaten(pacmanChar, OBJECT_TYPE.PILL)) {
        powerPillEaten()
        scoreCounter += 50;
        gameBoard.dotCount -= 1;
        if (gameBoard.dotCount == 0) {
            alert("you win")
        }
    }
    score.innerHTML = scoreCounter
    
    removeDot()

    // ghostEaten()
    checkWin()
    // checkForLose()

    requestAnimationFrame(gameLoop)
}
// statr Game
function startGame() {
    scoreCounter = 0;
    gameWin = false;
    powerPillActive = false;

    stateBtn.textContent = "Pause";
    stateBtn.classList.remove("pause");
    stateBtn.classList.add("play");
    gameBoard.createGameBoard(layoutElement, LAYOUT)

    const ghosts = [
        new Ghost({x:5, y:188}, randomMovement, OBJECT_TYPE.BLINKY),
    ]
}




// pause game
// function pauseGame() {
//     stateBtn.textContent = "Resume";
//     stateBtn.classList.remove("play");
//     stateBtn.classList.add("pause");
//     clearInterval(timer);

// }
// Initialeing the game
stateBtn.addEventListener('click', () => {
    if (stateBtn.classList.contains("play")) {
        startGame();
    } else {
        pauseGame();
    }
});

gameBoard.addObject(9, 14, [OBJECT_TYPE.PACMAN])
requestAnimationFrame(gameLoop)



// remove dot
function removeDot() {
    if (gameBoard.objectExist(pacmanChar, OBJECT_TYPE.DOT) ||
        gameBoard.objectExist(pacmanChar, OBJECT_TYPE.PILL)) {
        gameBoard.removeObject(pacmanChar, OBJECT_TYPE.PILL);
    }
}

// check for win
function checkWin() {
    if (gameBoard.dotCount == 0) alert("you win")
}

// power pill eaten
function powerPillEaten() {
    powerPillActive = true;
    ghosts.forEach((ghost)=>{
        ghost.isScared = true;
        ghost.element.classList.add('scared')
    })
    setTimeout(() => {
        powerPillActive = false;
        ghosts.forEach((ghost)=>{
            ghost.isScared = false;
            ghost.element.classList.remove('scared')
        })
        console.log("power pill desactivated")
    }, 10000)
}