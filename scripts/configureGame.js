var difficulty;
var box = document.getElementById("box");


function start() {
  location.href = "./difficulty.html";
}

function setDifficulty(difficulty) {
  this.difficulty = difficulty;
  location.href = "./game.html";
}
