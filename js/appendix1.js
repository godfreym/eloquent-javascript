do {
  var answer = prompt("Say 'moo'.", "");
  console.log("You said '", answer, "'.");
} while (answer != "moo");

/* other loops */
for (var i = 0; i < 10; i++) {
  if (i % 3 != 0)
    continue;
  console.log(i, " is divisible by three.");
}