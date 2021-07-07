var PLAY = 1;
var END = 0;
var gameState = PLAY;

var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameOver;

var score ;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  gameOver =loadImage("gameOver.png")
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,height-100);
path.addImage(pathImg);



//creating boy running
boy = createSprite(width/2,height-100,10,50);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
    
//gameOver = createSprite(300,180,10,20);
//gameOver.addImage("gameOver");
//gameOver.scale = 0.8;
//gameOver.visible = false; 
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  
  
  if(gameState === PLAY){
    
    path.velocityY = (4 + 3* treasureCollection/500);
    //  treasureCollection = treasureCollection + Math.round(getFrameRate()/60000);
    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
    if(path.y > 500 ){
    path.y = height/2;
  }
    
     if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection= treasureCollection+100;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
        treasureCollection= treasureCollection+250;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
        treasureCollection= treasureCollection+150;
      
    }else{
     if(swordGroup.isTouching(boy)) {
       /// swordGroup.destroyEach();
        gameState=END;
       
    }
  }
    
 }
  else if (gameState === END){
    
     text("Press Space to Restart the game!",300,400)
    
    if(swordGroup.isTouching(boy)) {
      boy.addAnimation("SahilRunning",gameOver);
      boy.scale=0.3;
      
       path.velocityY=0;
      
       cashG.setLifetimeEach(-1);
   diamondsG.setLifetimeEach(-1);
      jwelleryG.setLifetimeEach(-1);
      
      cashG.setVelocityYEach(0);
      cashG.destroyEach();
     diamondsG.setVelocityYEach(0);
      diamondsG.destroyEach();
     jwelleryG.setVelocityYEach(0);
     jwelleryG.destroyEach();
     swordGroup.setVelocityYEach(0);
      swordGroup.destroyEach();
    
      if(keyDown("space")) {
      reset();
    }
  }
  

  }

   

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width-395,height-500);

}

function reset(){
  gameState=PLAY;
  cashG.destroyEach();
  diamondsG.destroyEach();
   jwelleryG.destroyEach();
   swordGroup.destroyEach();
  boy.addAnimation("SahilRunning",boyImg);

 treasureCollection =0;
  
    path.velocityY = (4 + 3* treasureCollection/500);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50,width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = (3+treasureCollection/500);
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = (3+treasureCollection/500);
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = (3+treasureCollection/500);
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, width-100),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = (3+treasureCollection/500);
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}

//https://shriraksha16.github.io/Treasurehuntc-18/