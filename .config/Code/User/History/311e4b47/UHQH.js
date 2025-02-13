import { GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST, DIRECTIONS } from "./setup.js";

export default class GameBoard {
    constructor(LayoutElement) {
        this.dotCount = 0;
        this.grid = [];
        this.LayoutElement = LayoutElement;
    }
    showGameStatus(gameWin) { }

    CreateGame(layout) {
        this.dotCount = 0;
        this.grid = [];
        this.LayoutElement.innerHTML = '';
        this.LayoutElement.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px)`

        for (let i = 0; i < layout.length; i++) {
            this.grid[i] = [];
            for (let j = 0; j < layout[i].length; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell', CLASS_LIST[layout[i][j]]);
                cell.style.cssText = `
                width: ${CELL_SIZE}px;
                height: ${CELL_SIZE}px;`
                this.LayoutElement.appendChild(cell);
                this.grid[i].push(cell);

                // count dots
                if (layout[i][j] === 2 || layout[i][j] === 7) {
                    this.dotCount++;
                }
            }

        }
    }

    addObject(positionX, positionY, classes) {
        const cell = document.createElement('div');
        cell.classList.add(...classes);
        cell.style.cssText = `translate(${positionX},${positionY})`
    }

    removeObject(position, classes) { }

    objectExist = (character, object) => {
        if (character.moveUp) {
            const x = Math.floor(character.positionX / 20)
            const y = Math.floor((character.positionY - character.speed) / 20)
            if (!this.grid[y][x].classList.contains("wall")) {
                this.grid[y][x].classList.remove("dot", "pill")
            }
            return this.grid[y][x].classList.contains(object);
    
        } else if (character.moveDown) {
            const x = Math.floor(character.positionX / 20)
            const y = Math.ceil((character.positionY + character.speed) / 20)
            if (!this.grid[y][x].classList.contains("wall")) {
                this.grid[y][x].classList.remove("dot", "pill")
            }
            return this.grid[y][x].classList.contains(object);
    
        } else if (character.moveLeft) {
            const x = Math.floor((character.positionX - character.speed) / 20)
            const y = Math.floor(character.positionY / 20)
            if (this.grid[y][x].classList.contains(object) &&
                !this.grid[y][x].classList.contains("wall")) {
                this.grid[y][x].classList.remove("dot", "pill")
            }
            return this.grid[y][x].classList.contains(object);
    
        } else if (character.moveRight) {
            const x = Math.ceil((character.positionX + character.speed) / 20)
            const y = Math.ceil(character.positionY / 20)
            if (this.grid[y][x].classList.contains(object) &&
                !this.grid[y][x].classList.contains("wall")) {
                this.grid[y][x].classList.remove("dot", "pill")
            }
            return this.grid[y][x].classList.contains(object);
        }
    }
    
    //

    rotateDiv(character) {
        character.element.style = (`transform: translate(${character.positionX}px, ${character.positionY}px) rotate(${character.direction.rotation}deg);`);
    }

    moveCharacter(character) {
        if (character.moveUp) {
            if (!this.objectExist(character, OBJECT_TYPE.WALL) &&
                !this.objectExist(character, OBJECT_TYPE.GHOSTLAIR)) {
                character.direction = DIRECTIONS['ArrowUp'];
                character.positionY = character.positionY - character.speed
            } else {
                character.moveUp = false
            }
        } else if (character.moveDown) {
            if (!this.objectExist(character, OBJECT_TYPE.WALL) &&
                !this.objectExist(character, OBJECT_TYPE.GHOSTLAIR)) {
                character.direction = DIRECTIONS['ArrowDown'];
                character.positionY = character.positionY + character.speed
            } else {
                character.moveDown = false
            }

        } else if (character.moveLeft) {
            if (!this.objectExist(character, OBJECT_TYPE.WALL) &&
                !this.objectExist(character, OBJECT_TYPE.GHOSTLAIR)) {
                character.direction = DIRECTIONS['ArrowLeft'];
                character.positionX = character.positionX - character.speed
            } else {
                character.moveLeft = false
            }
        } else if (character.moveRight) {
            if (!this.objectExist(character, OBJECT_TYPE.WALL) &&
                !this.objectExist(character, OBJECT_TYPE.GHOSTLAIR)) {
                character.direction = DIRECTIONS['ArrowRight'];
                character.positionX = character.positionX + character.speed
            } else {
                character.moveRight = false
            }
        }
    }
    // Dot eaten function
    pacDotEaten(character, object) {
        if (character.moveUp) {
            const x = Math.floor(character.positionX / 20)
            const xb = Math.ceil(character.positionX / 20)
            const y = Math.floor((character.positionY - character.speed) / 20)
            if (this.grid[y][xb].classList.contains(object) &&
                !this.grid[y][x].classList.contains("wall") &&
                !this.grid[y][xb].classList.contains("wall"))  {
                return true
            }
            return false
        } else if (character.moveDown) {
            const x = Math.floor(character.positionX / 20)
            const xb = Math.ceil(character.positionX / 20)
            const y = Math.ceil((character.positionY + character.speed) / 20)
            if (this.grid[y][xb].classList.contains(object) &&
                !this.grid[y][x].classList.contains("wall") &&
                !this.grid[y][xb].classList.contains("wall")) {
                this.grid[y][x].classList.remove("dot", "pill")
                return true
            }
            return false
        } else if (character.moveLeft) {
            const x = Math.floor((character.positionX - character.speed) / 20)
            const yb = Math.ceil(character.positionY / 20)
            const y = Math.floor(character.positionY / 20)
            if (this.grid[y][x].classList.contains(object) &&
                !this.grid[y][x].classList.contains("wall") &&
                !this.grid[yb][x].classList.contains("wall")) {
                this.grid[y][x].classList.remove("dot", "pill")
                return true
            }
            return false
        } else if (character.moveRight) {
            const x = Math.ceil((character.positionX + character.speed) / 20)
            const yb = Math.floor(character.positionY / 20)
            const y = Math.ceil(character.positionY / 20)
            if (this.grid[y][x].classList.contains(object) &&
            !this.grid[y][x].classList.contains("wall") &&
            !this.grid[yb][x].classList.contains("wall"))  {
                this.grid[y][x].classList.remove("dot", "pill")
                return true
            }
            return false
        } 
    }
    static createGameBoard(LayoutElement, layout) {
        const board = new this(LayoutElement);
        board.CreateGame(layout);
        return board;
    }
}
