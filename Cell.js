
// Cell function class
function Cell(i, j, size)
{
  this.x = i * size;
  this.y = j * size;
  this.i = i;
  this.j = j;
  this.size = size;
  
  this.alive = false;
  
  this.draw = function()
  {
    if(this.alive)
    {
      fill(0);
    }else{
      fill(255);
    }
    rect(this.x, this.y, this.size, this.size);
  };
}

// Checks surrounding cells.
Cell.prototype.check = function(arr)
{
  var aliveNeighbors = 0;
  
  for(var ioff = -1; ioff <= 1; ioff++)
  {
    // Check if we are not causing the OutOfBounds exception
    if(this.i + ioff < 0 || this.i + ioff >= 20) continue;
    
    for(var joff = -1; joff <= 1; joff++)
    {
      // Check if we are not causing the OutOfBounds exception  
      if(this.j + joff < 0 || this.j + joff >= 20) continue;
      
      var neighbor = arr[this.i + ioff][this.j + joff];
      // Check if the neighbor is alive, if so, add to the total
      if(neighbor.alive && neighbor != this)
        aliveNeighbors++;
    }
  }
  
  // Rules:
  // if the cell is alive and there are less than 2 alive cells surrounding it, the cell will die from under population
  // if the cell is alive and there are more than 3 alive cells surrounding it, the cell dies from over population
  // if the cell is alive and there are 2-3 alive cells surrounding it, the cell will pass on to the other generation
  // if the cell is dead and there are exactly 3 cells surrounding it, the cell will become alive again due to reproduction
  if(this.alive)
  {
    if(aliveNeighbors == 2 || aliveNeighbors == 3)
      this.alive = true;
    else
      this.alive = false;
  }else{
    if(aliveNeighbors == 3)
      this.alive = true;
    else 
      this.alive = false;
  }
  
  return this.alive;
};

// Checks if the coordinates (x, y) are within the bounds of the cell
Cell.prototype.contains = function(x, y)
{
  return (x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size) ? true : false;
};

// Test for fliping cell's state
Cell.prototype.flipState = function(){
  this.alive = !this.alive;
};