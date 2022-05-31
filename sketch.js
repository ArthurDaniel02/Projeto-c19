
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Tartaruga, tartarugaImg
var grupoDeObstaculos, lebre, pedra, arbusto
var Floresta, florestaImg
var gameOver, restart
var invisibleGround
var score


function preload(){
 tartarugaImg = loadImage('tartaruga.png')
 lebre = loadImage('lebre.png')
 florestaImg = loadImage('floresta.jpg')
 pedra = loadImage('pedra.png')
 arbusto = loadImage('arbusto.webp')
 gameOverImg = loadImage('GameOver.png')
 restartImg = loadImage("restart.png")
}

function setup() {
 createCanvas(600, 400)
 Floresta = createSprite(400, 200)
 Floresta.addImage('floresta', florestaImg )

 
 Tartaruga = createSprite(50,300, 20, 50)
 Tartaruga.addImage('tartaruga', tartarugaImg)
 Tartaruga.scale = 0.2;
 
 gameOver = createSprite(200,100);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.1

 restart = createSprite(400,140);
 restart.addImage(restartImg);
 restart.scale = 0.1
 grupoDeObstaculos = createGroup()

 Tartaruga.setCollider("circle",0,0,30);


 invisibleGround = createSprite(200,310,400,10);
 invisibleGround.visible = false;

 score = 0
}

function draw() {
  
    
    if(gameState === PLAY){
        gameOver.visible = false
        restart.visible = false 
        Tartaruga.collide(invisibleGround);
        score = score + Math.round(getFrameRate()/60)
        Floresta.velocityX = -1
        if(Floresta.x < 190 ){
            Floresta.x = Floresta.width/2
        
        }
        
     
        if(keyDown("space")) {
            Tartaruga.velocityY = -12;
        }
        
        Tartaruga.velocityY = Tartaruga.velocityY + 0.8
      
        
        spawnObstacles();
        if(grupoDeObstaculos.isTouching(Tartaruga)){
            gameState = END;
            
        }
       }

        else if (gameState === END) {
        
             gameOver.visible = true;
             restart.visible = true;
             Floresta.velocityX = 0;
             Tartaruga.velocityY = 0
           
           
         grupoDeObstaculos.setLifetimeEach(-1)
         grupoDeObstaculos.setVelocityXEach(0);
      
        }
         
     if(mousePressedOver(restart)) {
      reset();
      }
      drawSprites()
      textSize(15)
      fill(255)
      text("Pontuação: "+ score, 475,50); 

      }

  
      
         
      function reset(){
        grupoDeObstaculos.destroyEach();
        score = 0;
        gameOver.visible = false;
        restart.visible = false;
        gameState = PLAY;
      }
      
      function spawnObstacles(){
        if (frameCount % 100 === 0){  
          var obstacle = createSprite(400,300,10,40);
          obstacle.velocityX = -(6 + score / 100) ;
          
    
           var rand = Math.round(random(1,3));
           switch(rand) {
             case 1: obstacle.addImage(pedra);
                     break;
             case 2: obstacle.addImage(arbusto);
                     break;
             case 3: obstacle.addImage(lebre);
                     break;
             default: break;
           }
          
           obstacle.scale = 0.15;
           obstacle.lifetime = 300;
          
           grupoDeObstaculos.add(obstacle);
        
        }
       }
    
