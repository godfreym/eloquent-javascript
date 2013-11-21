((4>=6) || ("grass" != "green")) &&
!((12*2)==144 && true);

/* Ex 2.2 */
var result = 1;
var counter = 0;
while (counter < 10) {
  result = result * 2;
  counter = counter + 1;
}

/* Ex 2.3 */
var line = "";
var counter = 0;
while (counter < 10) {
  line = line + "#";
  document.write(line);
  counter = counter + 1;
}

/* Ex 2.4 */
var forLoopResult = 1;
for (var counter = 0; counter < 10; counter = counter + 1)
  forLoopResult = forLoopResult * 2;
  
var line = "";
for (var counter = 0; counter < 10; counter = counter + 1) {
  line = line + "#";
  document.write(line);
}

/* Ex 2.5 */
var answer = prompt("Godfrey! What is the value of 2 + 2?", "");
if (answer == "4")
  alert("You must be a genius or something.");
else if (answer == "3" || answer == "5")
  alert("Almost!");
else
  alert("You're an embarrassment.");