var towerImg,tower,spookySound;
var door,doorImg,doorsGroup;
var climberImg,climber,climbersgroup;
var ghost,ghostImg;
var invisibleBlock,invisibleBlockGroup;
var gameState="play";

function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}

function setup(){
  
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 2;
  
  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background(0);
  
  if (gameState==="play") {
    
  if (tower.y>400) {
    tower.y = 300;
  }
  
  if (keyDown("right_arrow")){
    ghost.x = ghost.x+3;
  } 
  
  if (keyDown("left_arrow")) {
    ghost.x = ghost.x-3;
  }
  
  if (keyDown("space")) {
    ghost.velocityY = -5;
  }
  
  ghost.velocityY = ghost.velocityY+0.3;
  
  if (climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
  
  if (invisibleBlockGroup.isTouching(ghost) || ghost.y>600) {
    ghost.destroy();
    gameState = "end";
  }
  
  spawnDoors();
  drawSprites();
}

if (gameState==="end") {
  stroke("Yellow");
  fill("Yellow");
  textSize(30);
  text("Game Over", 230,250);
}
}
  function spawnDoors() {
  if (frameCount %250 === 0) {
    door = createSprite(200,-50);
    door.addImage(doorImg);
    door.x = Math.round(random(100,300));
    door.velocityY = 2;
    door.lifetime = 300;
    doorsGroup.add(door);
    
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    climber.velocityY = 2;
    climber.x = door.x;
    climber.lifetime = 300;
    climbersGroup.add(climber);
    
    invisibleBlock = createSprite(200,10);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 2;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
  }
}


