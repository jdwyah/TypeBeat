class Banner {

  constructor(text, x, y, timer) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.timer = timer;
  }

  render(ctx) {
    if(this.timer > 0){
      ctx.fillStyle = "white";
      ctx.fillText(this.text, this.x, this.y);
      this.timer -= 1;
    }
  }
}

class Banners {
  constructor(){
    this.array = new Array();
  }

  render(ctx){
    this.array.forEach((l) => { l.render(ctx); } )
  }

  add(text, pctX, pctY, timer){
    var b = new Banner(text,screenWidth * pctX, screenHeight * pctY, timer);
    this.array.push(b);
  }
  
  setBanner(text){
    this.add(text,.1,.98, 120);
  }

  setNextWordBanner(text){
    this.add(text,.5,.15, 110);
  }
}