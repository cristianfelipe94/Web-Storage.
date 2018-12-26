// Get the elements from the DOM.
const canvasArea = document.getElementById('canvasArea');
const timerBtn = document.getElementById('timerBtn');
let timer = document.getElementById('timer');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const instructionsBox = document.getElementById('instructionsBox');
const instructions = document.getElementById('instructions');
const lifeBox = document.getElementById('lifeBox');
const live = document.getElementById('live');
const gameOverBox = document.getElementById('gameOverBox');
const gameOver = document.getElementById('gameOver');
const userScored = document.getElementById('userScored');
const userLifeBox = document.getElementById('userLifeBox');
const firstHeart = document.getElementById('firstHeart');
const secondHeart = document.getElementById('secondHeart');
const thirdHeart = document.getElementById('thirdHeart');
const heartGame = document.querySelectorAll('heartGame');
const langBox = document.getElementById('langBox');
const españolFlagLang = document.getElementById('españolFlagLang');
const englishFlagLang = document.getElementById('englishFlagLang');

// Set the Canvas Width and Height as the Window.
canvasArea.width = window.innerWidth;
canvasArea.height = window.innerHeight + 20;

// Global variables and global functions.
let timerBtnState;
let startSeconds = 0;
timer.innerHTML = 'Iniciar';
let statusLife = 0;
const characterLife = 3;
let langChosen = 1;

