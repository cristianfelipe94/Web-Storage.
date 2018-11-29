//Get the elements from the DOM.
const canvasArea = document.getElementById('canvasArea');

//Set the Canvas Width and Height as the Window.
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
const xRightVelocity = 0;
const xLeftVelocity = 0;
const color = 'red';

function MainCharacter(xKey, yKey, radiusKey, startPointKey, endPointKey, xLeftVelocityKey, xRightVelocityKey, colorKey) {
  this.xKey = x;
  this.yKey = y;
  this.radiusKey = radius;
  this.startPointKey = startPoint;
  this.endPointKey = endPoint;
  this.xLeftVelocityKey = xLeftVelocity;
  this.xRightVelocityKey = xRightVelocity;
  this.colorKey = color;


  this.drawAnimation = function () {
    canvasContext.beginPath();
    canvasContext.arc(this.xKey, this.yKey, this.radiusKey, this.startPointKey, this.endPointKey, this.xRightVelocityKey, this.xLeftVelocityKey, this.colorKey, false);
    canvasContext.strokeStyle = this.colorKey;
    canvasContext.stroke();
  };

  this.updatedAnimation = function () {
    this.xKey += this.xRightVelocityKey;
    this.xKey -= this.xLeftVelocityKey;
    this.drawAnimation();
  };
}

// Create an Element that will get all the Parameters and Characteristics from the Main Object.
const newCharacter = new MainCharacter(this.xKey, this.yKey, this.radiusKey, this.startPointKey, this.endPointKey, this.xLeftVelocityKey, this.xRightVelocityKey, this.colorKey, false);

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
