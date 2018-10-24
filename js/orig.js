var SIZE = 1000;

var BORD_CELLS = 10;
var CELLSIZE = SIZE / BORD_CELLS;

const COLORS = [
  "red",
  "orange",
  "purple",
  "pink",
  "lightgreen",
  "black",
  "white",
  "yellow",
  "blue",
  "green"
]

const GRID = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [5, 0, 3, 6, 1, 4, 7, 2, 5, 6],
  [6, 3, 0, 5, 2, 7, 4, 1, 5, 6],
  [3, 2, 1, 0, 7, 6, 5, 4, 5, 6],
  [4, 5, 6, 7, 0, 1, 2, 3, 5, 6],
  [1, 4, 7, 2, 5, 0, 3, 6, 5, 6],
  [2, 7, 4, 1, 6, 3, 0, 5, 5, 6],
  [1, 4, 7, 2, 5, 0, 3, 6, 5, 6],
  [2, 7, 4, 1, 6, 3, 0, 5, 5, 6],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
]

let PIECES = [
  [[7,7], [6,7], [5,7], [4,7], [3,7], [2,7], [1,7], [2,7], [1,7], [0,7]],
  [[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [5,0], [6,0], [7,0]]
]

function setup(){
  createCanvas(SIZE,SIZE);
}

function draw(){
  background(51);
  drawGrid();
  drawPieces();
}

function drawGrid() {
  for(var x=0; x < BORD_CELLS; x++) {
    for (var y=0; y < BORD_CELLS; y++) {
      fill(COLORS[GRID[y][x]]);
      rect(x*CELLSIZE, y*CELLSIZE, CELLSIZE-1, CELLSIZE -1)
    }
  }
}


function drawPieces() {
  drawMovableIndicators();
  drawPossibleMoves();
  for(var player=0; player<2; player++) {
    for(var piece=0; piece<BORD_CELLS; piece++) {
      var pos = PIECES[player][piece];
      
      fill(255 - player*255);
      ellipse(pos[0]*CELLSIZE + CELLSIZE / 2,
              pos[1]*CELLSIZE + CELLSIZE / 2,
              CELLSIZE * 0.75);
      fill(COLORS[piece]);
      ellipse(pos[0]*CELLSIZE + CELLSIZE / 2,
              pos[1]*CELLSIZE + CELLSIZE / 2,
              CELLSIZE * 0.35);
    }
  }
}


function drawMovableIndicators() {
  var movable = getMovablePieces()
  for(var i=0; i<movable.length; i++) {
    var pos = movable[i];
    noFill()
    for(var j = 0; j < 20; j++) {
      stroke(50, 50, 50, (0.8 - 0.04 * j) * 255);
      ellipse(pos[0]*CELLSIZE + CELLSIZE / 2,
              pos[1]*CELLSIZE + CELLSIZE / 2,
              CELLSIZE * 0.75 + j);
    }
  }
}


function drawPossibleMoves() {
  if(CURRENT_COLOR === -1) {
    return
  }
  
  var moves = getAvailableMoves(CURRENT_PLAYER, CURRENT_COLOR);
  
  for(var i=0; i<moves.length; i++) {
    var m = moves[i]
    fill(255)
    ellipse(m[0]*CELLSIZE + CELLSIZE / 2,
            m[1]*CELLSIZE + CELLSIZE / 2,
            CELLSIZE * 0.25);
  }
}


function getMouseSquare() {
  return [
    Math.floor(mouseX / CELLSIZE),
    Math.floor(mouseY / CELLSIZE)
  ]
}

// GAME LOGIC

PLAYERS = ["LOCAL", "LOCAL"]

var CURRENT_PLAYER = 0;
var CURRENT_COLOR = -1;
var GAME_OVER = false;

function getMovablePieces(){
  if(CURRENT_COLOR === -1) {
    return PIECES[CURRENT_PLAYER]
  }
  
  return [PIECES[CURRENT_PLAYER][CURRENT_COLOR]]
}

function getAvailableMoves(player, piece){
  var direction = [-1, 1][player];
  pos = PIECES[player][piece];
  var moves = [];
  
  var y = pos[1] + direction;
  var i = 1;
  blocked = [false, false, false]
  
  while (blocked.filter(function(x) {return x}).length < 3 && y >= 0 && y <= 7) {
    for(xoffset = 0; xoffset < 3; xoffset++) {
      var x = pos[0] + (xoffset - 1)*i;
      if(x >= 0 && x < 8 && !blocked[xoffset] && !pieceAt(x, y)){
        moves.push([x, y]);
      } else {
        blocked[xoffset] = true;
      }
    }
    
    i += 1;
    y += direction
  }
  
  return moves
}

function pieceAt(x, y) {
  for(player = 0; player < 2; player++){
    for(piece = 0; piece < 8; piece++) {
      var pos = PIECES[player][piece];
      if(pos[0] === x && pos[1] === y){
        return [player, piece];
      }
    }
  }
  return null;
}

function doMove(x, y) {
  PIECES[CURRENT_PLAYER][CURRENT_COLOR] = [x, y];
  
  // Check if someone won
  for(var i=0; i<8; i++) {
    // Since the winning player makes the last move, we don't need to check which player won.
    // if either of the players has a piece on the opposit
    // edge, the current player wins.
    if(PIECES[0][i][1] === 0 || PIECES[1][i][1] === 7) {
      GAME_OVER = true;
      updateInstructions("wins");
      return;
    }
  }
    
  CURRENT_PLAYER = (CURRENT_PLAYER + 1) % 2;
  CURRENT_COLOR = GRID[y][x];
  updateInstructions("Choose where you want to move the indicated piece");
  
  // If there are no moves available to the current player
  // Act af if they moved their stone of the current color
  // to the same place it is now.
  var moves = getAvailableMoves(CURRENT_PLAYER, CURRENT_COLOR);
  if(moves.length === 0) {
    doMove(...PIECES[CURRENT_PLAYER][CURRENT_COLOR]);
    updateInstructions(
      "The opponent could not move. Choose where to move the indicated piece."
    )
  }
}

var instr = document.getElementById("instructions")
function updateInstructions(text) {
  var players = ["white", "black"];
  var current = players[CURRENT_PLAYER];
  var other = players[(CURRENT_PLAYER + 1) % 2]
  instr.style.maxWidth = SIZE + "px";
  
  instr.classList.remove(other);
  instr.classList.add(current);
  instr.innerText = text;
}

updateInstructions("Choose which piece you want to move.");

function mouseClicked() {
  if(GAME_OVER) {
    return;
  }
  
  var square = getMouseSquare();
  var piece = pieceAt(...square)
  if(CURRENT_COLOR === -1) {
    if(piece && piece[0] === CURRENT_PLAYER) {
      CURRENT_COLOR = piece[1];
      updateInstructions("Choose where you want to move the indicated piece");
    }
    return
  }
  
  
  var moves = getAvailableMoves(CURRENT_PLAYER, CURRENT_COLOR);
  for(var i=0; i<moves.length; i++) {
    if(moves[i][0] === square[0] && moves[i][1] === square[1]){
      doMove(...square);
      return;
    }
  }
}


var rulesDoc = new Blob([`
<head>
  <title>How To Play</title>
  <style>
    body{
      padding: 1em;
      background-color: #A0A033;
      background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 28" width="56" height="28"%3E%3Cpath fill="%23339933" fill-opacity="0.4" d="M56 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23c.94-.95 1.96-1.83 3.03-2.63A13.98 13.98 0 0 0 0 0h7.75c2 1.1 3.73 2.63 5.1 4.45 1.12-.72 2.3-1.37 3.53-1.93A20.1 20.1 0 0 0 14.28 0h2.7c.45.56.88 1.14 1.29 1.74 1.3-.48 2.63-.87 4-1.15-.11-.2-.23-.4-.36-.59H26v.07a28.4 28.4 0 0 1 4 0V0h4.09l-.37.59c1.38.28 2.72.67 4.01 1.15.4-.6.84-1.18 1.3-1.74h2.69a20.1 20.1 0 0 0-2.1 2.52c1.23.56 2.41 1.2 3.54 1.93A16.08 16.08 0 0 1 48.25 0H56c-4.58 0-8.65 2.2-11.2 5.6 1.07.8 2.09 1.68 3.03 2.63A9.99 9.99 0 0 1 56 4v2a8 8 0 0 0-6.77 3.74c1.03 1.2 1.97 2.5 2.79 3.86A4 4 0 0 1 56 10v2a2 2 0 0 0-2 2.07 28.4 28.4 0 0 1 2-.07v2c-9.2 0-17.3 4.78-21.91 12H30zM7.75 28H0v-2c2.81 0 5.46.73 7.75 2zM56 20v2c-5.6 0-10.65 2.3-14.28 6h-2.7c4.04-4.89 10.15-8 16.98-8zm-39.03 8h-2.69C10.65 24.3 5.6 22 0 22v-2c6.83 0 12.94 3.11 16.97 8zm15.01-.4a28.09 28.09 0 0 1 2.8-3.86 8 8 0 0 0-13.55 0c1.03 1.2 1.97 2.5 2.79 3.86a4 4 0 0 1 7.96 0zm14.29-11.86c1.3-.48 2.63-.87 4-1.15a25.99 25.99 0 0 0-44.55 0c1.38.28 2.72.67 4.01 1.15a21.98 21.98 0 0 1 36.54 0zm-5.43 2.71c1.13-.72 2.3-1.37 3.54-1.93a19.98 19.98 0 0 0-32.76 0c1.23.56 2.41 1.2 3.54 1.93a15.98 15.98 0 0 1 25.68 0zm-4.67 3.78c.94-.95 1.96-1.83 3.03-2.63a13.98 13.98 0 0 0-22.4 0c1.07.8 2.09 1.68 3.03 2.63a9.99 9.99 0 0 1 16.34 0z"%3E%3C/path%3E%3C/svg%3E');

    }
    div{
      margin: auto;
      max-width: 700px;
    }
  </style>
</head>
<body>
  <div>
  <h1>How to Play</h1>
  <h2>Objective</h2>
  <p>The objective of the game is to get one of your stones to the opponent's side of the board</p>

  <h2>Moves</h2>
  <p>White moves first. They may choose which piece to move. Then, black must move their piece that corresponds to the color of the square white landed on. Next, white must move the piece corresponding to the square black just landed on, and so forth.</p>
<p>A piece can be moved forwards (towards the opponent's side), either directly or diagonally. A piece can not be moved backwards or sideways.</p>

<p>If a player cannot move the piece of the square their opponent moved to, their turn is skipped, and the color on which their piece that couldn't move stands, is taken as the new color to move.
  </p>
</div>
</body
`], {type: "text/html"});
var rulesURL = URL.createObjectURL(rulesDoc);

var htp = document.getElementById("htp");
htp.addEventListener("click", function() {
  window.open(rulesURL);
});
