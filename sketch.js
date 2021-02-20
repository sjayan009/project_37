var monkey, monkey_running, banana_img, obstacle_img;

var invisible_ground;

var back, back_img;

var score = 0;

var food_group, obstacle_group;

function preload()
{
 monkey_running = loadAnimation("images.monkey/Monkey_01.png","images.monkey/Monkey_02.png","images.monkey/Monkey_03.png","images.monkey/Monkey_04.png","images.monkey/Monkey_05.png","images.monkey/Monkey_06.png","images.monkey/Monkey_07.png","images.monkey/Monkey_08.png","images.monkey/Monkey_09.png","images.monkey/Monkey_10.png");
 
 back_img = loadImage("jungle.jpg");

 banana_img = loadImage("banana.png");
 
 obstacle_img = loadImage("stone.png");
  
}

function setup() 
{
  createCanvas(600,400);
  
  ground = createSprite(0,378,800,20);
  ground.velocityX = -5;
  ground.shapeColor = "black";
  ground.visible = false;   
  
  invisible_ground = createSprite(300,380,800,17);
  invisible_ground.visible = true;

  
  back = createSprite(300,100);
  back.addImage("jungle background", back_img);
  back.velocityX = -1;
              
  food_group = new Group();
  obstacle_group = new Group();
  
  //setting the text
  textFont("Arial");
  textStyle(BOLD);
  textSize(20);
  fill("white");

  monkey = createSprite(75,320,20,20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.02;
}

function draw() 
{
//removed background(220);

  //camera.x = monkey.x;
  camera.y = monkey.y;
  if(back.x < 290)
  {
    back.x = back.width /2;
  }
  
  if(keyDown("space") && monkey.y > 320)
  {
    monkey.velocityY = -17;
  }
  
  monkey.velocityY = monkey.velocityY +  0.8;
  
  banana_food();  
  
  if(monkey.isTouching(food_group))
  {
    score = score + 2;
    food_group.destroyEach();
    
    var scored = score;
    switch(scored)
    {
      case 4:  monkey.scale = 0.04;
               break;

      case 12: monkey.scale = 0.08;
               break;
               
      case 20: monkey.scale = 0.11;
               break;
               
      case 30: monkey.scale = 0.14;
               break;
               
      case 40: monkey.scale = 0.15;
               break;
               
      case 56: monkey.scale = 0.17;
               break;
               
      default: break;
    }
  } 
  
  if(monkey.isTouching(obstacle_group))
  {
    monkey.scale = 0.02;
    score = 0;
  }
  
  spawnRocks();
  
  monkey.collide(invisible_ground);
    
  drawSprites();
  text("Score: " + score ,425,50);
}

function banana_food()
{
  if(frameCount % 90 === 0)
  {
    //creating banana sprite
    var banana = createSprite(600,200);
    
    //setting where it will appear
    banana.y = random(120,200);
    
    //setting animation
    banana.addImage("Banana", banana_img);
    
    //scaling banana
    banana.scale = 0.05;
    
    //making banana move with the screen
    banana.velocityX = -6;
    
    //setting lifetime for banana
    banana.lifetime = 100;
    
    //adding the variable banana to group created for this sprite
    food_group.add(banana);
  }
}

function spawnRocks() {
  if(frameCount % 100 === 0) {
    
    //creating variable rock
    var rock = createSprite(600,350);

    //giving animation to rock
    rock.addAnimation("Stone", obstacle_img);
    
    //setting velocity for the rock
    rock.velocityX = random(-10,-15);
    
    //scaling the rock           
    rock.scale = 0.25;
    
    //setting lifetime for rock
    rock.lifetime = 120;        
    
    //add each obstacle to the group
    obstacle_group.add(rock);
  }
}
