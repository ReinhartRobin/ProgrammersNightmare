var mouseX;
var mouseY;
var hold = false;
var moveInterval;
var hit = false;
var points = 0;
var enemyLeftContent = `404`;
var enemyRightContnet = `500`;
var enemySpeed = 1;
var spawnRange;
var moveEnemyInterval = setInterval(moveEnemy, 5, 2);

function setDifficulty(difficulty) {
  gameActive = true;
  if (difficulty === 'easy') {
    enemySpeed = 0.5;
  } else if (difficulty === 'medium') {
    enemySpeed = 1;
  } else if (difficulty === 'hard') {
    enemySpeed = 1.5;
  }
  location.href = "./game.html";
}


function start() {
  location.href = "./difficulty.html";
}


function moveEnemy(index) {
  checkHitbox();
  if (index === 0) {
    document.getElementById("leftEnemy").style.left = getOffset(document.getElementById("leftEnemy")).left + enemySpeed + "px";
  } else if (index === 1) {
    document.getElementById("rightEnemy").style.left = getOffset(document.getElementById("rightEnemy")).left - enemySpeed + "px";
  } else {
    document.getElementById("rightEnemy").style.left = getOffset(document.getElementById("rightEnemy")).left - enemySpeed + "px";
    document.getElementById("leftEnemy").style.left = getOffset(document.getElementById("leftEnemy")).left + enemySpeed + "px";
  }
}


function move(index) {
  if (hold) {
    clearInterval(moveInterval);
    hold = false;
    clearInterval(moveEnemyInterval);
    moveEnemyInterval = setInterval(moveEnemy, 5, 2);
  } else {
    clearInterval(moveEnemyInterval);
    if (index === 0) {
      moveEnemyInterval = setInterval(moveEnemy, 5, 1);
    } else if (index === 1) {
      moveEnemyInterval = setInterval(moveEnemy, 5, 0);
    }


    moveInterval = setInterval(() => {
      if (index === 0) {
        document.getElementById("leftEnemy").style.left = mouseX - 50 + "px";
        document.getElementById("leftEnemy").style.top = mouseY - 50 + "px";
      } else {
        document.getElementById("rightEnemy").style.left = mouseX - 50 + "px";
        document.getElementById("rightEnemy").style.top = mouseY - 50 + "px";
      }
    }, 10);
    hold = true;
  }
}

function checkHitbox() {
  if (!hit) {
    if ((getOffset(document.getElementById("leftEnemy")).left + 100 >= getOffset(document.getElementById("programmer")).left &&
      getOffset(document.getElementById("leftEnemy")).left + 100 <= getOffset(document.getElementById("programmer")).left + 120
    ) && (
        (
          getOffset(document.getElementById("leftEnemy")).top >= getOffset(document.getElementById("programmer")).top &&
          getOffset(document.getElementById("leftEnemy")).top <= getOffset(document.getElementById("programmer")).top + 100
        ) || (
          getOffset(document.getElementById("leftEnemy")).top + 100 >= getOffset(document.getElementById("programmer")).top &&
          getOffset(document.getElementById("leftEnemy")).top + 100 <= getOffset(document.getElementById("programmer")).top + 100
        )
      ) || ((
        (
          getOffset(document.getElementById("rightEnemy")).top >= getOffset(document.getElementById("programmer")).top &&
          getOffset(document.getElementById("rightEnemy")).top <= getOffset(document.getElementById("programmer")).top + 100
        ) || (
          getOffset(document.getElementById("rightEnemy")).top + 100 >= getOffset(document.getElementById("programmer")).top &&
          getOffset(document.getElementById("rightEnemy")).top + 100 <= getOffset(document.getElementById("programmer")).top + 100
        )
      )
      ) && (getOffset(document.getElementById("rightEnemy")).left <= getOffset(document.getElementById("programmer")).left + 120 &&
        getOffset(document.getElementById("rightEnemy")).left >= getOffset(document.getElementById("programmer")).left
      )) {
      lostGame();
      hit = true;
    }
  }
  if (getOffset(document.getElementById("leftEnemy")).left >= window.innerWidth) {
    resetEnemy(0);
    points++;
    enemySpeed += 0.1;
    document.getElementById("points").innerText = `AVOIDED ERRORS: ` + points;
  } else if (getOffset(document.getElementById("rightEnemy")).left + 100 <= 0) {
    resetEnemy(1);
    points++;
    enemySpeed += 0.1;
    document.getElementById("points").innerText = `AVOIDED ERRORS: ` + points;
  }
}


function resetEnemy(num) {
  if (num === 0) {
    document.getElementById("leftEnemy").style.left = getRandomRange(num) + "px";
    document.getElementById("leftEnemy").style.top = "40%";
  } else {
    document.getElementById("rightEnemy").style.left = getRandomRange(num) + "px";
    document.getElementById("rightEnemy").style.top = "40%";
  }
}




document.addEventListener('mousemove', (event) => {
  const {
    clientX,
    clientY
  } = event
  this.mouseX = clientX;
  this.mouseY = clientY;
});

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function getRandomRange(enemyIndex) {
  if (enemyIndex === 0) {
    return Math.floor(Math.random() * (-500)) - 120;
  } else {
    return Math.floor(Math.random() * (window.innerWidth + 500)) + window.innerWidth + 120;
  }
}

function lostGame() {
  document.getElementById("body").innerHTML = ` 
  <div class="container">
  <div class="Headline">
    <h1>AN ERROR OCCURRED</h1>
  </div>
  <div class="finishContent">
    <h2 id="finishMessage">You saved the programmer from 0 bugs</h2>
    <div class="btn btn-three" onclick="setDifficulty()">
      <span>PLAY AGAIN</span>
    </div>
    <div class="btn btn-three" onclick="start()">
      <span>CHANGE DIFFICULTY</span>
    </div>
  </div>
</div>`;
}