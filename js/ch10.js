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

/* Ex. 10.3 */
function extractDate(string) {
  var found = string.match(/(\d\d?)\/(\d\d?)\/(\d{4})/);
  if (found == null)
    throw new Error("No date found in '" + string + "'.");
  return new Date(Number(found[3]), Number(found[2]) - 1,
                  Number(found[1]));
}

console.log(extractDate("born 5/2/2007 (mother Noog): Long-ear Johnson"));