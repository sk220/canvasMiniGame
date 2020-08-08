class Ball {
  constructor (){
    this.x = canvas.width/3;
    this.y = canvas.height/2;
    this.vy = 0;
    this.weight = 1;
    this.radius = 10;
    this.color = 'brown';
    this.colorStroke = 'blue';
  }

  update() {
    if (this.y > canvas.height - this.radius) {
        this.y = canvas.height - this.radius;
        this.vy = 0;
    } else {
        this.vy += this.weight;
        this.vy *= 0.9;
        this.y += this.vy;
    }
    if (this.y < this.radius*2) {
      this.y = this.radius*2;
    }
    if (spacePressed && this.y > this.radius*2 ) {
      this.flap();
    }
  }

  draw(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.stroke
      ctx.stroke();
      ctx.strokeStyle =  this.colorStroke;
      ctx.fill();
    }

  flap() {
    this.vy -= 2;
  }
}

const ball = new Ball();
