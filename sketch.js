
// Function to make creating a 2D array easier
function create2DArray(columns, rows)
{
  var temp = new Array(columns);
  for(var i = 0; i < temp.length; i++)
    temp[i] = new Array(rows);
    
  return temp;
}

// Global variables
let arr_w = 20;
let arr_h = 20;
let cellSize = 16;

let currentGen;
let nextGen;

var play = false;

/////////////////

function setup()
{
  currentGen = create2DArray(arr_w, arr_h);
  
  createCanvas(arr_w * cellSize + 1, arr_h * cellSize + 1);
  
  // Sets up the cell grid
  for(var i = 0; i < arr_w; i++)
  {
    for(var j = 0; j < arr_h; j++)
    {
      currentGen[i][j] = new Cell(i, j, cellSize);
    }
  }
  
  // copies the grid as a future reference
  nextGen = currentGen;
  
  frameRate(60);
}

function draw()
{
  
  // loop for drawing cells and checking them at the same time (probably a terrible idea, fix needed)
  for(var i = 0; i < arr_w; i++)
  {
    for(var j = 0; j < arr_h; j++)
    {
      currentGen[i][j].draw();
      if(play) // if the simulation is running, check cells
        nextGen[i][j].check(currentGen);
    }
  }
  
  var temp = currentGen;
  currentGen = nextGen;
  nextGen = temp;
}

function keyPressed()
{
  play = !play;
  console.log("state changed: " + play);
}

function mouseClicked()
{
  for(var i = 0; i < arr_w; i++)
  {
    for(var j = 0; j < arr_h; j++)
    {
      // Checks if the mouse is over a specific cell when clicked
      if(nextGen[i][j].contains(mouseX, mouseY))
        nextGen[i][j].flipState();
    }
  }
}