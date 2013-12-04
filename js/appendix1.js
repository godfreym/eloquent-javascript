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

/* inner and outer loop */
outer: for (var sideA = 1; sideA < 10; sideA++) {
  inner: for (var sideB = 1; sideB < 10; sideB++) {
    var hypotenuse = Math.sqrt(sideA * sideA + sideB * sideB);
    if (hypotenuse % 1 == 0) {
      console.log("A right triangle with straight sides of length ",
            sideA, " and ", sideB, " has a hypotenuse of ",
            hypotenuse, ".");
      break outer;
    }
  }
}