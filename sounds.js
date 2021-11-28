function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.sound.volume = 0.4;
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}


class Sounds {
  constructor(){

    this.missSound = new sound("sounds/oops.m4a");
    this.nextLevel = new sound("sounds/next_level.m4a");
    this.barely = new sound("sounds/barely.m4a");
    this.perfect = new sound("sounds/perfect.m4a");

    this.hits = new Array();
    this.hits.push(new sound("sounds/yay.m4a"));
    this.hits.push(new sound("sounds/yeah.m4a"));
    this.hits.push(new sound("sounds/nice.m4a"));
  }

  playMiss(){
    this.missSound.play();
  }
  playHit(howClose){
    if(howClose < 2){
      this.perfect.play();
    }else if(howClose > 15){
      this.barely.play();
    }else{
      this.hits[getRandomInt(this.hits.length)].play();
    }
  }
  playNextLevel(){
    this.nextLevel.play();
  }
}