const PLAYER_HEIGHT = 40;
const PLAYER_WIDTH = 40;
const MAX_HEIGHT = 550;
const MIN_HEIGHT = 50;
const MAX_WIDTH = 900;
const MIN_WIDTH = 600;
let GAMEACTIVE = false;

class Player {
    constructor() {
        this.xpos = 30;
        this.ypos = 240;
        this.score = 0;
        this.lives = 3;
        this.level = 1;
        this.radius = 20;
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
        this.radius = 20;
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
        this.radius = 20;
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
    GAMEACTIVE = true;
    //draw player for the first time
    player.image.onload = drawScreen;
    player.image.src = player.imageSrc;
    draw();
    console.log("Start game");
});

//TODO: reset all variables and redraw the screen
document.querySelector("#btnRestart").addEventListener("click", (event) => {
    document.querySelector("#btnStart").disabled = false;
    document.querySelector("#btnRestart").disabled = true;
    window.removeEventListener("keydown", arrowUpDown);
    GAMEACTIVE = false;
    restartGame();
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
    player.score = 0;
    player.lives = 3;
    player.level = 1;

    for (i = 0; i < asteroids.length; i++) {
        resetExtraObject(asteroids[i]);
    }

    for (i = 0; i < diamonds.length; i++) {
        resetExtraObject(diamonds[i]);
    }
}

function moveObjectsLeft() {
    let mySpeed = 1;
    if (player.score == 3) {
        mySpeed = 2;
        player.level = 2;
    } else if (player.score == 4) {
        mySpeed = 4;
        player.level = 3;
    } else if (player.score >= 5) {
        mySpeed = 6;
        player.level = 4;
    }

    // ! draw asteroids
    for (i = 0; i < asteroids.length; i++) {
        asteroids[i].xpos -= mySpeed;
    }
    // ! draw diamonds
    for (i = 0; i < diamonds.length; i++) {
        diamonds[i].xpos -= mySpeed;
    }
}

function checkCollision(ship, obj) {
    //mozilla circle collision
    //debugger;
    let dx = ship.xpos + 10 - (obj.xpos + 10);
    let dy = ship.ypos + 10 - (obj.ypos + 10);
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < ship.radius + obj.radius) {
        return true;
    }
    return false;
}

function resetExtraObject(obj) {
    obj.xpos = Math.floor(
        Math.random() * (MAX_WIDTH - MIN_WIDTH + 1) + MIN_WIDTH
    );
    obj.ypos = Math.floor(
        Math.random() * (MAX_HEIGHT - MIN_HEIGHT + 1) + MIN_HEIGHT
    );
}

function checkLives() {
    if (player.lives == 0) {
        GAMEACTIVE = false;
    }
}

//TODO:
function updateScreen() {
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
    ctx.beginPath();
    ctx.drawImage(
        player.image,
        player.xpos,
        player.ypos,
        PLAYER_WIDTH,
        PLAYER_HEIGHT
    );
    // ! asteroids
    for (i = 0; i < asteroids.length; i++) {
        //check for collision
        if (checkCollision(player, asteroids[i])) {
            player.lives -= 1;
            resetExtraObject(asteroids[i]);
            //check lives
            checkLives();
        }
        if (asteroids[i].xpos < -50) {
            resetExtraObject(asteroids[i]);
        }
        ctx.drawImage(
            asteroids[i].image,
            asteroids[i].xpos,
            asteroids[i].ypos,
            PLAYER_WIDTH,
            PLAYER_HEIGHT
        );
    }

    // ! draw diamonds
    for (i = 0; i < diamonds.length; i++) {
        // ! CHECK FOR COLLISOIN
        if (checkCollision(player, diamonds[i])) {
            player.score += 1;
            resetExtraObject(diamonds[i]);
        }
        //check if image went out of bounds
        if (diamonds[i].xpos < -50) {
            resetExtraObject(diamonds[i]);
        }
        //draw image
        ctx.drawImage(
            diamonds[i].image,
            diamonds[i].xpos,
            diamonds[i].ypos,
            PLAYER_WIDTH,
            PLAYER_HEIGHT
        );
    }
    drawScore();
    drawLives();
    drawLevels();
    ctx.closePath();
}

function draw() {
    moveObjectsLeft();
    updateScreen();

    if (GAMEACTIVE) {
        window.requestAnimationFrame(draw);
    } else {
        //display screen
        console.log("over");
        //clear screen and write game over
        ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
        ctx.beginPath();
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("GAME OVER", 300, 300);
        ctx.closePath();
    }
}
