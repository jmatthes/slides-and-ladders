var GRID_SIZE = 10;

var GAMEBOARD_ROWS = [
	new GameboardRow(1, 100, GRID_SIZE, false),
	new GameboardRow(2, 81, GRID_SIZE, true),
	new GameboardRow(3, 80, GRID_SIZE, false),
	new GameboardRow(4, 61, GRID_SIZE, true),
	new GameboardRow(5, 60, GRID_SIZE, false),
	new GameboardRow(6, 41, GRID_SIZE, true),
	new GameboardRow(7, 40, GRID_SIZE, false),
	new GameboardRow(8, 21, GRID_SIZE, true),
	new GameboardRow(9, 20, GRID_SIZE, false),
	new GameboardRow(10, 1, GRID_SIZE, true)
];

var LADDERS_CHUTES = {
	'1'  : new LadderOrChute( 1, 38,  true, "Plant flowers"),
	'4'  : new LadderOrChute( 4, 14,  true, "Bake a cake"),
	'9'  : new LadderOrChute( 9, 31,  true, "Mow the grass to go to the fair"),
	'21' : new LadderOrChute(21, 42,  true, "Play with a lost puppy."),
	'28' : new LadderOrChute(28, 84,  true, "Get a cat out of a tree"),
	'36' : new LadderOrChute(36, 44,  true, "Make lunch"),
	'51' : new LadderOrChute(51, 67,  true, "Sweep and go shopping"),
	'71' : new LadderOrChute(71, 91,  true, "Return a lost purse"),
	'80' : new LadderOrChute(80, 100, true, "Win the pet show"),

	'16' : new LadderOrChute(16,  6, false, "Read comics when you should be doing school work"),
	'49' : new LadderOrChute(49, 11, false, "Eat Chocolate candies without permission"),
	'47' : new LadderOrChute(47, 26, false, "Scate on thin ice"),
	'56' : new LadderOrChute(56, 53, false, "Go outside in the rain without a jacket and boots and you get sick"),
	'62' : new LadderOrChute(62, 19, false, "Brake a stack of plates"),
	'64' : new LadderOrChute(64, 60, false, "Show off on your bike and fall"),
	'87' : new LadderOrChute(87, 24, false, "Getting into the cookie jar"),
	'93' : new LadderOrChute(93, 73, false, "Write on the wall with crayon"),
	'95' : new LadderOrChute(95, 75, false, "Broke a window playing baseball, pay for a new window"),
	'98' : new LadderOrChute(98, 78, false, "Pull at a cat, you get scratched")
};




function setupGameboard() {
	GAMEBOARD_ROWS.forEach(function (gameboardRow) {
		var rowContent = "<tr>";
		for (i = 0; i < GRID_SIZE; i++) {
			var spaceNumber = gameboardRow.nextNumber();
			var ladderOrChute = LADDERS_CHUTES[spaceNumber.toString()];
			
			if(ladderOrChute != undefined){
				console.log("Ladder or Chute:" + ladderOrChute);
				
				rowContent = rowContent + '<td class="game-square" id="game-space-' + spaceNumber  + '" data-pos="'+spaceNumber+'">' + spaceNumber + ' <br>Go to ' + ladderOrChute.end + '</td>';
				
			}else{
				rowContent = rowContent + '<td class="game-square" id="game-space-' + spaceNumber  + '" data-pos="'+spaceNumber+'">' + spaceNumber + '</td>';
				
			}
		}
		$("#gameboard").append(rowContent + "</tr>");
	});
	
	

	
};
  


$(document).ready(function() {
	setupGameboard();
	


});