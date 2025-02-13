import { DIRECTIONS, OBJECT_TYPE } from "./setup.js";

export default class Pacman {
    constructor(speed, startPositionX, startPositionY) {
        this.positionX = startPositionX * 20;
        this.positionY = startPositionY * 20;
        this.speed = speed;
        this.direction = DIRECTIONS['ArrowRight'];
        this.timer = 0;
        this.powerPill = false;
        this.rotation = true;
        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.element = null;
    }

    shouldMove() { }
    getNextMove() { }
    makeMove() { }
    setNewPosition() { }
    handleKeyInput(e) { }

    createPacMan(layout) {
        const pacMan = document.createElement('div');
        pacMan.classList.add('cell', 'pacman');
        pacMan.style = `transform: translate(${this.positionX}px, ${this.positionY}px) rotate(${0}deg);`;
        pacMan.style.zIndex = '1';
        layout.appendChild(pacMan);
        return pacMan;
    }
}
