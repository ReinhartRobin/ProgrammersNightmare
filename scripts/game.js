var mouseX;
var mouseY;
var hold = false;
var moveInterval;


document.addEventListener('mousemove', (event) => {
    const {
      clientX,
      clientY
    } = event
      this.mouseX = clientX;
      this.mouseY = clientY;
  });


  function move() {
      if (hold) {
          clearInterval(moveInterval);
          hold = false;
      }else{
        moveInterval = setInterval(() => {
            document.getElementsByClassName("enemy")[0].style.left = mouseX-50+"px";
            document.getElementsByClassName("enemy")[0].style.top = mouseY-50+"px";
          }, 10);
          hold = true;
      }
      console.log(hold);
  }

  //TODO:
  // responsive, animation, change position, wellen, score,