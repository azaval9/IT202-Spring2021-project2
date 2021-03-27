const PLAYER_HEIGHT = 60;
const PLAYER_WIDTH = 50;
const MAX_HEIGHT = 550;
const MIN_HEIGHT = 50;
const MAX_WIDTH = 800;
const MIN_WIDTH = 600;
let GAMEACTIVE = false;

class Player {
    constructor() {
        this.xpos = 30;
        this.ypos = 240;
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.image = new Image();
        this.imageSrc = "./images/p3.png";
    }
}

class Asteroid {
    constructor() {
        this.xpos = Math.floor(
            Math.random() * (MAX_WIDTH - MIN_WIDTH + 1) + MIN_WIDTH
        );
        this.ypos = Math.floor(
            Math.random() * (MAX_HEIGHT - MIN_HEIGHT + 1) + MIN_HEIGHT
        );
        this.damage = -1;
        this.speed = 1;
        this.image = new Image();
        this.imageSrc = "./images/asteroid.png";
    }
}

class Diamond {
    constructor() {
        this.xpos = Math.floor(
            Math.random() * (MAX_WIDTH - MIN_WIDTH + 1) + MIN_WIDTH
        );
        this.ypos = Math.floor(
            Math.random() * (MAX_HEIGHT - MIN_HEIGHT + 1) + MIN_HEIGHT
        );
        this.score = 1;
        this.speed = 1;
        this.image = new Image();
        this.imageSrc = "./images/diamond.png";
    }
}

let theCanvas = document.querySelector("#gameCanvas");
let ctx = theCanvas.getContext("2d");
let player = new Player();

let asteroids = [
    new Asteroid(),
    new Asteroid(),
    new Asteroid(),
    new Asteroid(),
    new Asteroid(),
    new Asteroid(),
];
let diamonds = [
    new Diamond(),
    new Diamond(),
    new Diamond(),
    new Diamond(),
    new Diamond(),
    new Diamond(),
];

// ! EVENT LISTENERS -----------------------------------
let arrowUpDown = (event) => {
    if (event.code == "ArrowUp") {
        player.ypos -= 10;
        //window.requestAnimationFrame(drawScreen);
    }
    if (event.code == "ArrowDown") {
        player.ypos += 10;
        //window.requestAnimationFrame(drawScreen);
    }
};

//Start Button
document.querySelector("#btnStart").addEventListener("click", (event) => {
    document.querySelector("#btnStart").disabled = true;
    document.querySelector("#btnRestart").disabled = false;
    //ADD EVENT LISTENERES
    window.addEventListener("keydown", arrowUpDown);
    playGame();
    console.log("Start game");
});

document.querySelector("#btnRestart").addEventListener("click", (event) => {
    document.querySelector("#btnStart").disabled = false;
    document.querySelector("#btnRestart").disabled = true;
    window.removeEventListener("keydown", arrowUpDown);
    //TODO: reset all variables and redraw the screen
    console.log("Restart game");
});

//! FUNCTIONS ------------------------------------------
function drawObject(obj) {
    function loadDraw() {
        ctx.beginPath();
        ctx.drawImage(
            obj.image,
            obj.xpos,
            obj.ypos,
            PLAYER_WIDTH,
            PLAYER_HEIGHT
        );
        ctx.closePath();
    }

    obj.image.onload = loadDraw;
    obj.image.src = obj.imageSrc;
}

function drawScreen() {
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
    ctx.beginPath();
    ctx.drawImage(
        player.image,
        player.xpos,
        player.ypos,
        PLAYER_WIDTH,
        PLAYER_HEIGHT
    );
    // ! draw asteroids
    for (i = 0; i < asteroids.length; i++) {
        drawObject(asteroids[i]);
    }

    // ! draw diamonds
    for (i = 0; i < diamonds.length; i++) {
        drawObject(diamonds[i]);
    }
    drawScore();
    drawLives();
    drawLevels();
    ctx.closePath();
}

function drawScore() {
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + player.score.toString(), 350, 50);
    ctx.closePath();
}

function drawLives() {
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Lives: " + player.lives.toString(), 350, 80);
    ctx.closePath();
}

function drawLevels() {
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Level: " + player.level.toString(), 350, 110);
    ctx.closePath();
}

//TODO
function restartGame() {
    //clear the screen
    //reset the player
    //reset any level details
}

function moveObjectsLeft() {
    // ! draw asteroids
    for (i = 0; i < asteroids.length; i++) {
        asteroids[i].xpos -= 1;
        //drawAsteroid(asteroids[i]);
    }

    // ! draw diamonds
    for (i = 0; i < diamonds.length; i++) {
        diamonds[i].xpos -= 1;
        //drawAsteroid(diamonds[i]);
    }
}

//TODO
function playGame() {
    moveObjectsLeft();
    //TODO: Move asteroids and diamonds across the screen
    //TODO: hit detection
    //good
    //bad
    //TODO: update lives
    //TODO: MORE UPDATES TO GAME
    //TODO: update screen
    window.requestAnimationFrame(drawScreen);
    playGame();
}

// ! START GAME LOGIC -------------------------------------------
//draw player for the first time
player.image.onload = drawScreen;
player.image.src = player.imageSrc;
