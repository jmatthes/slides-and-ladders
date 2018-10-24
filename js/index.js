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

  drawGrid();
}

function drawGrid() {
  for(var x=0; x < BORD_CELLS; x++) {
    for (var y=0; y < BORD_CELLS; y++) {
      fill(COLORS[GRID[y][x]]);
      rect(x*CELLSIZE, y*CELLSIZE, CELLSIZE-1, CELLSIZE -1)
    }
  }
}




$(document).ready(function() {
	setup();
	
	$("#find-word-button").click(function() {
		findWordToUse();
	});

});
