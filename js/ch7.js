
var roads = {};
function makeRoad(from, to, length) {
  function addRoad(from, to) {
    if (!(from in roads))
      roads[from] = [];
    roads[from].push({to: to, distance: length});
  }
  addRoad(from, to);
  addRoad(to, from);
}

/* Ex.7.1 */
function makeRoads(start) {
  for (var i = 1; i < arguments.length; i += 2)
    makeRoad(start, arguments[i], arguments[i + 1]);
}

var roads = {};
makeRoads("Point Kiukiu", "Hanaiapa", 19,
          "Mt Feani", 15, "Taaoa", 15);
makeRoads("Airport", "Hanaiapa", 6, "Mt Feani", 5,
          "Atuona", 4, "Mt Ootua", 11);
makeRoads("Mt Temetiu", "Mt Feani", 8, "Taaoa", 4);
makeRoads("Atuona", "Taaoa", 3, "Hanakee pearl lodge", 1);
makeRoads("Cemetery", "Hanakee pearl lodge", 6, "Mt Ootua", 5);
makeRoads("Hanapaoa", "Mt Ootua", 3);
makeRoads("Puamua", "Mt Ootua", 13, "Point Teohotepapapa", 14);

console.log(roads["Airport"]);

/* Roads from calling */
function roadsFrom(place) {
  var found = roads[place];
  if (found == undefined)
    throw new Error("No place named '" + place + "' found.");
  else
    return found;
}

console.log(roadsFrom("Puamua"));

/* Function gamblerPath */
function gamblerPath(from, to) {
  function randomInteger(below) {
    return Math.floor(Math.random() * below);
  }
  function randomDirection(from) {
    var options = roadsFrom(from);
    return options[randomInteger(options.length)].to;
  }

  var path = [];
  while (true) {
    path.push(from);
    if (from == to)
      break;
    from = randomDirection(from);
  }
  return path;
}

console.log(gamblerPath("Hanaiapa", "Mt Feani"));

/* Requirement for ex 7.2 */
function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}

function member(array, value) {
  var found = false;
  forEach(array, function(element) {
    if (element === value)
      found = true;
  });
  return found;
}
console.log(member([6, 7, "Bordeaux"], 7));

var Break = {toString: function() {return "Break";}};

function forEach(array, action) {
  try {
    for (var i = 0; i < array.length; i++)
      action(array[i]);
  }
  catch (exception) {
    if (exception != Break)
      throw exception;
  }
}

function any(test, array) {
  for (var i = 0; i < array.length; i++) {
    var found = test(array[i]);
    if (found)
      return found;
  }
  return false;
}

function partial(func) {
  var fixedArgs = asArray(arguments, 1);
  return function(){
    return func.apply(null, fixedArgs.concat(asArray(arguments)));
  };
}

function member(array, value) {
  return any(partial(op["==="], value), array);
}

console.log(member(["Fear", "Loathing"], "Denial"));

function every(test, array) {
  for (var i = 0; i < array.length; i++) {
    var found = test(array[i]);
    if (!found)
      return found;
  }
  return true;
}

show(every(partial(op["!="], 0), [1, 2, -1]));

function flatten(arrays) {
    var result = [];
    forEach(arrays, function (array) {
      forEach(array, function (element){result.push(element);});
    });
    return result;
  }
  
  
/* Ex. 7.2 */
function filter(test, array) {
  var result = [];
  forEach(array, function (element) {
    if (test(element))
      result.push(element);
  });
  return result;
}

console.log(filter(partial(op[">"], 5), [0, 4, 8, 12]));

/* Modification of Ex. 7.2 */
function possibleRoutes(from, to) {
  function findRoutes(route) {
    function notVisited(road) {
      return !member(route.places, road.to);
    }
    function continueRoute(road) {
      return findRoutes({places: route.places.concat([road.to]),
                         length: route.length + road.distance});
    }

    var end = route.places[route.places.length - 1];
    if (end == to)
      return [route];
    else
      return flatten(map(continueRoute, filter(notVisited,
                                               roadsFrom(end))));
  }
  return findRoutes({places: [from], length: 0});
}
console.log(possibleRoutes("Point Teohotepapapa", "Point Kiukiu").length);
console.log(possibleRoutes("Hanapaoa", "Mt Ootua"));

