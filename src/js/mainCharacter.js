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
const playAgain = document.getElementById('playAgain');

// Set the Canvas Width and Height as the Window.
canvasArea.width = window.innerWidth;
canvasArea.height = window.innerHeight;

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
    randomNumb = 3
  }
  return randomNumb;
}

// Function will generate random values.
// Use as Parameter a MaxValue.
function generateRandomValuePowerUps (maxValue) {
  let maxNumb = maxValue;
  let randomNumb = parseInt(Math.random() * maxNumb);
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
    canvasContext.arc(this.xEnemyKey, this.yEnemyKey, this.radiusKey, this.startPointKey, this.endPointKey, this.colorEnemyKey, this.gravityKey, false);
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
      // Enemy Character.
      // Variables for the Enemy Character.
      const yEnemy = canvasArea.height - canvasArea.height - 200;
      const colorEnemy = 'blue';
      const gravityValue = 6;
      const radiusValue = 30;
      const xEnemy = generateRandomValue(canvasArea.width);
      const gravity = generateRandomValue(gravityValue);
      const radiusEnemy = generateRandomValue(radiusValue);
      arrayEnemies.push(new EnemyCharacter(xEnemy, yEnemy, radiusEnemy, startPoint, endPoint, colorEnemy, gravity, false));
      startSeconds += 1;
      timer.innerHTML = startSeconds;
    }, 3000);
  }
};

function powerUp (xPowerUpKey, yPowerUpKey, radiusKey, startPointKey, endPointKey, colorPowerKey, gravityKey, powerUpNameKey, levelPowerGeneratedKey) {
  this.xPowerUpKey = xPowerUpKey;
  this.yPowerUpKey = yPowerUpKey;
  this.radiusKey = radiusKey;
  this.startPointKey = startPointKey;
  this.endPointKey = endPointKey;
  this.colorPowerKey = colorPowerKey;
  this.gravityKey = gravityKey;
  this.powerUpNameKey = powerUpNameKey;
  this.levelPowerGeneratedKey = levelPowerGeneratedKey;

  this.updatedAnimationPowerUp = function () {
    this.yPowerUpKey += this.gravityKey;
    this.drawAnimationPowerUp ();
    this.collision ();
  };

  this.drawAnimationPowerUp = function () {
    canvasContext.beginPath();
    canvasContext.arc(this.xPowerUpKey, this.yPowerUpKey, this.radiusKey, this.startPointKey, this.endPointKey, this.colorPowerKey, this.gravityKey, false);
    if (this.levelPowerGeneratedKey === 'firstLevelPowerUp') {
      canvasContext.fillStyle = 'gray';
    } else if (this.levelPowerGeneratedKey === 'secondLevelPowerUp') {
      canvasContext.fillStyle = 'lightBlue';
    } else if (this.levelPowerGeneratedKey === 'thirdLevelPowerUp') {
      canvasContext.fillStyle = 'pink';
    }
    canvasContext.fill();
    canvasContext.lineWidth = 1;
    canvasContext.strokeStyle = this.colorPowerKey;
    canvasContext.stroke();
  }

  this.collision = function () {
    if (collisionDetection(newCharacter.xKey, newCharacter.yKey, this.xPowerUpKey, this.yPowerUpKey) < newCharacter.radiusKey + this.radiusKey) {
      this.gravityKey = 0;
      if (this.powerUpNameKey === 'powerUpLife') {
        console.log('grapped life.')
        statusLife -= 1;
        newCharacter.radiusKey -= 5;
        let powerUpIndexof = arrayLifePowersUp.indexOf(this);
        arrayLifePowersUp.splice(powerUpIndexof, 1);
      } else if (this.powerUpNameKey === 'powerUpBoom') {
        console.log('grapped boom.')
        let enemyIndexOf = arrayEnemies.length;
        arrayEnemies.splice(0 ,enemyIndexOf);
        let powerUpIndexof = arrayBoomPowersUp.indexOf(this);
        arrayBoomPowersUp.splice(powerUpIndexof, 1);
      } else if (this.powerUpNameKey === 'speedUpPower') {
        console.log('grapped speed.')
        // Set the EventListeners to the Btns.
        leftBtn.addEventListener('click', function () {
          newCharacter.xRightVelocityKey = 0;
          newCharacter.xLeftVelocityKey = 5;
        });

        rightBtn.addEventListener('click', function () {
          newCharacter.xRightVelocityKey = 5;
          newCharacter.xLeftVelocityKey = 0;
        });
        let powerUpIndexof = arrayPowersUp.indexOf(this);
        arrayPowersUp.splice(powerUpIndexof, 1);
      } else if (this.powerUpNameKey === 'smallerPower') {
        console.log('grapped small size.')
        newCharacter.radiusKey -= 10;
        let powerUpIndexof = arrayPowersUp.indexOf(this);
        arrayPowersUp.splice(powerUpIndexof, 1);
      } else if (this.powerUpNameKey === 'switchPower') {
        console.log('grapped switch.')
        // Set the EventListeners to the Btns.
        rightBtn.addEventListener('click', function () {
          newCharacter.xRightVelocityKey = 0;
          newCharacter.xLeftVelocityKey = 3;
        });

        leftBtn.addEventListener('click', function () {
          newCharacter.xRightVelocityKey = 3;
          newCharacter.xLeftVelocityKey = 0;
        });
        let powerUpIndexof = arrayPowersUp.indexOf(this);
        arrayPowersUp.splice(powerUpIndexof, 1);
      } else if (this.powerUpNameKey === 'slowPower') {
        console.log('grapped slow-mo.')
        arrayEnemies.forEach(element => {
          element.gravityKey = 1;
          element.updatedAnimationEnemy();
        });
        let powerUpIndexof = arrayPowersUp.indexOf(this);
        arrayPowersUp.splice(powerUpIndexof, 1);
      }
    }
  }
}

