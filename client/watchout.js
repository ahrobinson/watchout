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


//Declare range helper functions
var range = function(start, stop, step) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }

  step = step || 1;
  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range = Array(length);
  for (var idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
};




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
};

var gameBoard = d3.select('.container')
                .append('svg:svg')
                .attr('width', gameOptions.width)
                .attr('height', gameOptions.height);

//Update score function
var updateScore = function() {
  d3.select('.current')
    .text(gameStats.score.toString());
};

//Update best score
var updateBestScore = function() {
  gameStats.bestScore = Math.max(gameStats.score, gameStats.bestScore);
  d3.select('.high').text(gameStats.bestScore.toString());
};

//Players TODO
var Player = {
  
  //Circle
  fill: '#ff6600',
  x: 0,
  y: 0,
  angle: 0,
  r: 5,

};

//Enemies
var createEnemies = function() {

  //Returns and array of enemy objects, with the properties "x" and "y"
  var enemiesArray = range(0, gameOptions.nEnemies).map(function(i){
    return {id: i, x: Math.random()*100, y: Math.random()*100}
  });

  return enemiesArray;
};

//Render the game board
var render = function(enemy_data) {
  //Select all the enemies on the board and bind the data to them, using the enemies' id attribute as a key to ensure we update enemies in the future  
  var enemies = gameBoard.selectAll('svg').data(enemy_data, function(d) {
    return d.id;
  });

  enemies.enter().append('image')
    .attr('xlink:href','asteroid.png')
    .attr('x', function(enemy) { return axes.x(enemy.x) })
    .attr('y', function(enemy) { return axes.y(enemy.y) })
    .attr('width', 25)
    .attr('height', 25)
    .attr('class', 'asteroid')

};

//Transition
//# transition.attrTween(name, tween)
//https://github.com/mbostock/d3/wiki/Transitions#attrTween
//Use setInterval

//Selects all the asteroid and puts them on one point - select individual asteroid, then make sure they go to random points
// d3.selectAll('.asteroid').transition().attr('x', Math.random() * 700).attr('y', Math.random() * 450)

//select individual asteroids and then call the below function

var moveEnemy = function() {
  
  d3.selectAll('.asteroid').each(function() {
    d3.select(this).transition().attr('x', Math.random() * 700).attr('y', Math.random() * 450)
  })
  
}

setInterval(function() {moveEnemy()}, 1000);






var newEnemies = createEnemies();
render(newEnemies);


