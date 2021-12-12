function sound(src, callback = false) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.sound.volume = 0.4;
  this.sound.onended = function(){
    if(callback){
      // I know, it's not a callback. But adding it later didn't seem to work
      sounds.startMusic();
    }
  }
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
    this.gameOver = new sound("sounds/game_over.m4a");

    this.hits = new Array();
    this.hits.push(new sound("sounds/yay.m4a"));
    this.hits.push(new sound("sounds/yeah.m4a"));
    this.hits.push(new sound("sounds/nice.m4a"));

    this.music = new Array();
    this.music.push(new sound("sounds/music/exhale.mp3", true));
    this.music.push(new sound("sounds/music/drop.mp3", true));
    this.music.push(new sound("sounds/music/static.mp3", true));
    this.music.push(new sound("sounds/music/warhol.mp3", true));
    this.currentMusic = -1;
  }

  startMusic(){
    this.currentMusic += 1;
    if(this.currentMusic == this.music.length){
      this.currentMusic = 0;
    }
    console.log("startMusic "+this.currentMusic);
    var current = this.music[this.currentMusic];
    current.play();
  }
  stopMusic(){
    this.music[this.currentMusic].stop();
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
  playGameOver(){
    this.gameOver.play();
  }
}