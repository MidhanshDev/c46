var HOME = 1;
var PLAY = 2;
var END = 0;
var gameState = HOME;

var bg,bgImg,running,player,fire,spike,cactusImg,checkpoint,finish,end,gameOver,gameOverImg,restart,restartImg,collided,title,play,life;
var ground,groundImg;
var invisibleGround;
var obstaclesGroup;
var finishLineGroup;
var home;
var play;

function preload(){
bgImg = loadImage("../images/BG.png");
running = loadAnimation("../images/run1.png","images/run2.png","images/run3.png","images/run4.png","images/run5.png");
spike = loadImage("../images/spiketrap.png");
cactusImg = loadImage("../images/cactus.png");
finish = loadImage("../images/finishline.png");
end = loadImage("../images/end.png");
gameOverImg = loadImage("../images/gameOver.png");
groundImg = loadImage("../images/ground.png");
restartImg = loadImage("../images/restart.png");
collided = loadImage("../images/collided.png");
title = loadImage("../images/Title.png");
playImg = loadImage("../images/playButton.png");


}
function setup() {
  createCanvas(displayWidth,displayHeight);
  image(title,displayWidth/2,displayHeight/2);

  home = createSprite(displayWidth/2,displayHeight/2);
  home.addImage("title",title);
  home.scale = 3;

  play = createSprite(displayWidth/2,displayHeight/2+90);
  play.addImage("play",playImg);

  ground = createSprite(width/2, height/2+300, width, 10);
  ground.x = ground.width /2;
  ground.addImage("groundImg",groundImg);
  ground.scale = 2;
  console.log(ground.width);


  player = createSprite(200,height/2+200,10,50);
  player.addAnimation("running",running);
  player.addAnimation("collided",collided);
  player.scale = 4;

  gameOver = createSprite(width/2,height/2);
  gameOver.addImage("gameOver",gameOverImg);

  restart = createSprite(width/2,height/2+100);
  restart.addImage("restart",restartImg);
  restart.scale = 0.2;

  invisibleGround = createSprite(width/2,height/2+280,width,5);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  finishLineGroup = new Group();

}

function draw() {
  background(bgImg); 
  if(gameState===HOME){

    gameOver.visible = false;
    restart.visible = false;

    player.changeAnimation("collided",collided);

    ground.velocityX = 0;
    player.velocityY = 0;
  
    if(mousePressedOver(play)){
      gameState = PLAY;
    }

  }

  
  else if(gameState===PLAY){

  home.visible = false;
  play.visible = false;
  gameOver.visible = false;
  restart.visible = false;

  if(frameCount===200){
    spawnFinishLine();
  }

  ground.velocityX = -6;

  player.changeAnimation("running",running);
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  if(keyDown("space") && player.y>=height/2+200){
    player.velocityY = -10;
  }


  player.velocityY = player.velocityY+0.3;
  

  spawnObstacles();

  if(player.isTouching(obstaclesGroup)){
    gameState = END;
  }

  }

  else if(gameState===END){
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    player.velocityY = 0;

    finishLineGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    
    player.changeAnimation("collided",collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    finishLineGroup.setLifetimeEach(-1);
    
  }
  if(mousePressedOver(restart)) {
    reset();
  }
  player.collide(invisibleGround);
  drawSprites();
}

function reset(){
  gameState = PLAY;

  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup.destroyEach();

  player.changeAnimation("running",running);

}


function spawnObstacles() {
if(frameCount % 160 === 0){
  var cactus = createSprite(width,height/2+210,10,40);
  cactus.velocityX = -(6);

  var rand = Math.round(random(1,2));
  switch(rand){
    case 1: cactus.addImage("cactus",cactusImg);
            break;
    case 2: cactus.addImage("spike",spike);
            break;
    default: break;
  }
  cactus.scale = 0.5;
  cactus.lifetime = width/6;

  obstaclesGroup.add(cactus);

}

}

function spawnFinishLine() {
 
    var finishLine = createSprite(width,height/2+165,10,40);
    finishLine.addImage("finish",finish);
    finishLine.velocityX = -(6);
  
    finishLine.scale = 1;
    finishLine.lifetime = width/6;
  
    finishLineGroup.add(finishLine);
  
  }
  
  