// Get the elements from the DOM.
const canvasArea = document.getElementById('canvasArea');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

// Set the Canvas Width and Height as the Window.
canvasArea.width = window.innerWidth;
canvasArea.height = window.innerHeight + 20;


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
let xRightVelocity = 0;
let xLeftVelocity = 0;
const color = 'red';
const gravity = 0;
// vy es la inicializacion en y 
const vy = 0;
// yi detiene y restaura a vy  e inicia otravez  en 0 
const yi = 0;

// Main Character, this Character is an object with 'Caracteristics' or 'Parameters'
// The Parameters will be saved on its respective 'Key' or 'Variable'.
function MainCharacter(xKey, yKey, radiusKey, startPointKey, endPointKey, xLeftVelocityKey, xRightVelocityKey, colorKey ,gravitykey, vykey, yikey) {
  this.xKey = xKey;
  this.yKey = yKey;
  this.radiusKey = radiusKey;
  this.startPointKey = startPointKey;
  this.endPointKey = endPointKey;
  this.xLeftVelocityKey = xLeftVelocityKey;
  this.xRightVelocityKey = xRightVelocityKey;
  this.colorKey = colorKey;
  this.gravitykey = gravitykey;
  this.vykey = vykey;
  this.yikey = yikey

  // This Function will live inside the Object as part of it.
  this.drawAnimation = function () {
    canvasContext.beginPath();
    canvasContext.arc(this.xKey, this.yKey, this.radiusKey, this.startPointKey, this.endPointKey, this.xRightVelocityKey, this.xLeftVelocityKey, this.colorKey, this.gravitykey, this.vykey, this.yikey , false);
    canvasContext.strokeStyle = this.colorKey;
    canvasContext.stroke();
  };

  // This Function will live inside the Object as part of it.
  // At the end of this Function another function will run.
  this.updatedAnimation = function () {
    this.xKey += this.xRightVelocityKey;
    this.xKey -= this.xLeftVelocityKey;
    this.yKey += this.gravitykey;
    if(this.yKey + this.radiusKey > innerHeight ){
      this.vykey = this.yikey;
      console.log(this.vykey);
      this.yKey = this.vykey;
      console.log(this.yKey)
      this.vykey ++ ;
      this.xKey = Math.random() * innerHeight *3.5;
    }
    this.drawAnimation();
  };
}

// Create an Element that will get all the Parameters and Characteristics from the Main Object.
const newCharacter = new MainCharacter(x, y, radius, startPoint, endPoint, xLeftVelocity, xRightVelocity, color, false);
const newCharacteEnemy = new MainCharacter(Math.random()*innerHeight,0, 5, startPoint, endPoint, xLeftVelocity, xRightVelocity, color, 2/*2.5*/,vy,yi,false);
const newCharacteEnemy2 = new MainCharacter(Math.random()*innerHeight, 0, 26, startPoint, endPoint, xLeftVelocity, xRightVelocity, color, 4/*4*/,vy,yi, false);
const newCharacteEnemy3 = new MainCharacter(Math.random()*innerHeight, 0, 25, startPoint, endPoint, xLeftVelocity, xRightVelocity, color, 2.5 /*2*/,vy,yi, false);
const newCharacteEnemy4 = new MainCharacter(Math.random()*innerHeight, 0, radius, startPoint, endPoint, xLeftVelocity, xRightVelocity, color, 6/*5*/ ,vy,yi, false);
const newCharacteEnemy5 = new MainCharacter(Math.random()*innerHeight, 0, 10, startPoint, endPoint, xLeftVelocity, xRightVelocity, color, 1/*1.6*/ ,vy,yi, false);
// Move function.
// Function will create a Loop with the AnimationFrame.
// Loop will Draw and will Clear all from the Canvas Field.
function animateDraw() {
  requestAnimationFrame(animateDraw);
  canvasContext.clearRect(0, 0, canvasArea.width, canvasArea.height);
  newCharacter.updatedAnimation();
  newCharacteEnemy.updatedAnimation();
  newCharacteEnemy2.updatedAnimation();
  newCharacteEnemy3.updatedAnimation();
  newCharacteEnemy4.updatedAnimation();
  newCharacteEnemy5.updatedAnimation();
}

// Call the AnimatedDraw Function.
animateDraw();

// Set the EventListeners to the Btns.
leftBtn.addEventListener('click', function (event) {
  newCharacter.xRightVelocityKey = 0;
  newCharacter.xLeftVelocityKey = 3;
  newCharacter.colorKey = 'blue';
  console.log('movingLeft');
  console.log(newCharacter);
});

rightBtn.addEventListener('click', function (event) {
  newCharacter.xRightVelocityKey = 3;
  newCharacter.xLeftVelocityKey = 0;
  newCharacter.colorKey = 'green';
  console.log('movingRight');
  console.log(newCharacter);
});

setInterval(function () {
  if (newCharacter.xKey + newCharacter.radiusKey > window.innerWidth - newCharacter.radiusKey) {
    newCharacter.xRightVelocityKey = 0;
    newCharacter.xLeftVelocityKey = 5;
  } else if (newCharacter.xKey - newCharacter.radiusKey < (window.innerWidth - window.innerWidth + newCharacter.radiusKey)) {
    newCharacter.xRightVelocityKey = 5;
    newCharacter.xLeftVelocityKey = 0;
  }
}, 50);
