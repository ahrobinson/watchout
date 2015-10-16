// start slingin' some d3 here.
/*TODO
1) Draw enemies in an SVG element
  -How many enemies will there be?
  30-40
  -What do the enemies look like?
  Patrick Star
  -How do we create them?
  Create an array of them with random x and y positions
2) Make enemies move to random location every second
3) Make different colored draggable dot to represent the player
4) Detect when an enemy touches you
5) Keep track of user score and display it

MICROSTEPS
1) Setup game board
2) Create player 
3) Create enemies
4) Render gameboard
5) Add movement to enemies
6) Play game
*/

//SETUP GAME BOARD

//Set up the environment
var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0
};

//Set up the game board
var axes = {
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
}

var gameBoard = d3.select(".container")
                .append("svg:svg")
                .attr('width', gameOptions.width)
                .attr('height', gameOptions.height);

//Update score function
var updateScore = function() {
  d3.select('.current')
    .text(gameStats.score.toString())
  };

//Update best score
var updateBestScore = function() {
  gameStats.bestScore = Math.max(gameStats.score, gameStats.bestScore);
  d3.select('.high').text(gameStats.bestScore.toString());
};



