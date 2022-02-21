const canvas = document.getElementById('my-first-canvas');
const ctx = canvas.getContext('2d');
ctx.font = '48px Arial';
var screenHeight = canvas.height;
var screenWidth = canvas.width;
var quit = false;
var pause = false;
var targetPoint = screenHeight * .75;
var targetSize = 60;
var points = 0;
var health = 8;
var dead = false;
var gameTime = 0;

/*
- https://freemusicarchive.org/genre/Techno
- add BPM to each level & music, find matches. 

- l2 = exist:fj new: dks


TODO
- get rid of wordsThisLevel
- change nextWord to get levels.getNextWord()
- add levels.recordWordCompletion()
- make level trigger nextLevel functionality
- cooler graphcics
- fire? https://slicker.me/javascript/fire/fire.htm
- fireworks? http://slicker.me/javascript/fireworks.htm

*/

window.onkeyup = function(e)
	{
    e.stopPropagation();
		switch(e.keyCode)
		{		
      case 27: // 'esc'
        console.log("escape");
        quit = true;
        break;
      case 13: 
        console.log("enter");
        if(pause){
          pause = false;
          sounds.startMusic();
        }else{
          pause = true;
          sounds.stopMusic();
        }
        break;
      default:
        letters.processKey(e.key);
        console.log(" you pressed some other key. it's number was "+e.keyCode+" "+e.key);
    }
    e.preventDefault();
  };



var letters = new Letters();
var banners = new Banners();

function recordMiss(){
  sounds.playMiss();
  curLevel.recordMiss();
  health -= 1;
}
function render(){

  //clear the screen
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, screenWidth, screenHeight);


  var gradient = ctx.createLinearGradient(0,targetPoint, 0,targetPoint+targetSize);

  // Add three color stops
  gradient.addColorStop(0, 'black');
  gradient.addColorStop(.5, 'cyan');
  gradient.addColorStop(1, 'black');

  // Set the fill style and draw a rectangle
  ctx.fillStyle = gradient;
  ctx.fillRect(0, targetPoint, screenWidth, targetSize);
  
  //display health
  var health = getHealth();
  if(health < 5){
    ctx.fillStyle = "red";
  }else{
    ctx.fillStyle = "green";
  }
  ctx.fillText(health, screenWidth - 80, screenHeight - 2);


  ctx.fillStyle = "white";
  ctx.fillText(""+points, screenWidth - 70, 40);

  banners.render(ctx);

  letters.render(ctx);
}

function getHealth(){
  return this.health;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// The order of the keys from left to right on the keyboard
var xOrder = ['q', 'a', 'z', 'w', 's', 'x', 'e', 'd', 'c', 'r', 'f', 'v', 't', 'g', 'b', 'y', 'h', 'n', 'u', 'j', 'm', 'i', 'k', ',', 'o', 'l','.', 'p', ';', '/'];


var xPos = {};

for(var i=0; i < xOrder.length; i++){
  xPos[xOrder[i]] = i/30.0;
}


var sounds = new Sounds();
// this is the what needs to happen every loop

function setLevel(){
  curLevel = levels.getCurrent();
  window.curLevel = curLevel;   

  if(curLevel.isFinished()){
    levels.nextLevel();
    sounds.playNextLevel();
    health += 2;
  }
  curLevel = levels.getCurrent();
  window.curLevel = curLevel;   



}

function mainLoop(){
  if(!pause){
   gameTime += 1;
  
   //move letters
   letters.tick(); 
  }
  
  //draw things
  render();

  setLevel();

  // if(gameTime % (getRandomInt(3)*30) == 0){
  if(gameTime % 180 == 0){

    // Pick random word from words
    nextWord =  curLevel.getNextWord();

    console.log("next word: "+nextWord);
    banners.setNextWordBanner(nextWord);
    nextCharacters = nextWord.split("");
    for(var i=0;i<nextCharacters.length;i++){
      var c = nextCharacters[i];
      var x = xPos[c] * screenWidth;
      letters.add(new Letter(c, x, i));
    }
    
  }  

  if(getHealth() < 1 && dead == false){
    dead = true;
    sounds.stopMusic();
    sounds.playGameOver();
    banners.add("GAME OVER", .2,.4,90);
    banners.add("Your Score Was "+points, 0.1,.65,90);
    pause = true;
    setTimeout(() => {
      quit = true;
    },3000)
  }

  // wait from things to draw, then call ourselves again so it loops
  if(quit){
    sounds.stopMusic();
  }else{
    var fps = 100;
    setTimeout(() => {
      requestAnimationFrame(mainLoop);
    }, 1000 / fps);
    // window.requestAnimationFrame(mainLoop);
  }
}


function init(){
  setTimeout(function(){
      sounds.startMusic();
    }, 3000);
}

// when the game starts, create the objects
// then start the loop
 window.onload = function(){
  init();
  mainLoop();
 }