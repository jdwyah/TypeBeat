class Letter {
  constructor(character, x, wordPosition) {
    this.x = x;
    this.y = wordPosition * -40;
    this.character = character;
  }
  render(ctx){   
    ctx.fillStyle = "#ff00ff";
    ctx.fillText(this.character, this.x, this.y);
  }

  move(){
    this.y += 1;
  }
}

class Letters {
  constructor(){
    this.array = new Array();
  }

  add(letter){
    this.array.push(letter);
  }

  render(ctx){
    this.array.forEach((l) => { l.render(ctx); } )
  }

  tick(){
    for (let i = 0; i < this.array.length; i++) {
      var l = this.array[i];
      l.move();
      if(l.y > targetPoint + targetSize){
        this.array.splice(i, 1);
        console.log("too late");
        recordMiss();
        sounds.playMiss();
      }
    }
  }

  processKey(char){
    for (let i = 0; i < this.array.length; i++) {
      var l = this.array[i];
      if (l.character == char) {
        
        var perfect = targetPoint + (targetSize / 2);
        var distance = Math.abs(perfect - l.y);
        console.log("distance "+distance);

        if(distance < (targetSize / 2)){
          if(distance == 0){
            banners.setBanner("Perfect!");           
          }
          sounds.playHit(distance);
          curLevel.recordHit();
          points += 1;
        }else{
          console.log("too early");
          recordMiss();
        }
        
        // remove this entry from the array
        this.array.splice(i, 1);
        break;
      }
    }
  }
}