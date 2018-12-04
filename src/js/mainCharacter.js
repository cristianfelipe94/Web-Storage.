// Get the elements from the DOM.
const canvasArea = document.getElementById('canvasArea');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

// Set the Canvas Width and Height as the Window.
canvasArea.width = window.innerWidth;
canvasArea.height = window.innerHeight;


// Create a context for the Canvas Field.
// Canvas context is 2d.
const canvasContext = canvasArea.getContext('2d');

// Main Character.
// Variables for the Character.
const x = canvasArea.width / 2;
const y = canvasArea.height / 1.5;
const startPoint = 0;
const endPoint = Math.PI * 2;
const radius = 50;
let xRightVelocity = 0;
let xLeftVelocity = 0;
const color = 'red';

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
  this.drawAnimation = function () {
    canvasContext.beginPath();
    canvasContext.arc(this.xKey, this.yKey, this.radiusKey, this.startPointKey, this.endPointKey, this.xRightVelocityKey, this.xLeftVelocityKey, this.colorKey, false);
    canvasContext.strokeStyle = this.colorKey;
    canvasContext.stroke();
  };

  // This Function will live inside the Object as part of it.
  // At the end of this Function another function will run.
  this.updatedAnimation = function () {
    this.xKey += this.xRightVelocityKey;
    this.xKey -= this.xLeftVelocityKey;
    this.drawAnimation();
  };
}

// Create an Element that will get all the Parameters and Characteristics from the Main Object.
const newCharacter = new MainCharacter(x, y, radius, startPoint, endPoint, xLeftVelocity, xRightVelocity, color, false);

// Move function.
// Function will create a Loop with the AnimationFrame.
// Loop will Draw and will Clear all from the Canvas Field.
function animateDraw() {
  requestAnimationFrame(animateDraw);
  canvasContext.clearRect(0, 0, canvasArea.width, canvasArea.height);

  newCharacter.updatedAnimation();
}

// Call the AnimatedDraw Function.
animateDraw();

// Set the EventListeners to the Btns.
leftBtn.addEventListener('click', function (event) {
  newCharacter.xRightVelocityKey = 0;
  newCharacter.xLeftVelocityKey = 2;
  newCharacter.colorKey = 'blue';
  console.log('movingLeft');
  console.log(newCharacter);
});

rightBtn.addEventListener('click', function (event) {
  newCharacter.xRightVelocityKey = 2;
  newCharacter.xLeftVelocityKey = 0;
  newCharacter.colorKey = 'green';
  console.log('movingRight');
  console.log(newCharacter);
});

setInterval(function () {
  if (newCharacter.xKey + newCharacter.radiusKey * 2 > window.innerWidth) {
    newCharacter.xRightVelocityKey = 0;
    newCharacter.xLeftVelocityKey = 1;
  } else if (newCharacter.xKey + newCharacter.radiusKey * 2 < (window.innerWidth - window.innerWidth - newCharacter.radiusKey * 2)) {
    newCharacter.xRightVelocityKey = 1;
    newCharacter.xLeftVelocityKey = 0;
  }
}, 250);
