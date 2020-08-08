const obstacleArray = [];

class Obstacle {
  constructor(){
    this.x = 550;
    this.y = 380;
    this.width = Math.random()*40 + 10;
    this.height = 20;
    this.color = 'hsl(' + Math.floor(Math.random()* 359) + ', 50%, 50%)';

  }
  draw(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x--, this.y, this.width, this.height);
  }

  update(){
    this.x -= gamespeed; 
      this.draw();
  }
}

function handleObstacles() {
  freq = Math.floor(Math.random()*50+50);
  if (frame%50===0) {
    obstacleArray.unshift(new Obstacle());
  }
  obstacleArray.forEach( (obstacle) => obstacle.update());
  if (obstacleArray.length > 20) {
    obstacleArray.pop();
  }

}

