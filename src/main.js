 
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
    score = 0;
  } 
  animate();
  gameover = false;
  startButton.innerText = 'Game started';
  startButton.toggleAttribute('disabled');
}

// game 
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();
    handleBackgroundClouds();
    handleBackgroundTrees();
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
    countScore();
    requestAnimationFrame(animate);
    frame++;
}

// press "Space" action
window.addEventListener('keydown', function (event) {
  if (event.code ==='Space' ) {
    spacePressed = true; 
  }
});

window.addEventListener('keyup', function (event) {
  if (event.code ==='Space' ) {
    spacePressed = false; 
  }
});

// score
function countScore(){
  for (const obstacle of obstacleArray) {
    if (ball.x < obstacle.x + obstacle.width &&
        ball.x + ball.radius > obstacle.x &&
        !obstacle.counted) {
          obstacle.counted = true;
          score++;
    }
  }
}

// meet obstacle
const boom = new Image();
boom.src = 'img/explosion.png';

function handleExplosion(){
  for (const obstacle of obstacleArray) {
    if (ball.x < obstacle.x + obstacle.width &&
        ball.x + ball.radius > obstacle.x && 
        ball.y < obstacle.y + obstacle.height &&
        ball.y + ball.radius > obstacle.y) {
            ctx.drawImage( boom, ball.x - ball.radius, ball.y-ball.radius*3, 50, 50);
            
            ctx.font = '32px Roboto';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over' , canvas.width/2, canvas.height/2);

            ctx.font = '24px Roboto';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            if (score > 1) ctx.fillText('You passed ' + `${score}` + ' obstacles!' , canvas.width/2, canvas.height*3/5);
            else if (score === 1) ctx.fillText('You passed just 1 obstacle!' , canvas.width/2, canvas.height*3/5);
            else ctx.fillText('Bad luck, try again!' , canvas.width/2, canvas.height*3/5);
            return true;
    }
  }
}
