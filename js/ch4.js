/* Ex 4.1 */
var set = {"Spot": true};
// Add "White Fang" to the set
set["White Fang"] = true;
// Remove "Spot"
delete set["Spot"];
// See if "Asoka" is in the set
console.log("Asoka" in set);

/* Ex 4.2 */
function range(upto) {
  var result = [];
  for (var i = 0; i <= upto; i++)
    result[i] = i;
  return result;
}

/* Ex 4.4 */
function startsWith(string, pattern) {
  return string.slice(0, pattern.length) == pattern;
}

/* Ex 4.5 */
function catNames(paragraph) {
  var colon = paragraph.indexOf(":");
  return paragraph.slice(colon + 2).split(", ");
}

/* Ex 4.6 */
function extractDate(paragraph) {
  function numberAt(start, length) {
    return Number(paragraph.slice(start, start + length));
  }
  return new Date(numberAt(11, 4), numberAt(8, 2) - 1,
                  numberAt(5, 2));
}

/* Ex 4.7 */
function between(string, start, end) {
  var startAt = string.indexOf(start) + start.length;
  var endAt = string.indexOf(end, startAt);
  return string.slice(startAt, endAt);
}

/* cat-algorithm */
function findCats() {
  var mailArchive = retrieveMails();
  var cats = {"Spot": catRecord("Spot", new Date(1997, 2, 5),
              "unknown")};

  function handleParagraph(paragraph) {
    if (startsWith(paragraph, "born"))
      addCats(cats, catNames(paragraph), extractDate(paragraph),
              extractMother(paragraph));
    else if (startsWith(paragraph, "died"))
      deadCats(cats, catNames(paragraph), extractDate(paragraph));
  }

  for (var mail = 0; mail < mailArchive.length; mail++) {
    var paragraphs = mailArchive[mail].split("\n");
    for (var i = 0; i < paragraphs.length; i++)
      handleParagraph(paragraphs[i]);
  }
  return cats;
}
console.log(findCats());