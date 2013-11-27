function speak(line) {
  console.log("The ", this.adjective, " rabbit says '", line, "'");
}
var whiteRabbit = {adjective: "white", speak: speak};
var fatRabbit = {adjective: "fat", speak: speak};

whiteRabbit.speak("Oh my ears and whiskers, how late it's getting!");
fatRabbit.speak("I could sure use a carrot right now.");
speak.apply(fatRabbit, ["Yum."]);
speak.call(fatRabbit, "Burp.");

/* Modification... */
function Rabbit(adjective) {
  this.adjective = adjective;
  this.speak = function(line) {
    console.log("The ", this.adjective, " rabbit says '", line, "'");
  };
}

var killerRabbit = new Rabbit("killer");
killerRabbit.speak("GRAAAAAAAAAH!");

/* properties */
Object.prototype.properties = function() {
  var result = [];
  for (var property in this) {
    if (this.hasOwnProperty(property))
      result.push(property);
  }
  return result;
};

var test = {"Fat Igor": true, "Fireball": true};
console.log(test.properties());

function forEachIn(object, action) {
  for (var property in object) {
    if (object.hasOwnProperty(property))
      action(property, object[property]);
  }
}

var chimera = {head: "lion", body: "goat", tail: "snake"};
forEachIn(chimera, function(name, value) {
  console.log("The ", name, " of a ", value, ".");
});

/* modification of properties */
function forEachIn(object, action) {
  for (var property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property))
      action(property, object[property]);
  }
}

var test = {name: "Mordecai", hasOwnProperty: "Uh-oh"};
forEachIn(test, function(name, value) {
  console.log("Property ", name, " = ", value);
});

/* Dictionary */
function Dictionary(startValues) {
  this.values = startValues || {};
}
Dictionary.prototype.store = function(name, value) {
  this.values[name] = value;
};
Dictionary.prototype.lookup = function(name) {
  return this.values[name];
};
Dictionary.prototype.contains = function(name) {
  return Object.prototype.hasOwnProperty.call(this.values, name) &&
    Object.prototype.propertyIsEnumerable.call(this.values, name);
};
Dictionary.prototype.each = function(action) {
  forEachIn(this.values, action);
};

var colours = new Dictionary({Grover: "blue",
                              Elmo: "orange",
                              Bert: "yellow"});
console.log(colours.contains("Grover"));
console.log(colours.contains("constructor"));
colours.each(function(name, colour) {
  console.log(name, " is ", colour);
});


/* The plan */
var thePlan =
  ["############################",
   "#      #    #      o      ##",
   "#                          #",
   "#          #####           #",
   "##         #   #    ##     #",
   "###           ##     #     #",
   "#           ###      #     #",
   "#   ####                   #",
   "#   ##       o             #",
   "# o  #         o       ### #",
   "#    #                     #",
   "############################"];
   
   
/* Ex. 8.1 */
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.add = function(other) {
  return new Point(this.x + other.x, this.y + other.y);
};
Point.prototype.isEqualTo = function(other) {
  return this.x == other.x && this.y == other.y;
};

console.log((new Point(3, 1)).add(new Point(2, 4)));

/* modification... */
function Grid(width, height) {
  this.width = width;
  this.height = height;
  this.cells = new Array(width * height);
}
Grid.prototype.valueAt = function(point) {
  return this.cells[point.y * this.width + point.x];
};
Grid.prototype.setValueAt = function(point, value) {
  this.cells[point.y * this.width + point.x] = value;
};
Grid.prototype.isInside = function(point) {
  return point.x >= 0 && point.y >= 0 &&
         point.x < this.width && point.y < this.height;
};
Grid.prototype.moveValue = function(from, to) {
  this.setValueAt(to, this.valueAt(from));
  this.setValueAt(from, undefined);
};

/* Ex. 8.2 */
Grid.prototype.each = function(action) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var point = new Point(x, y);
      action(point, this.valueAt(point));
    }
  }
};

