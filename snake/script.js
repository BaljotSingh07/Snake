const rows_cols = 20;
const boardSize = rows_cols * rows_cols;
let children;

let currentCol = 1;
let currentRow = 1;
let velocity = 0; // the current velocity of the snake
let moveInterval; // interval refernce so we can clear the interval once the game ends
let score = 0;
let applePos;

// the allowed velocity for that snake
const moveDirections = {"stay": 0, "up": 1, "down" : 2, "right": 3, "left": 4};
//snake body
const body = [];

document.addEventListener("DOMContentLoaded", function () {
  const main = document.getElementsByTagName("main")[0];
  children = main.children;
  main.style.gridTemplateColumns = `Repeat(${rows_cols},1fr)`;
  for (let i = 0; i < boardSize; i++) {
    main.insertAdjacentHTML("afterbegin", "<div></div>");
  }
  children.item(0).style.backgroundColor = "green";
  placeApple();
  document.addEventListener("keydown", function (event) {
    if(!moveInterval) moveInterval = setInterval(move, 150);// set interval will call the function move ever 150 ms, change this to increase snake speed
    switch (event.key) {
      case "w":
      case "ArrowUp":
        if(velocity != moveDirections.down) velocity = moveDirections.up;
        break;

      case "s":
      case "ArrowDown":
        if(velocity != moveDirections.up) velocity = moveDirections.down;
        break;

      case "d":
      case "ArrowRight":
        if(velocity != moveDirections.left) velocity = moveDirections.right;
        break;

      case "a":
      case "ArrowLeft":
        if(velocity != moveDirections.right) velocity = moveDirections.left;
        break;
    }
  });
});

function move(){
  body.push(((rows_cols * (currentRow-1)) + currentCol-1));
  children.item(body[body.length-1]).style.backgroundColor = "lightgreen";
  switch(velocity){
  case moveDirections.up:
    currentRow += -1;
    if (currentRow < 1) currentRow = rows_cols;
    break;
  case moveDirections.down:
    currentRow += 1;
    if (currentRow > rows_cols) currentRow = 1;
    break;
  case moveDirections.right:
    currentCol += 1;
    if (currentCol > rows_cols) currentCol = 1;
    break;
  case moveDirections.left:
    currentCol += -1;
    if (currentCol < 1) currentCol = rows_cols;
    break;
  }

  let currentPos = ((rows_cols * (currentRow-1)) + currentCol-1)
  children.item(currentPos).style.backgroundColor = "green";
  children.item(body[0]).style.backgroundColor = "white";
  body.shift();
  if(currentPos == applePos){
    body.push(0);
    score += 1;
    document.getElementById("score").innerText = `Score: ${score}`;
    placeApple();
  }
  if(body.includes(currentPos)) endGame();
}

function placeApple(){
  let apple;
  while(true){
    apple = Math.floor(Math.random() * (rows_cols * rows_cols));
    if(!body.includes(apple)) break;
  }
  children.item(apple).style.backgroundColor = "red";
  applePos = apple;
}


function endGame(){
  clearInterval(moveInterval);
  document.getElementById("gameOver").style.display = "inline";;
  document.getElementById("gameOverScore").innerText = `Score: ${score}`;
}