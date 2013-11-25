function processThing(thing) {
  if (currentThing != null)
    throw "Oh no! We are already processing a thing!";

  currentThing = thing;
  try {
    /* do complicated processing... */
  }
  finally {
    currentThing = null;
  }
}

/* Another example */
function lastElement(array) {
  if (array.length > 0)
    return array[array.length - 1];
  else
    throw "Can not take the last element of an empty array.";
}

function lastElementPlusTen(array) {
  return lastElement(array) + 10;
}

try {
  print(lastElementPlusTen([]));
}
catch (error) {
  print("Something went wrong: ", error);
}