// backgroud 
const background = new Image();
background.src = 'img/background/parallax-mountain_without_motion_bg.png';

function handleBackground(){
  ctx.drawImage( background, 0, 0, canvas.width, canvas.height);
}

//clouds
const clouds = new Image();
clouds.src = 'img/background/parallax-mountain_0004_Clouds.png';
const cloudMotion = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: 120,
}

function handleBackgroundClouds(){
  if (cloudMotion.x1 <= -cloudMotion.width) cloudMotion.x1 = cloudMotion.width;
  else cloudMotion.x1 -= levels[currentLevel].gamespeed*0.2;
  if (cloudMotion.x2 <= -cloudMotion.width) cloudMotion.x2 = cloudMotion.width;
  else cloudMotion.x2 -= levels[currentLevel].gamespeed*0.2;
  ctx.drawImage( clouds, cloudMotion.x1, clouds.y, cloudMotion.width, cloudMotion.height);
  ctx.drawImage( clouds, cloudMotion.x2, clouds.y, cloudMotion.width, cloudMotion.height);
}

// trees
const trees = new Image();
trees.src = 'img/background/parallax-mountain_0000_Foreground-Trees.png';
const treeMotion = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: 70,
}

function handleBackgroundTrees(){
  if (treeMotion.x1 <= -treeMotion.width) treeMotion.x1 = treeMotion.width;
  else treeMotion.x1 -= levels[currentLevel].gamespeed*0.6;
  if (treeMotion.x2 <= -treeMotion.width) treeMotion.x2 = treeMotion.width;
  else treeMotion.x2 -= levels[currentLevel].gamespeed*0.6;
  ctx.drawImage( trees, treeMotion.x1, canvas.height - treeMotion.height, treeMotion.width, 55);
  ctx.drawImage( trees, treeMotion.x2, canvas.height - treeMotion.height, treeMotion.width, 55);
}