let arrayLifePowersUp = [];
let respawnedLifePowerUp;
function powerUpsLifeGenerator () {
  if (timerBtnState === true) {
    respawnedLifePowerUp = setInterval(function (){
      const yPowerUp = canvasArea.height - canvasArea.height - 200;
      const colorPowerUp = 'black';
      const gravityPowerUpValue = 1.5;
      const radiusPowerUpValue = 25;
      levelPowerGenerated = 'secondLevelPowerUp';
      let powerUpName = 'powerUpLife';
      const xPowerUp = generateRandomValue(canvasArea.width);
      arrayLifePowersUp.push(new powerUp(xPowerUp, yPowerUp, radiusPowerUpValue, startPoint, endPoint, colorPowerUp, gravityPowerUpValue, powerUpName, levelPowerGenerated,false));
    }, 35000);
  }
}

let arrayBoomPowersUp = [];
let respawnedBoomPowerUp;
function powerUpsBoomGenerator () {
  if (timerBtnState === true) {
    respawnedBoomPowerUp = setInterval(function (){
      const yPowerUp = canvasArea.height - canvasArea.height - 200;
      const colorPowerUp = 'red';
      const gravityPowerUpValue = 1.5;
      const radiusPowerUpValue = 25;
      levelPowerGenerated = 'thirdLevelPowerUp';
      let powerUpName = 'powerUpBoom';
      const xPowerUp = generateRandomValue(canvasArea.width);
      arrayBoomPowersUp.push(new powerUp(xPowerUp, yPowerUp, radiusPowerUpValue, startPoint, endPoint, colorPowerUp, gravityPowerUpValue, powerUpName, levelPowerGenerated,false));
    }, 60000);
  }
}

let arrayPowersUp = [];
let arrayPowerUpsList = [
  'speedUpPower',
  'smallerPower',
  'switchPower',
  'slowPower'
];
let respawnedPowerUp;
function powerUpsGenerator () {
  if (timerBtnState === true) {
    respawnedPowerUp = setInterval(function (){
      const yPowerUp = canvasArea.height - canvasArea.height - 200;
      const xPowerUp = generateRandomValue(canvasArea.width);
      const gravityPowerUpValue = 1.5;
      const radiusPowerUpValue = 25;
      let colorPowerUp;
      let indexOfPowerUp = arrayPowerUpsList.length;
      let maxNumbIndexoOfPowerUp = Math.floor(generateRandomValuePowerUps(indexOfPowerUp));
      let powerUpName = arrayPowerUpsList[maxNumbIndexoOfPowerUp];
      levelPowerGenerated = 'firstLevelPowerUp';
      if (powerUpName === 'speedUpPower') {
        colorPowerUp = 'green';
      } else if (powerUpName === 'smallerPower') {
        colorPowerUp = 'yellow';
      } else if (powerUpName === 'switchPower') {
        colorPowerUp = 'orange';
      } else if (powerUpName === 'slowPower') {
        colorPowerUp = 'blue';
      }
      arrayPowersUp.push(new powerUp(xPowerUp, yPowerUp, radiusPowerUpValue, startPoint, endPoint, colorPowerUp, gravityPowerUpValue, powerUpName, levelPowerGenerated,false));
    }, 30000);
  }
}

