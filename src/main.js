 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let spacePressed = false;
let gameover = false;

let frame = 0;
let score = 0;
let gamespeed = 2;

const startButton = document.querySelector('#start');

startButton.addEventListener('click', start);

function start() {
  //reset obstacles if we loose 
  if (gameover) {
    obstacleArray.length = 0;
  } 
  animate();
  gameover = false;
  startButton.innerText = 'Game started';
  startButton.toggleAttribute('disabled');
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleObstacles();
    ball.update();
    ball.draw();
    
    handleExplosion();
    if (handleExplosion()) {
        gameover = true;
        startButton.innerText = 'Start over';
        startButton.toggleAttribute('disabled');
        return;
    }
    requestAnimationFrame(animate);
    frame++;
}

window.addEventListener('keydown', function (event) {
  if (event.code ==='Space' ) {
    console.log('space pressed');  
    spacePressed = true; 
  }
});

window.addEventListener('keyup', function (event) {
  if (event.code ==='Space' ) {
    console.log('space unpressed');
    spacePressed = false; 
  }
});


const boom = new Image();
boom.src = 'img/explosion.png';

function handleExplosion(){
  for (let i = 0; i < obstacleArray.length; i++) {
    if (ball.x < obstacleArray[i].x + obstacleArray[i].width &&
        ball.x + ball.radius > obstacleArray[i].x && 
        ball.y < obstacleArray[i].y + obstacleArray[i].height &&
        ball.y + ball.radius > obstacleArray[i].y) {
            console.log('boom');
            ctx.drawImage( boom, ball.x - ball.radius, ball.y-ball.radius*3, 50, 50);
            ctx.font = '32px Roboto';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over', canvas.width/2, canvas.height/2);
            return true;
    }
  }
}

