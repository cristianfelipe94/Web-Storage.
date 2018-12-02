// Get the elements from the DOM.
const canvasArea = document.getElementById('canvasArea');

// Set the Canvas Width and Height as the Window.
canvasArea.width = window.innerWidth;
canvasArea.height = window.innerHeight;

// Create a context for the Canvas Field.
// Canvas context is 2d.
const canvasContext = canvasArea.getContext('2d');

// Main Character.
// Variables for the Character.
const x = canvasArea.width / 2;
const y = canvasArea.height /2;
const startPoint = 0;
const endPoint = Math.PI * 2;
const radius = 50;
const xRightVelocity = 0;
const xLeftVelocity = 0;
const color = 'red';
const gravity = 0;
const vy = 0;


// Main Character, this Character is an object with 'Caracteristics' or 'Parameters'
// The Parameters will be saved on its respective 'Key' or 'Variable'.
function MainCharacter(xKey, yKey, radiusKey, startPointKey, endPointKey, xLeftVelocityKey, xRightVelocityKey, colorKey ,gravitykey , vykey) {
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

  // This Function will live inside the Object as part of it.
  this.drawAnimation = function () {
    canvasContext.beginPath();
    canvasContext.arc(this.xKey, this.yKey, this.radiusKey, this.startPointKey, this.endPointKey, this.xRightVelocityKey, this.xLeftVelocityKey, this.colorKey,this.gravitykey , this.vykey, false);
    canvasContext.strokeStyle = this.colorKey;
    canvasContext.stroke();
  };

  // This Function will live inside the Object as part of it.
  // At the end of this Function another function will run.
  this.updatedAnimation = function () {
    this.xKey += this.xRightVelocityKey;
    this.xKey += this.xLeftVelocityKey;
    this.yKey += this.gravitykey;
    
    if(this.yKey + this.radiusKey >innerHeight || this.yKey - this.radiusKey < 0){
      //this.yKey = -this.gravitykey
      this.yKey = this.vykey;
      this.vykey += 2 ;
      // condicional que crea nuevos elementos /* hacer que cada uno tenga un math.random y cuando se haga cada if tengan diferentes medidas en Y */
      //animateDrawEnemys();
    }
    this.drawAnimation();
  };
}

// Create an Element that will get all the Parameters and Characteristics from the Main Object.
const newCharacter = new MainCharacter(x, y, radius, startPoint, endPoint, xLeftVelocity, xRightVelocity, color,  false);
const newCharacteEnemy = new MainCharacter(50, 0, radius, startPoint, endPoint, xLeftVelocity, xRightVelocity, color, 9 , vy, false);
const newCharacteEnemy2 = new MainCharacter(310, 0, radius, startPoint, endPoint, xLeftVelocity, xRightVelocity, color, 2 , vy, false);
const newCharacteEnemy3 = new MainCharacter(500, 0, radius, startPoint, endPoint, xLeftVelocity, xRightVelocity, color, 4 , vy, false);
const newCharacteEnemy4 = new MainCharacter(700, 0, radius, startPoint, endPoint, xLeftVelocity, xRightVelocity, color, 5 , vy, false);

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
}
// Funcion que se encarga resivir al elemento 2 enemigo //
/*function animateDrawEnemys(){
  newCharacteEnemy3.updatedAnimation();

}*/
// Call the AnimatedDraw Function.
animateDraw();
