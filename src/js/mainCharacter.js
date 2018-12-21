// Get the elements from the DOM.
const canvasArea = document.getElementById('canvasArea');
const timerBtn = document.getElementById('timerBtn');
let timer = document.getElementById('timer');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const instructionsBox = document.getElementById('instructionsBox');
const lifeBox = document.getElementById('lifeBox');

// Set the Canvas Width and Height as the Window.
canvasArea.width = window.innerWidth;
canvasArea.height = window.innerHeight + 20;

// Global variables and global functions.
let timerBtnState = false;
let startSeconds = 0;
let rotationLevelRotated = 10;
timer.innerHTML = 'Start game';

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

// Created array where enemies will be stored.
let arrayEnemies = [];

// Function SetInterval.
// This function will create enemies every given time.
// Inside this function is the random value generator.
// After generating random values for each element, function will push element into the Array.
// Every given time function will increase time by one.
function initGenerateEnemies () {
  setInterval(function (){
    const xEnemy = generateRandomValue(canvasArea.width);
    const gravity = generateRandomValue(gravityValue);
    const radiusEnemy = generateRandomValue(radiusValue);
    arrayEnemies.push(new EnemyCharacter(xEnemy, yEnemy, radiusEnemy, startPoint, endPoint, colorEnemy, gravity, false));
    startSeconds += 1;
    timer.innerHTML = startSeconds;
    console.log(arrayEnemies);
    if (startSeconds === rotationLevelRotated) {
      console.log('reached level');
    }
  }, 5000);
}

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
  if (newCharacter.xKey + newCharacter.radiusKey > window.innerWidth - newCharacter.radiusKey) {
    newCharacter.xRightVelocityKey = 0;
    newCharacter.xLeftVelocityKey = 5;
  } else if (newCharacter.xKey - newCharacter.radiusKey < window.innerWidth - window.innerWidth + newCharacter.radiusKey) {
    newCharacter.xRightVelocityKey = 5;
    newCharacter.xLeftVelocityKey = 0;
  }

  // Every frame will update animation from Enemy Character.
  // And it will check if there is any collision using CollisionDetection function that lifes outside main function.
  arrayEnemies.forEach(element => {
    element.updatedAnimationEnemy();
    if (collisionDetection(newCharacter.xKey, newCharacter.yKey, element.xEnemyKey, element.yEnemyKey) < newCharacter.radiusKey + element.radiusKey) {
      newCharacter.xRightVelocityKey = 0;
      newCharacter.xLeftVelocityKey = 0;
      element.gravityKey = 0;
      arrayEnemies.splice(element, 1);
      newCharacter.radiusKey += 5;
    } else {
      element.gravityKey = generateRandomValue(gravityValue);
    }
    if (element.yEnemyKey + element.radiusKey > window.innerHeight + element.radiusKey * 2) {
      element.yEnemyKey = canvasArea.height - canvasArea.height - 100;
    }
  });
}

// Call the AnimatedDraw Function.
animateDraw();

// Function will init enemies generation and will start timer.
timerBtn.addEventListener('click', function () {
  instructionsBox.setAttribute('class', 'hiddenInformation');
  lifeBox.setAttribute('class', 'hiddenInformation');
  timer.innerHTML = '';
  timer.setAttribute('class', 'loadingStartsState');
  initGenerateEnemies();
  setInterval(function (){
    if (startSeconds > 0) {
      timer.setAttribute('class', 'loadingEndsState');
    }
  }, 1000);
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