var testGrid = new Grid(3, 2);
testGrid.setValueAt(new Point(1, 0), "#");
testGrid.setValueAt(new Point(1, 1), "o");
testGrid.each(function(point, value) {
  console.log(point.x, ",", point.y, ": ", value);
});

var directions = new Dictionary(
  {"n":  new Point( 0, -1),
   "ne": new Point( 1, -1),
   "e":  new Point( 1,  0),
   "se": new Point( 1,  1),
   "s":  new Point( 0,  1),
   "sw": new Point(-1,  1),
   "w":  new Point(-1,  0),
   "nw": new Point(-1, -1)});

console.log(new Point(4, 4).add(directions.lookup("se")));

function StupidBug() {};
StupidBug.prototype.act = function(surroundings) {
  return {type: "move", direction: "s"};
};

/* Starting a Terraium object */
var wall = {};

function Terrarium(plan) {
  var grid = new Grid(plan[0].length, plan.length);
  for (var y = 0; y < plan.length; y++) {
    var line = plan[y];
    for (var x = 0; x < line.length; x++) {
      grid.setValueAt(new Point(x, y),
                      elementFromCharacter(line.charAt(x)));
    }
  }
  this.grid = grid;
}

function elementFromCharacter(character) {
  if (character == " ")
    return undefined;
  else if (character == "#")
    return wall;
  else if (character == "o")
    return new StupidBug();
}

wall.character = "#";
StupidBug.prototype.character = "o";

function characterFromElement(element) {
  if (element == undefined)
    return " ";
  else
    return element.character;
}

console.log(characterFromElement(wall));

/* Ex. 8.3 */
Terrarium.prototype.toString = function() {
  var characters = [];
  var endOfLine = this.grid.width - 1;
  this.grid.each(function(point, value) {
    characters.push(characterFromElement(value));
    if (point.x == endOfLine)
      characters.push("\n");
  });
  return characters.join("");
};
var terrarium = new Terrarium(thePlan);
console.log(terrarium.toString());

function bind(func, object) {
  return function(){
    return func.apply(object, arguments);
  };
}

var testArray = [];
var pushTest = bind(testArray.push, testArray);
pushTest("A");
pushTest("B");
console.log(testArray);

/* Ex. 8.4 */
function method(object, name) {
  return function() {
    return object[name].apply(object, arguments);
  };
}

var pushTest = method(testArray, "push");

Terrarium.prototype.listActingCreatures = function() {
  var found = [];
  this.grid.each(function(point, value) {
    if (value != undefined && value.act)
      found.push({object: value, point: point});
  });
  return found;
};

/* Ex 8.5 */
Terrarium.prototype.listSurroundings = function(center) {
  var result = {};
  var grid = this.grid;
  directions.each(function(name, direction) {
    var place = center.add(direction);
    if (grid.isInside(place))
      result[name] = characterFromElement(grid.valueAt(place));
    else
      result[name] = "#";
  });
  return result;
};

Terrarium.prototype.processCreature = function(creature) {
  var surroundings = this.listSurroundings(creature.point);
  var action = creature.object.act(surroundings);
  if (action.type == "move" && directions.contains(action.direction)) {
    var to = creature.point.add(directions.lookup(action.direction));
    if (this.grid.isInside(to) && this.grid.valueAt(to) == undefined)
      this.grid.moveValue(creature.point, to);
  }
  else {
    throw new Error("Unsupported action: " + action.type);
  }
};

Terrarium.prototype.step = function() {
  forEach(this.listActingCreatures(),
          bind(this.processCreature, this));
};
var terrarium = new Terrarium(thePlan);
console.log(terrarium);
terrarium.step();
console.log(terrarium);

Point.prototype.toString = function() {
  return "(" + this.x + "," + this.y + ")";
};
console.log(new Point(5, 5));

var annoy = setInterval(function() {console.log("What?");}, 400);
clearInterval(annoy);
/* modification.. */
Terrarium.prototype.start = function() {
  if (!this.running)
    this.running = setInterval(bind(this.step, this), 500);
};

Terrarium.prototype.stop = function() {
  if (this.running) {
    clearInterval(this.running);
    this.running = null;
  }
};
