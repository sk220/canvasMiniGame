 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let spacePressed = false;
let gameoverFlg = false;

let frame = 0;
let score = 0; 
let currentLevel = 1;
let levels = [
  { level: 0, 
    gamespeed: 2,
    obstacleCount: 10,
  }, 
  { level: 1, 
    gamespeed: 5,
    obstacleCount: 10,
  }, 
  { level: 2, 
    gamespeed: 5,
    obstacleCount: 15,
  }, 
  { level: 3, 
    gamespeed: 7,
    obstacleCount: 20,
  }, 
];

const startButton = document.querySelector('#start');
startButton.addEventListener('click', start);

//choose level
const level = document.querySelectorAll('.level');
level[0].addEventListener('change', (event) => currentLevel = event.target.value);

function start() {
  //reset obstacles if we loose 
  if (gameoverFlg) {
    obstacleArray.length = 0;
    score = 0;
  } 
  animate();
  gameover(false, 'Game started');
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
      gameover(true, 'Restart');  
      return;
    }
    handleScore();
    if(handleScore()) {
      passLevel();
      return
    }

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
function handleScore(){
  for (const obstacle of obstacleArray) {
    if ( ball.x > obstacle.x + obstacle.width &&
        !obstacle.counted) {
          obstacle.counted = true;
          score++;
    }
  }
  if (score >= levels[currentLevel].obstacleCount) {
    return true;
  }
}

function passLevel(){
  ctx.font = '32px Roboto';
  ctx.fillStyle = 'mintcream';
  ctx.textAlign = 'center';
  ctx.fillText('Level ' + `${currentLevel}` + ' done!', canvas.width/2, canvas.height/2);
  gameover(true, 'Restart');
}

function gameover(boolean, buttonText){
  gameoverFlg = boolean;
  startButton.innerText = buttonText;
  startButton.toggleAttribute('disabled');
  level[0].toggleAttribute('disabled');
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
