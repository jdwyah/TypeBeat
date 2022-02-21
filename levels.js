class Levels {

  constructor() {
   this.array = new Array();
   this.currentLevel = 0;
  }

  add(level){
    this.array.push(level);
  }

  nextLevel(){
    this.currentLevel += 1;
    banners.setBanner("Level "+(this.currentLevel+1));
  }
  
  getCurrent(){
    return this.array[this.currentLevel];
  }

  getCurrentLevel(){
    return this.currentLevel;
  }

}

class Level {
  constructor(message, introArray, testArray){
    this.message = message;
    this.introArray = introArray;
    this.testArray = testArray;
    
    this.hits = 0;
    this.misses = 0;
    this.wordsThisLevel = 0;
  }  

  isFinished(){
    return this.wordsThisLevel > 12;
  }

  recordHit(){
    this.hits += 1;
  }
  recordMiss(){
    this.misses += 1;
  }
  getNextWord(){
  //   words[Math.floor(Math.random()*words.length)];
  //     curLevel = levels.getCurrent();
  // window.curLevel = curLevel;   
    this.wordsThisLevel += 1;

    if(this.wordsThisLevel == 1){
      banners.setBanner(this.message);
    }

    var arr = this.introArray;
    if(this.wordsThisLevel > 6) {
      arr = this.testArray;
    }
    return arr[Math.floor(Math.random()*arr.length)]
  }
}

window.levels = new Levels();
levels.add(new Level(
  "Let's Go!",
  ['f', 'j','ff','jjj','fj','jf','fff','jj'],
  ['fjf', 'jfj', 'ffjj','fjfj','jjjf','jfjf','jjff','fffj', 'fjjj', 'jfff', 'ffj', 'jjf'],
));

levels.add(new Level(
  "Here comes d and k!",
  ['k', 'd', 'kk', 'dd', 'kd', 'kkk', 'dk', 'ddd'],
  ['kd', 'dk', 'jk', 'df', 'ffk', 'jdd', 'dfjk', 'ddjj', 'kkff', 'ddjk', 'fkj'],
));


levels.add(new Level(
  "Left Hand Boogie!",
  ['a', 's', 'd', 'f', 'as', 'df'],
  ['ddd', 'fff', 'df', 'ds', 'as', 'ds', 'dfd', 'asa', 'asdf'],
));

levels.add(new Level(
  "Add J back in!",
  ['aj', 'sj', 'dj', 'fj', 'j', 'jf'],
  ['djd', 'fjf', 'asa', 'fjf', 'djjj', 'jjjs', 'jja', 'jfj', 'jfd'],
));


levels.add(new Level(
  "Middle Magic",
  ['dd', 'ff', 'jj', 'kk', 'dj', 'jf', 'kd', 'dk'],
  ['kdk', 'fjf', 'dff', 'kjj', 'dfj', 'jfk', 'dfd', 'jkj', 'kdj'],
));

levels.add(new Level(
  "Outsides!",
  ['aaa', 'sss', 'lll', ';;;', ';ll'],
  ['lsl', 'asa', 'lss', 'all', 'lsl', 'aaa', 'al;', 'lsl', 'saa'],
));

levels.add(new Level(
  "Home Row Madness",
  ['asd', 'sdf', 'jkl', 'kl;'],
  ['jak', 'jad', 'jas', 'las', 'dad', 'sad'],
));

// var levels = [

//   {
//     speed: 1,
//     words: ['f', 'j','ff','jj','fff','jjj','fjf'],
//     passAt: 10,
//     message: "Let's go!",
//   },
//   {
//     speed: 1,
//     words: ['ddd', 'kkk', 'k', 'd', 'dkd', 'kd', 'dk', 'jk', 'df', 'ffk', 'jdd'],
//     message: "Here comes d and k!",
//   },
//   {
//     speed: 1,
//     words: ['a', 'aa', 's', 'ss', 'ddd', 'fff', 'df', 'ds', 'as', 'ds', 'dfd', 'asa'],
//     message: "Left Hand Boogie!",
//   },
//   {
//     speed: 1,
//     words: ['jjj', 'kkk', 'lll', ';', 'jkl;', ';lkj', 'jkj', 'klk', 'jlk'],
//     message: "Right Hand Boogie!",
//   },
//   {
//     speed: 1,
//     words: ['asdf', 'jkl', 'fjf', 'dad', 'fad', 'jad', 'lad', 'sssd', 'jjkl'],
//     message: "Home row madness!",
//   },
//   {
//     speed: 1,
//     words: ['g', 'h', 'hh', 'ghg', 'hgh', 'jfh', 'ghj', 'dk', 'had', 'lad', 'ggg'],
//     message: "G & H! Move it!",
//   },
//   {
//     speed: 1,
//     words: ['tyty', 'ttt', 'yyy', 't', 'y', 'yyyy', 'tttt', 'dk', 'had', 'taly', 'yay'],
//     message: "T & Y! Index fingers go!",
//   },  
//   {
//     speed: 1,
//     words: ['rrr', 'uuu', 'uuuy', 'rrrt', 'ruty', 'suds', 'fuj', 'say', 'kay', 'kary', 'ray'],
//     message: "R & U!",
//   },  
//   {
//     speed: 1,
//     words: ['nnn', 'nnnj', 'fnf', 'fjf', 'ruty', 'fun', 'fuj', 'sun', 'nat', 'tan', 'yay'],
//     message: "N!",
//   },  
//   {
//     speed: 1,
//     words: ['tree', 'what', 'the', 'rag', 'hugs', 'you', 'fang', 'your'],
//     message: "roh roh",
//   },
// ]