console.log(arrayPowerUpsList);
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
  if (statusLife === 0) {
    firstHeart.setAttribute('src', 'assets/heartSolid.svg');
    secondHeart.setAttribute('src', 'assets/heartSolid.svg');
    thirdHeart.setAttribute('src', 'assets/heartSolid.svg');
    firstHeart.setAttribute('class', 'heartGame');
    secondHeart.setAttribute('class', 'heartGame');
    thirdHeart.setAttribute('class', 'heartGame');
  } else if (statusLife === 1) {
    firstHeart.setAttribute('src', 'assets/heartBrokenRed.svg');
    secondHeart.setAttribute('src', 'assets/heartSolid.svg');
    thirdHeart.setAttribute('src', 'assets/heartSolid.svg');
    firstHeart.setAttribute('class', 'heartGameHit');
    secondHeart.setAttribute('class', 'heartGame');
    thirdHeart.setAttribute('class', 'heartGame');
  } else if (statusLife === 2) {
    firstHeart.setAttribute('src', 'assets/heartBrokenRed.svg');
    secondHeart.setAttribute('src', 'assets/heartBrokenRed.svg');
    thirdHeart.setAttribute('src', 'assets/heartSolid.svg');
    firstHeart.setAttribute('class', 'heartGameHit');
    secondHeart.setAttribute('class', 'heartGameHit');
    thirdHeart.setAttribute('class', 'heartGame');
  } else if (statusLife >= 3) {
    thirdHeart.setAttribute('src', 'assets/heartBrokenRed.svg');
    firstHeart.setAttribute('class', 'heartGameAlmostDie');
    secondHeart.setAttribute('class', 'heartGameAlmostDie');
    thirdHeart.setAttribute('class', 'heartGameAlmostDie');
    if (langChosen === 1) {
      userScored.innerHTML = `Sobreviviste: ${startSeconds} segundos.`;
      playAgain.innerHTML = 'Toca acá para volver a jugar!';
    } else if (langChosen === 2) {
      userScored.innerHTML = `You survived: ${startSeconds} seconds.`;
      playAgain.innerHTML = 'Click here to try again!';
    }
    gameOverBox.setAttribute('class','gameOverShowingWrapper');
  }

  // Every frame will update animation from Enemy Character.
  // And it will check if there is any collision using CollisionDetection function that lifes outside main function.
  arrayEnemies.forEach(element => {
    element.updatedAnimationEnemy();
    if (element.yEnemyKey + element.radiusKey > canvasArea.height + element.radiusKey + 200) {
      element.yEnemyKey = canvasArea.height - canvasArea.height - 200;
    }
  });

  arrayLifePowersUp.forEach(element => {
    element.updatedAnimationPowerUp();
    let powerUpIndexof = arrayLifePowersUp.indexOf(element);
    if (element.yPowerUpKey + element.radiusPowerUpValue > canvasArea.height + element.radiusPowerUpValue + 200) {
      arrayLifePowersUp.splice(powerUpIndexof, 1);
    }
  });

  arrayBoomPowersUp.forEach(element => {
    element.updatedAnimationPowerUp();
    let powerUpIndexof = arrayBoomPowersUp.indexOf(element);
    if (element.yPowerUpKey + element.radiusPowerUpValue > canvasArea.height + element.radiusPowerUpValue + 200) {
      arrayBoomPowersUp.splice(powerUpIndexof, 1);
    }
  });

  arrayPowersUp.forEach(element => {
    element.updatedAnimationPowerUp();
    let powerUpIndexof = arrayPowersUp.indexOf(element);
    if (element.yPowerUpKey + element.radiusPowerUpValue > canvasArea.height + element.radiusPowerUpValue + 200) {
      arrayPowersUp.splice(powerUpIndexof, 1);
    }
  });

  if (statusLife >= characterLife) {
    timerBtnState = false;
    stopCreatingElements ();
    arrayEnemies.forEach(element => {
      element.gravityKey = 0;
    });
    arrayLifePowersUp.forEach(element => {
      element.gravityKey = 0;
    });
    arrayBoomPowersUp.forEach(element => {
      element.gravityKey = 0;
    });
    arrayPowersUp.forEach(element => {
      element.gravityKey = 0;
    });
  }
}

function stopCreatingElements () {
  clearInterval(respawnedEnemies);
  clearInterval(respawnedLifePowerUp);
  clearInterval(respawnedBoomPowerUp);
  clearInterval(respawnedPowerUp);
}

// Call the AnimatedDraw Function.
animateDraw();

// Function will init enemies generation and will start timer.
timerBtn.addEventListener('click', function () {
  userLifeBox.setAttribute('class','userlifeShowingWrapper');
  instructionsBox.setAttribute('class', 'hiddenInformation');
  lifeBox.setAttribute('class', 'hiddenInformation');
  langBox.setAttribute('class', 'langHiddenWrapper');
  timerBtn.setAttribute('class', 'timerWrapperOnGame');
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
  powerUpsLifeGenerator ();
  powerUpsBoomGenerator ();
  powerUpsGenerator ();
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
  instructions.innerHTML = 'Las reglas son sencillas, durar la mayor cantidad de tiempo sin ser tocado por los enemigos. Al ser tocado por los enemigos el tamaño del personaje va a aumentar, ocasionando que sea más sencillo perder.';
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
    timer.innerHTML = 'Reiniciando.';
    setInterval(function (){
      location.reload();
    }, 3000);
  } else if (langChosen === 2) {
    timer.innerHTML = '';
    timer.innerHTML = 'Starting.';
    setInterval(function (){
      location.reload();
    }, 3000);
  }
});
