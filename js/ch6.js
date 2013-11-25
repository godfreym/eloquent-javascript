/* Ex. 6.1 */
function countZeroes(array) {
  function counter(total, element) {
    return total + (element === 0 ? 1 : 0);
  }
  return reduce(counter, 0, array);
}

/* Ex. 6.1 modification*/
function count(test, array) {
  return reduce(function(total, element) {
    return total + (test(element) ? 1 : 0);
  }, 0, array);
}

function equals(x) {
  return function(element) {return x === element;};
}

function countZeroes(array) {
  return count(equals(0), array);
}

/* Ex. 6.2 */
function processParagraph(paragraph) {
  var header = 0;
  while (paragraph.charAt(0) == "%") {
    paragraph = paragraph.slice(1);
    header++;
  }

  return {type: (header == 0 ? "p" : "h" + header),
          content: paragraph};
}

/* Ex. 6.3 */
function splitParagraph(text) {
  function indexOrEnd(character) {
    var index = text.indexOf(character);
    return index == -1 ? text.length : index;
  }

  function takeNormal() {
    var end = reduce(Math.min, text.length,
                     map(indexOrEnd, ["*", "{"]));
    var part = text.slice(0, end);
    text = text.slice(end);
    return part;
  }

  function takeUpTo(character) {
    var end = text.indexOf(character, 1);
    if (end == -1)
      throw new Error("Missing closing '" + character + "'");
    var part = text.slice(1, end);
    text = text.slice(end + 1);
    return part;
  }

  var fragments = [];

  while (text != "") {
    if (text.charAt(0) == "*")
      fragments.push({type: "emphasised",
                      content: takeUpTo("*")});
    else if (text.charAt(0) == "{")
      fragments.push({type: "footnote",
                      content: takeUpTo("}")});
    else
      fragments.push({type: "normal",
                      content: takeNormal()});
  }
  return fragments;
}

function processParagraph(paragraph) {
  var header = 0;
  while (paragraph.charAt(0) == "%") {
    paragraph = paragraph.slice(1);
    header++;
  }

  return {type: (header == 0 ? "p" : "h" + header),
          content: splitParagraph(paragraph)};
}
function extractFootnotes(paragraphs) {
  var footnotes = [];
  var currentNote = 0;

  function replaceFootnote(fragment) {
    if (fragment.type == "footnote") {
      currentNote++;
      footnotes.push(fragment);
      fragment.number = currentNote;
      return {type: "reference", number: currentNote};
    }
    else {
      return fragment;
    }
  }

  forEach(paragraphs, function(paragraph) {
    paragraph.content = map(replaceFootnote,
                            paragraph.content);
  });

  return footnotes;
}   

/* Ex. 6.4 */
function tag(name, content, attributes) {
  return {name: name, attributes: attributes, content: content};
}
function link(target, text) {
  return tag("a", [text], {href: target});
}

function htmlDoc(title, bodyContent) {
  return tag("html", [tag("head", [tag("title", [title])]),
                      tag("body", bodyContent)]);
}
function image(src) {
  return tag("img", [], {src: src});
}

/* function to escape HTML*/
function escapeHTML(text) {
  var replacements = [[/&/g, "&amp;"], [/"/g, "&quot;"],
                      [/</g, "&lt;"], [/>/g, "&gt;"]];
  forEach(replacements, function(replace) {
    text = text.replace(replace[0], replace[1]);
  });
  return text;
}