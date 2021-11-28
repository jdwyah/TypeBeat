const canvas = document.getElementById('my-first-canvas');
const ctx = canvas.getContext('2d');
ctx.font = '48px Arial';
var screenHeight = canvas.height;
var screenWidth = canvas.width;
var quit = false;
var pause = false;
var targetPoint = 200;
var targetSize = 60;
var hits = 0;
var misses = 0;
var points = 0;

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
        pause = true;
        break;
      default:
        letters.processKey(e.key);
        // console.log(" you pressed some other key. it's number was "+e.keyCode+" "+e.key);
    }
    e.preventDefault();
  };



var letters = new Letters();

var bannerText = "";
var bannerCount = 0;
function renderBanner(ctx){
  if(bannerCount > 0){
    ctx.fillStyle = "white";
    ctx.fillText(bannerText, 20, screenHeight-2);
    bannerCount -= 1;
  }
}
function setBanner(text){
  bannerText = text;
  bannerCount = 120;
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
  if(health > 0){
    ctx.fillStyle = "green";
  }else{
    ctx.fillStyle = "red";
  }
  ctx.fillText(health, screenWidth - 80, screenHeight - 2);


  ctx.fillStyle = "white";
  ctx.fillText(""+points, screenWidth - 60, 40);


  renderBanner(ctx);

  letters.render(ctx);
}

function getHealth(){
  return this.hits - this.misses;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

var xOrder = ['q', 'a', 'z', 'w', 's', 'x', 'e', 'd', 'c', 'r', 'f', 'v', 't', 'g', 'b', 'y', 'h', 'n', 'u', 'j', 'm', 'i', 'k', ',', 'o', 'l','.', 'p', ';', '/'];


var xPos = {};

for(var i=0; i < xOrder.length; i++){
  xPos[xOrder[i]] = i/30.0;
}

var levels = [

  {
    speed: 1,
    words: ['f', 'j','ff','jj','fff','jjj','fjf'],
    passAt: 10,
    message: "Let's go!",
  },
  {
    speed: 1,
    words: ['f', 'j', 'k', 'd', 'fjf', 'kd', 'dk'],
    message: "Here comes d and k!",
  },
  {
    speed: 1,
    words: ['a', 'aa', 's', 'ss', 'fjf', 'jj', 'k', 'kk', 'l', 'll', 'la', 'as'],
    message: "Home row madness!",
  },
  {
    speed: 1,
    words: ['asdf', 'jkl', 'fjf', 'dad', 'fad', 'jad', 'lad'],
    message: "Home row madness!",
  },
  {
    speed: 1,
    words: ['g', 'h', 'hh', 'ghg', 'hgh', 'jfh', 'ghj', 'dk', 'had', 'lad', 'ggg'],
    message: "Move those fingers!",
  },
  {
    speed: 1,
    words: ['tree', 'what', 'the', 'rag', 'hugs', 'you', 'fang', 'your'],
    message: "roh roh",
  },
]

var gameTime = 0;
var currentLevel = -1;
var wordsThisLevel = 0;
var sounds = new Sounds();
// this is the what needs to happen every loop

function setLevel(){
  if(currentLevel < 0 || wordsThisLevel > 10){
    currentLevel += 1;
    hits = 0;
    misses = 0;
    wordsThisLevel = 0;
    words = levels[currentLevel]["words"];
    setBanner("Level "+(currentLevel+1));
    sounds.playNextLevel();
  }
  if(wordsThisLevel == 1){
    setBanner(levels[currentLevel]["message"]);
  }

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
    nextWord =  words[Math.floor(Math.random()*words.length)];
    wordsThisLevel += 1;

    console.log("next word: "+nextWord);
    nextCharacters = nextWord.split("");
    for(var i=0;i<nextCharacters.length;i++){
      var c = nextCharacters[i];
      var x = xPos[c] * screenWidth;
      letters.add(new Letter(c, x, i));
    }
    
  }  

  if(getHealth() < -4){
    alert("Game Over");
    quit = true;
  }

  // wait from things to draw, then call ourselves again so it loops
  if(!quit){
    window.requestAnimationFrame(mainLoop);
  }
}


function init(){

}

// when the game starts, create the objects
// then start the loop
 window.onload = function(){
  init();
  mainLoop();
 }