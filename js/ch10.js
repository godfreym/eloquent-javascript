var asteriskOrBrace = /[\{\*]/;
var story =
  "We noticed the *giant sloth*, hanging from a giant branch.";
console.log(story.search(asteriskOrBrace));

/* Ex. 10.1 */
var datePattern = /\d\d\/\d\d\/\d\d\d\d/;
console.log("born 15/11/2003 (mother Spot): White Fang".search(datePattern));

/* Ex. 10.2 */
var mailAddress = /\b[\w\.-]+@[\w\.-]+\.\w{2,3}\b/;

console.log(mailAddress.test("kenny@test.net"));
console.log(mailAddress.test("I mailt kenny@tets.nets, but it didn wrok!"));
console.log(mailAddress.test("the_giant_sloth@gmail.com"));