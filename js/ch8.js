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

/* Prototype */
function Rabbit(adjective) {
  this.adjective = adjective;
}
Rabbit.prototype.speak = function(line) {
  console.log("The ", this.adjective, " rabbit says '", line, "'");
};

var hazelRabbit = new Rabbit("hazel");
hazelRabbit.speak("Good Frith!");