/* Ex. 7.3 */
function shortestRoute(from, to) {
  var currentShortest = null;
  forEach(possibleRoutes(from, to), function(route) {
    if (!currentShortest || currentShortest.length > route.length)
      currentShortest = route;
  });
  return currentShortest;
}

function minimise(func, array) {
  var minScore = null;
  var found = null;
  forEach(array, function(element) {
    var score = func(element);
    if (minScore == null || score < minScore) {
      minScore = score;
      found = element;
    }
  });
  return found;
}

function getProperty(propName) {
  return function(object) {
    return object[propName];
  };
}

function shortestRoute(from, to) {
  return minimise(getProperty("length"), possibleRoutes(from, to));
}

/* Requirements for Ex. 7.4 */
console.log(heightAt({x: 0, y: 0}));
console.log(heightAt({x: 11, y: 18}));
function weightedDistance(pointA, pointB) {
  var heightDifference = heightAt(pointB) - heightAt(pointA);
  var climbFactor = (heightDifference < 0 ? 1 : 2);
  var flatDistance = (pointA.x == pointB.x || pointA.y == pointB.y ? 100 : 141);
  return flatDistance + climbFactor * Math.abs(heightDifference);
}

function point(x, y) {
  return {x: x, y: y};
}

function addPoints(a, b) {
  return point(a.x + b.x, a.y + b.y);
}

function samePoint(a, b) {
  return a.x == b.x && a.y == b.y;
}

console.log(samePoint(addPoints(point(10, 10), point(4, -2)),
               point(14, 8)));
			   
/* Ex. 7.4 */
function possibleDirections(from) {
  var mapSize = 20;
  function insideMap(point) {
    return point.x >= 0 && point.x < mapSize &&
           point.y >= 0 && point.y < mapSize;
  }

  var directions = [point(-1, 0), point(1, 0), point(0, -1),
                    point(0, 1), point(-1, -1), point(-1, 1),
                    point(1, 1), point(1, -1)];
  return filter(insideMap, map(partial(addPoints, from),
                               directions));
}
console.log(possibleDirections(point(0, 0)));

/* Ex. 7.5 */
function estimatedDistance(pointA, pointB) {
  var dx = Math.abs(pointA.x - pointB.x),
      dy = Math.abs(pointA.y - pointB.y);
  if (dx > dy)
    return (dx - dy) * 100 + dy * 141;
  else
    return (dy - dx) * 100 + dx * 141;
}

/* Ex 7.6 */
function makeReachedList() {
  return {};
}

function storeReached(list, point, route) {
  var inner = list[point.x];
  if (inner == undefined) {
    inner = {};
    list[point.x] = inner;
  }
  inner[point.y] = route;
}

function findReached(list, point) {
  var inner = list[point.x];
  if (inner == undefined)
    return undefined;
  else
    return inner[point.y];
}

/* Alternatively to above three functions */
function pointID(point) {
  return point.x + "-" + point.y;
}

function makeReachedList() {
  return {};
}

function storeReached(list, point, route) {
  list[pointID(point)] = route;
}

function findReached(list, point) {
  return list[pointID(point)];
}


/* Actual Path-finding function */
function findRoute(from, to) {
  var open = new BinaryHeap(routeScore);
  var reached = makeReachedList();

  function routeScore(route) {
    if (route.score == undefined)
      route.score = estimatedDistance(route.point, to) +
                    route.length;
    return route.score;
  }
  function addOpenRoute(route) {
    open.push(route);
    storeReached(reached, route.point, route);
  }
  addOpenRoute({point: from, length: 0});

  while (open.size() > 0) {
    var route = open.pop();
    if (samePoint(route.point, to))
      return route;
    
    forEach(possibleDirections(route.point), function(direction) {
      var known = findReached(reached, direction);
      var newLength = route.length +
                      weightedDistance(route.point, direction);
      if (!known || known.length > newLength){
        if (known)
          open.remove(known);        
        addOpenRoute({point: direction,
                      from: route,
                      length: newLength});
      }
    });
  }
  return null;
}
/* Well, let us try our path-finder*/
var route = findRoute(point(0, 0), point(19, 19));
showRoute(route);
showRoute(findRoute(point(0, 0), point(11, 17)),
          findRoute(point(11, 17), point(19, 19)));