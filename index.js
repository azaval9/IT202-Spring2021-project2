const PLAYER_HEIGHT = 60;
const PLAYER_WIDTH = 50;

let player = {
    xpos: 30,
    ypos: 240,
    score: 0,
    lives: 3,
    level: 1,
    image: "./images/p3.png",
};

let enemy = {
    xpos: 0,
    ypos: 0,
    damage: -1,
    speed: 1,
    image: "",
};

let powerUp = {
    xpos: 0,
    ypos: 0,
    score: 1,
    speed: 1,
    image: "",
};

let theCanvas = document.querySelector("#gameCanvas");
let ctx = theCanvas.getContext("2d");

//draw player for the first time
let playerImage = new Image();
playerImage.onload = drawScreen;
playerImage.src = player.image;

ctx.font = "30px Arial";
ctx.fillText("Hello World", 10, 50);

function drawScreen() {
    ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
    ctx.beginPath();
    ctx.drawImage(
        playerImage,
        player.xpos,
        player.ypos,
        PLAYER_WIDTH,
        PLAYER_HEIGHT
    );
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

//Arrow keys
// left - 37, up - 38 ,right = 39, down = 40
window.addEventListener("keydown", (event) => {
    if (event.code == "ArrowUp") {
        player.ypos -= 10;
        window.requestAnimationFrame(drawScreen);
    }
    if (event.code == "ArrowDown") {
        player.ypos += 10;
        window.requestAnimationFrame(drawScreen);
    }
});

//Start Button
document.querySelector("#btnStart").addEventListener("click", (event) => {
    console.log("start game");
});
