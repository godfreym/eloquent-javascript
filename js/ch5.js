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