// Function for Collisions, has parameters.
function collisionDetection (xMainChar, yMainChar, xEnemyChar, yEnemyChar) {
  let xDistance = xEnemyChar - xMainChar;
  let yDistance = yEnemyChar - yMainChar;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// Function will generate random values.
// Use as Parameter a MaxValue.
function generateRandomValue (maxValue) {
  let maxNumb = maxValue;
  let randomNumb = parseInt(Math.random() * maxNumb);
  if (randomNumb < 3) {
    randomNumb += 3
  }
  return randomNumb;
}

// Create a context for the Canvas Field.
// Canvas context is 2d.
const canvasContext = canvasArea.getContext('2d');

// Main Character.
// Variables for the Character.
const x = canvasArea.width / 2;
const y = canvasArea.height / 1.5;
const startPoint = 0;
const endPoint = Math.PI * 2;
const radius = 25;
const xRightVelocity = 0;
const xLeftVelocity = 0;
const color = 'black';

// Main Character, this Character is an object with 'Caracteristics' or 'Parameters'
// The Parameters will be saved on its respective 'Key' or 'Variable'.
function MainCharacter(xKey, yKey, radiusKey, startPointKey, endPointKey, xLeftVelocityKey, xRightVelocityKey, colorKey) {
  this.xKey = xKey;
  this.yKey = yKey;
  this.radiusKey = radiusKey;
  this.startPointKey = startPointKey;
  this.endPointKey = endPointKey;
  this.xLeftVelocityKey = xLeftVelocityKey;
  this.xRightVelocityKey = xRightVelocityKey;
  this.colorKey = colorKey;

  // This Function will live inside the Object as part of it.
  // At the end of this Function another function will run.
  this.updatedAnimationMainChar = function () {
    this.xKey += this.xRightVelocityKey;
    this.xKey -= this.xLeftVelocityKey;
    this.drawAnimationMainChar();
  };

  // This Function will live inside the Object as part of it.
  this.drawAnimationMainChar = function () {
    canvasContext.beginPath();
    canvasContext.arc(this.xKey, this.yKey, this.radiusKey, this.startPointKey, this.endPointKey, this.xRightVelocityKey, this.xLeftVelocityKey, this.colorKey, false);
    canvasContext.fillStyle = 'red';
    canvasContext.fill();
    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = this.colorKey;
    canvasContext.stroke();
  };
}

// Create an Element that will get all the Parameters and Characteristics from the Main Object.
const newCharacter = new MainCharacter(x, y, radius, startPoint, endPoint, xLeftVelocity, xRightVelocity, color, false);

// Enemy Character.
// Variables for the Enemy Character.
const yEnemy = canvasArea.height;
const colorEnemy = 'blue';
const gravityValue = 6;
const radiusValue = 30;
const xEnemy = generateRandomValue(canvasArea.width);
const gravity = generateRandomValue(gravityValue);
const radiusEnemy = generateRandomValue(radiusValue);

// Main Character, this Character is an object with 'Caracteristics' or 'Parameters'
// The Parameters will be saved on its respective 'Key' or 'Variable'.
function EnemyCharacter(xEnemyKey, yEnemyKey, radiusKey, startPointKey, endPointKey, colorEnemyKey, gravityKey) {
  this.xEnemyKey = xEnemyKey;
  this.yEnemyKey = yEnemyKey;
  this.radiusKey = radiusKey;
  this.startPointKey = startPointKey;
  this.endPointKey = endPointKey;
  this.colorEnemyKey = colorEnemyKey;
  this.gravityKey = gravityKey;

  // This Function will live inside the Object as part of it.
  // At the end of this Function another function will run.
  this.updatedAnimationEnemy = function () {
    this.yEnemyKey += this.gravityKey;
    this.drawAnimationEnemy();
    this.collision();
  };

  // This Function will live inside the Object as part of it.
  this.drawAnimationEnemy = function () {
    canvasContext.beginPath();
    canvasContext.arc(this.xEnemyKey, this.yEnemyKey, this.radiusKey, this.startPointKey, this.endPointKey, this.colorEnemyKey, gravityKey, false);
    canvasContext.fillStyle = 'black';
    canvasContext.fill();
    canvasContext.lineWidth = 1;
    canvasContext.strokeStyle = this.colorEnemyKey;
    canvasContext.stroke();
  };

  this.collision = function () {
    if (collisionDetection(newCharacter.xKey, newCharacter.yKey, this.xEnemyKey, this.yEnemyKey) < newCharacter.radiusKey + this.radiusKey) {
      this.gravityKey = 0;
      let enemyIndexOf = arrayEnemies.indexOf(this);
      arrayEnemies.splice(enemyIndexOf, 1);
      newCharacter.radiusKey += 5;
      statusLife += 1;
      newCharacter.xRightVelocityKey = 0;
      newCharacter.xLeftVelocityKey = 0;
    }
  }
}

// Created array where enemies will be stored.
let arrayEnemies = [];

// Function SetInterval.
// This function will create enemies every given time.
// Inside this function is the random value generator.
// After generating random values for each element, function will push element into the Array.
// Every given time function will increase time by one.
let respawnedEnemies;
function enemyGenerator () {
  if (timerBtnState === true) {
    respawnedEnemies = setInterval(function(){
      console.log(arrayEnemies);
      const xEnemy = generateRandomValue(canvasArea.width);
      const gravity = generateRandomValue(gravityValue);
      const radiusEnemy = generateRandomValue(radiusValue);
      arrayEnemies.push(new EnemyCharacter(xEnemy, yEnemy, radiusEnemy, startPoint, endPoint, colorEnemy, gravity, false));
      startSeconds += 1;
      timer.innerHTML = startSeconds;
    }, 5000);
  }
};

// Move function.
// Function will create a Loop with the AnimationFrame.
// Loop will Draw and will Clear all from the Canvas Field.
// Loop is running every frame and will check for collisions.
function animateDraw() {

  // Call function into AnimationFrame to create a loop.
  requestAnimationFrame(animateDraw);

  // ClearRect will clear strokes from animation moves.
  canvasContext.clearRect(0, 0, canvasArea.width, canvasArea.height);

  // Every frame will update animation from main character.
  newCharacter.updatedAnimationMainChar();

  // As soon as MainCharacter reaches the edges of the screen, it'll be pushed to the opposite side.
  if (newCharacter.xKey + newCharacter.radiusKey > window.innerWidth) {
    newCharacter.xRightVelocityKey = 0;
    newCharacter.xLeftVelocityKey = 6;
  } else if (newCharacter.xKey - newCharacter.radiusKey < window.innerWidth - window.innerWidth) {
    newCharacter.xRightVelocityKey = 6;
    newCharacter.xLeftVelocityKey = 0;
  }

  if (statusLife === 1) {
    firstHeart.setAttribute('src', 'assets/heartBrokenRed.svg');
    firstHeart.setAttribute('class', 'heartGameHit');
  } else if (statusLife === 2) {
    secondHeart.setAttribute('src', 'assets/heartBrokenRed.svg');
    secondHeart.setAttribute('class', 'heartGameHit');
  } else if (statusLife >= 3) {
    thirdHeart.setAttribute('src', 'assets/heartBrokenRed.svg');
    firstHeart.setAttribute('class', 'heartGameAlmostDie');
    secondHeart.setAttribute('class', 'heartGameAlmostDie');
    thirdHeart.setAttribute('class', 'heartGameAlmostDie');
    if (langChosen === 1) {
      userScored.innerHTML = `Sobreviviste: ${startSeconds} segundos.`;
    } else if (langChosen === 2) {
      userScored.innerHTML = `You survived: ${startSeconds} seconds.`;
    }
    gameOverBox.setAttribute('class','gameOverShowingWrapper');
  }

  // Every frame will update animation from Enemy Character.
  // And it will check if there is any collision using CollisionDetection function that lifes outside main function.
  arrayEnemies.forEach(element => {
    element.updatedAnimationEnemy();
    if (element.yEnemyKey + element.radiusKey > window.innerHeight + element.radiusKey * 2) {
      element.yEnemyKey = canvasArea.height - canvasArea.height - 100;
    }
  });

  if (statusLife >= characterLife) {
    timerBtnState = false;
    clearInterval(respawnedEnemies);
    arrayEnemies.forEach(element => {
      element.gravityKey = 0;
    });
  }
}

// Call the AnimatedDraw Function.
animateDraw();

// Function will init enemies generation and will start timer.
timerBtn.addEventListener('click', function () {
  userLifeBox.setAttribute('class','userlifeShowingWrapper');
  instructionsBox.setAttribute('class', 'hiddenInformation');
  lifeBox.setAttribute('class', 'hiddenInformation');
  langBox.setAttribute('class', 'langHiddenWrapper');
  timer.innerHTML = '';
  if (langChosen === 1) {
    timer.setAttribute('class', 'cargandoIniciaEstado');
    setInterval(function (){
      if (startSeconds > 0) {
        timer.setAttribute('class', 'cargandoFinEstado');
      }
    }, 10);
  } else if (langChosen === 2) {
    timer.setAttribute('class', 'loadingStartsState');
    setInterval(function (){
      if (startSeconds > 0) {
        timer.setAttribute('class', 'loadingEndsState');
      }
    }, 10);
  }
  timerBtnState = true;
  enemyGenerator ();
  
});

// Set the EventListeners to the Btns.
leftBtn.addEventListener('click', function () {
  newCharacter.xRightVelocityKey = 0;
  newCharacter.xLeftVelocityKey = 3;
});

rightBtn.addEventListener('click', function () {
  newCharacter.xRightVelocityKey = 3;
  newCharacter.xLeftVelocityKey = 0;
});

españolFlagLang.addEventListener('click', function(){
  langChosen = 1;
  leftBtn.innerHTML = 'I';
  rightBtn.innerHTML = 'D';
  instructions.innerHTML = 'Las reglas son sencillas, durar la mayor cantidad de tiempo sin ser tocado por los enemigos. Al ser tocado por los enemigos el tamaño del personaje va a aumentar, ocacionando que sea más sencillo perder.';
  live.innerHTML = 'Tu personaje cuenta con 3 vidas, así que aprovéchalas!';
  timer.innerHTML = 'Iniciar';
  gameOver.innerHTML = 'Perdiste!';
});

englishFlagLang.addEventListener('click', function(){
  langChosen = 2;
  leftBtn.innerHTML = 'L';
  rightBtn.innerHTML = 'R';
  instructions.innerHTML = 'Rules are simple, last as long as possible without being touched by enemies. When touched by enemies your character size will increase making it easier to lose.';
  live.innerHTML = 'Your character has 3 lives, so take advantage of them!';
  timer.innerHTML = 'Start game';
  gameOver.innerHTML = 'Game over!';
});

gameOverBox.addEventListener('click', function () {
  if (langChosen === 1) {
    timer.innerHTML = '';
    timer.innerHTML = 'Cargando';
    timer.setAttribute('class', 'cargandoIniciaEstado');
    setInterval(function (){
      timer.setAttribute('class', 'cargandoFinEstado');
      location.reload();
    }, 5000);
  } else if (langChosen === 2) {
    timer.innerHTML = '';
    timer.innerHTML = 'Loading';
    timer.setAttribute('class', 'loadingStartsState');
    setInterval(function (){
      timer.setAttribute('class', 'loadingEndsState');
      location.reload();
    }, 5000);
  }
});
