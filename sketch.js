var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bgsound ,gunsound;
var bg ,bgImg;
var bg ,police, bullet, zombie;
var bulletImg ,zombieImg ,zombie1Img ,zombie2Img ,zombie3Img,policeImg,winnerImg,restartImg,loseImg;
var zombies,Bullets;
var highpoints ,points ,kills;

function preload() {
bgsound = loadSound("sounds/background.mp3");
gunsound = loadSound("sounds/shoot.mp3");

bgImg = loadImage("bg.png");
bulletImg  =loadImage("bullet.png");

policeImg = loadImage("police.png");
winnerImg = loadImage("winner_boy.png");
loseImg = loadImage("lose.png");
restartImg = loadImage("restart.png");


zombieImg = loadImage("zombie.png");
zombie1Img = loadImage("zombie1.png");
zombie2Img = loadImage("zombie2.png");
zombie3Img = loadImage("zombie3.png");

}

function setup() {
    createCanvas(1536, 720);

    bgsound.play();
    bg = createSprite(768,360);
    bg.addImage(bgImg);
    bg.scale = 5;
    bg.visible = true;

    police = createSprite(130,100);
    police.addImage(policeImg);
    police.scale = 0.8;
    police.visible = true;
    
    restart = createSprite(768,400);
    restart.addImage(restartImg);


    winner = createSprite(768,360);
    winner.addImage(winnerImg);


    lose = createSprite(761,167);
    lose.addImage(loseImg);

    lose.scale =  2;
    restart.scale = 0.2
    winner.scale =  0.4;

    zombies = new Group();
    Bullets= new Group();

kills = 0;
points = 0;
highpoints = 0;
}

function draw() {
  background("gold");

  //showing pointss
  strokeWeight(4);
  stroke("black");
  fill("yellow");
  textSize(50);
  text("High points: "+highpoints,1200,40);
  text("Points: "+points,724,40);
  text("Zombies Killed:"+kills,0,40);


    if(gameState === PLAY){
      
    winner.visible = false;
    lose.visible = false;
    restart.visible = false;

      if(keyDown("space")){
        createBullet();
        }

      if(Bullets.isTouching(zombies)){
        zombies.destroyEach();
        Bullets.destroyEach();
        points = points+5
        kills = kills+1;

      }

    if(zombies.isTouching(police)){
      gameState = END
    }
    if(points ===1,00,000){
      bgsound.stop();
      gunsound.stop();

      bg.visble = false;
    winner.visible = true;
    zombies.destroyEach();
    Bullets.destroyEach();
        police.visible = false;
      }
      police.y = World.mouseY;

    }else if(gameState === END) {
      strokeWeight(6);
      stroke("black");
      fill("green");
      textSize(50);
      text("press resart button to play once more",400,600);
        bg.visible = false;
        lose.visible = true;
        restart.visible = true;
        bgsound.stop();
        gunsound.stop();
        zombies.destroyEach();
        Bullets.destroyEach();
        police.visible = false;

        if(mousePressedOver(restart)) {
          reset();
        }
    }    
  //making high points
  if(highpoints<points){
    highpoints=points;
 }

    Zombie();
    drawSprites();
}

  function reset(){
    gameState = PLAY;
    bgsound.play();
    bg.visible = true;
    winner.visible = false;
    lose.visible = false;
    restart.visible = false;
    police.visible = true;
    points = 0;
    death = 0;
    kills = 0;
  }

function createBullet() {
  bullet = createSprite(270,97);
  bullet.addImage(bulletImg);
  bullet.velocityX = 90
  bullet.scale = 0.1
  bullet.y = police.y;
  gunsound.play();
  Bullets.add(bullet);
}

  function Zombie() {
    if(frameCount %40 === 0){
    zombie = createSprite(1536,360);
    zombie.velocityX = -21;
    zombie.y = Math.round(random(0,720));
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: zombie.addImage(zombieImg);
              break;
      case 2: zombie.addImage(zombie1Img);
              break;
      case 3: zombie.addImage(zombie2Img);
              break;
      case 4: zombie.addImage(zombie3Img);
              break;
      default: break;
    }
    
    zombie.scale = 0.2
    zombies.add(zombie);
  }
  }