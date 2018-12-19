// Get the elements from the DOM.
const canvasArea = document.getElementById('canvasArea');
const timerBtn = document.getElementById('timerBtn');
let timer = document.getElementById('timer');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

// Set the Canvas Width and Height as the Window.
canvasArea.width = window.innerWidth;
canvasArea.height = window.innerHeight + 20;

let timerBtnState = false;
let startSeconds = 0;
timer.innerHTML = 'Start game';


timerBtn.addEventListener('click', function () {
  if (timerBtnState === false) {
    timer.innerHTML = '';
    timer.innerHTML = startSeconds;
    console.log('stoped');
    timerBtnState = true;
  } else if (timerBtnState === true) {
    do {
      startSeconds += startSeconds + 1;
      timer.innerHTML = startSeconds;
    } while (timerBtnState === true);
  }
  timerBtnState = false;
});

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
// Variables for the Character.
const yEnemy = canvasArea.height;
const colorEnemy = 'blue';
const gravityValue = 6;
const radiusValue = 30;
const xEnemy = generateRandomValue(canvasArea.width);
const gravity = generateRandomValue(gravityValue);
const radiusEnemy = generateRandomValue(radiusValue);

function generateRandomValue (maxValue) {
  let maxNumb = maxValue;
  let randomNumb = parseInt(Math.random() * maxNumb);
  if (randomNumb < 3) {
    randomNumb += 3
  }
  return randomNumb;
}


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
}


let arrayEnemies = [];

setInterval(function (){
  const xEnemy = generateRandomValue(canvasArea.width);
  const gravity = generateRandomValue(gravityValue);
  const radiusEnemy = generateRandomValue(radiusValue);
  arrayEnemies.push(new EnemyCharacter(xEnemy, yEnemy, radiusEnemy, startPoint, endPoint, colorEnemy, gravity, false));
  console.log(arrayEnemies);
}, 5000);


// Move function.
// Function will create a Loop with the AnimationFrame.
// Loop will Draw and will Clear all from the Canvas Field.
function animateDraw() {
  requestAnimationFrame(animateDraw);
  canvasContext.clearRect(0, 0, canvasArea.width, canvasArea.height);
  newCharacter.updatedAnimationMainChar();

  arrayEnemies.forEach(element => {
    element.updatedAnimationEnemy();
    if (collisionDetection(newCharacter.xKey, newCharacter.yKey, element.xEnemyKey, element.yEnemyKey) < element.radiusKey + element.radiusKey) {
      newCharacter.xRightVelocityKey = 0;
      newCharacter.xLeftVelocityKey = 0;
      element.gravityKey = 0;
    } else {
      element.gravityKey = generateRandomValue(gravityValue);
    }
    if (element.yEnemyKey + element.radiusKey > window.innerHeight + element.radiusKey * 2) {
      element.yEnemyKey = canvasArea.height - canvasArea.height - 100;
    }
  });
}

function collisionDetection (xMainChar, yMainChar, xEnemyChar, yEnemyChar) {
  let xDistance = xEnemyChar - xMainChar;
  let yDistance = yEnemyChar - yMainChar;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// Call the AnimatedDraw Function.
animateDraw();

// Set the EventListeners to the Btns.
leftBtn.addEventListener('click', function (event) {
  newCharacter.xRightVelocityKey = 0;
  newCharacter.xLeftVelocityKey = 3;
});

rightBtn.addEventListener('click', function (event) {
  newCharacter.xRightVelocityKey = 3;
  newCharacter.xLeftVelocityKey = 0;
});


// SetIntervals to check when character is not longer on Game Zone.
setInterval(function () {
  if (newCharacter.xKey + newCharacter.radiusKey > window.innerWidth - newCharacter.radiusKey) {
    newCharacter.xRightVelocityKey = 0;
    newCharacter.xLeftVelocityKey = 5;
  } else if (newCharacter.xKey - newCharacter.radiusKey < window.innerWidth - window.innerWidth + newCharacter.radiusKey) {
    newCharacter.xRightVelocityKey = 5;
    newCharacter.xLeftVelocityKey = 0;
  }
}, 50);
