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