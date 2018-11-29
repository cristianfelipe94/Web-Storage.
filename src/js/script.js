// Get the elements from the DOM.
const canvasArea = document.getElementById('canvasArea');

// Set the Canvas Width and Height as the Window.
canvasArea.width = window.innerWidth;
canvasArea.height = window.innerHeight;

// Create a context for the Canvas Field.
// Canvas context is 2d.
let canvasContext = canvasArea.getContext('2d');

// Main Character.
// Variables for the Character.
let x =  innerWidth / 2;
let y = innerHeight / 1.5;
let startPoint = 0;
let endPoint = Math.PI * 2;
let radius = 30;
let xVelocity = 0;

// Move function.
// Function will create a Loop with the AnimationFrame.
// Loop will Draw and will Clear all from the Canvas Field.
function animateDraw (){
  requestAnimationFrame(animateDraw);
  canvasContext.clearRect(0, 0, innerWidth, innerHeight);
  canvasContext.beginPath();
  canvasContext.arc(x, y, radius, startPoint, endPoint, false);
  canvasContext.strokeStyle = 'red';
  canvasContext.stroke();

  x += xVelocity;

}

// Call the AnimatedDraw Function.
animateDraw();
