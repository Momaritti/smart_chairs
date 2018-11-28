function Box(x, y, w, h) {
    this.body = Bodies.rectangle(x, y, w, h);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
    
    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rect(0, 0, this.w, this.h);

        pop();
    }
}

function removeFromArray(arr, elt) {
    for (var i = arr.length-1; i>=0; i--) {
        if(arr[i] == elt) {
            arr.splice(i, 1);
        }
    }
}

var cols = 5;
var rows = 5;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;

function Spot(i, j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];

    this.show = function(col) {
        fill(col);
        noStroke();
        rect(this.x * i, this.j * h, w-1, h-1);
    }
    this.addNeighbors = function (grid) {
        var i = this.i;
        var j = this.j;
        if(i < cols-1) {
            this.neighbors.push(grid[i+1] [j]);
        }
        if(i > 0) {
            this.neighbors.push(grid[i-1] [j]);
        }
        if(j < rows-1) {
            this.neighbors.push(grid[i] [j+1]);
        }
        if(j > 0) {
            this.neighbors.push(grid[i] [-1]);
        }
    }
}

function setup() {
    createCanvas(400, 400);
    console.log('A*');

    w = width / cols;
    h = height / rows;

    //making a 2d array
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }

    start = grid[0][0];
    end = grid[cols - 1][rows - 1];

    openSet.push(start);

    console.log(grid);
}

function draw() {
    if(openSet.length > 0) {
        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {
            if(openSet[i].f < openSet[lowestIndex].f) {
                winner = i;
            }
        }
        var current = openSet[winner];
        if(current === end) {
            console.log("Done!");
        }
        removeFromArray(openSet, current);
        //openSet.remove(current);
        closedSet.push(current);
        //we can kee going
    }
    else {
        // no way to the traget
    }
    background(0);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0));
    }

    for (var i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0));
    }
}
