class Player {
    constructor() {
        this.element = document.getElementById('player');
        this.spriteWidth = 288;
        this.spriteHeight = 128;
        this.states = {
            idle    :   { frames    : 8 , row   : 0    , speed : 0.15,  isImune   :  false, canChangeState  : true  },
            run     :   { frames    : 8 , row   : 1    , speed : 0.2 ,  isImune   :  false, canChangeState  : true  },
            jump    :   { frames    : 2 , row   : 2    , speed : 0.1 ,  isImune   :  false, canChangeState  : true  }, 
            fall    :   { frames    : 2 , row   : 3    , speed : 0.1 ,  isImune   :  false, canChangeState  : true  }, 
            atack   :   { frames    : 26, row   : 8    , speed : 0.2 ,  isImune   :  false, canChangeState  : false },
           airatack :   { frames    : 7 , row   : 4    , speed : 0.2 ,  isImune   :  false, canChangeState  : false },
           takedmg  :   { frames    : 6 , row   : 11   , speed : 0.2 ,  isImune   :  false, canChangeState  : false },
           defend   :   { frames    : 8 , row   : 10   , speed : 0.2 ,  isImune   :  true , canChangeState  : false },
           spatack  :   { frames    : 30, row   : 9    , speed : 0.2 ,  isImune   :  true , canChangeState  : false },
           death    :   { frames    : 19, row   : 12   , speed : 0.2 ,  isImune   :  true , canChangeState  : false }
        };
        this.currentState = 'idle';
        this.frame = 0;
        this.direction = 1;
        this.x = 0;
        this.y = 0;
        this.speed = 0.2;
        this.isGrounded = true;
        this.jumpForce = 10;
        this.velocityY = 0;
        this.gravity = 0.5;

        this.keys = {
            ArrowRight: false,
            ArrowLeft: false,
            k: false,
            j: false,
            x: false
        };
    }

    updateAnimation() {
       
        const state = this.states[this.currentState];
        this.frame = (this.frame + state.speed) % state.frames;
        const frameIndex = Math.floor(this.frame);

        this.element.style.backgroundPosition = `-${frameIndex * this.spriteWidth}px -${state.row * this.spriteHeight}px`;
        this.element.style.transform = `scaleX(${this.direction})`;
    }

    updatePhysics() {
        let moveX = 0;
        if (this.keys.ArrowRight) moveX += this.speed;
        if (this.keys.ArrowLeft) moveX -= this.speed;

        if (moveX !== 0) {
            this.direction = Math.sign(moveX);
            this.currentState = 'run';
        } else {
            this.currentState = 'idle';
        }

       
        if (this.keys.k && this.isGrounded) {
            this.currentState = 'spatack';
        }

        if (this.keys.x && this.isGrounded) {
            this.velocityY = this.jumpForce;
            this.isGrounded = false;
        }

        // Apply gravity
        this.velocityY -= this.gravity;
        this.y += this.velocityY;

        // Handle jump/fall animation
        if (!this.isGrounded) {
            if (this.velocityY > 0) {
                this.currentState = 'jump'; // Going up
            } else {
                this.currentState = 'fall'; // Falling down
            }
        }

        // Ground collision
        if (this.y <= 0) {
            this.y = 0;
            this.velocityY = 0;
            this.isGrounded = true;
        }
        if (this.keys.j ) {   
            if (this.isGrounded) {
              this.currentState = 'atack';  
            }else{                        
                this.currentState='airatack'
            }
            
        }
        this.x += moveX;
        this.element.style.left = `${50 + this.x}px`;
        this.element.style.bottom = `${100 + this.y}px`;
    }
}

class ParallaxController {
    constructor() {
        this.layers = {
            back: { element: document.getElementById('layer-back'), speed: 5 },
            mid: { element: document.getElementById('layer-mid'), speed: 8 }
        };
        this.cameraX = 0;
    }

    update(cameraX) {
        Object.values(this.layers).forEach(layer => {
            const offset = -cameraX * layer.speed;
            layer.element.style.backgroundPositionX = `${offset}px`;
        });
    }
}

const player = new Player();
const parallax = new ParallaxController();
let lastTime = 0;

document.addEventListener('keydown', (e) => {
    if (e.key in player.keys) {
        player.keys[e.key] = true;
        e.preventDefault();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key in player.keys) {
        player.keys[e.key] = false;
        e.preventDefault();
    }
});

const gameLoop=(timestamp)=> {
    lastTime = timestamp;
    player.updatePhysics();
    player.updateAnimation();
    parallax.update(player.x);
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);