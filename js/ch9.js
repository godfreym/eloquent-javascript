var dependencies =
  {"ObjectTools.js": ["FunctionalTools.js"],
   "Dictionary.js":  ["ObjectTools.js"],
   "TestModule.js":  ["FunctionalTools.js", "Dictionary.js"]};
   
var loadedFiles = {};

function require(file) {
  if (dependencies[file]) {
    var files = dependencies[file];
    for (var i = 0; i < files.length; i++)
      require(files[i]);
  }
  if (!loadedFiles[file]) {
    loadedFiles[file] = true;
    load(file);
  }
}
require("TestModule.js");
test();

/* Module example */
function buildMonthNameModule() {
  var names = ["January", "February", "March", "April",
               "May", "June", "July", "August", "September",
               "October", "November", "December"];
  function getMonthName(number) {
    return names[number];
  }
  function getMonthNumber(name) {
    for (var number = 0; number < names.length; number++) {
      if (names[number] == name)
        return number;
    }
  }

  window.getMonthName = getMonthName;
  window.getMonthNumber = getMonthNumber;
}
buildMonthNameModule();

console.log(getMonthName(11));

/* modification.... */
function provide(values) {
  forEachIn(values, function(name, value) {
    window[name] = value;
  });
}

(function() {
  var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
               "Thursday", "Friday", "Saturday"];
  provide({
    getDayName: function(number) {
      return names[number];
    },
    getDayNumber: function(name) {
      for (var number = 0; number < names.length; number++) {
        if (names[number] == name)
          return number;
      }
    }
  });
})();

console.log(getDayNumber("Wednesday"));

/* another module */
var HTML = {
  tag: function(name, content, properties) {
    return {name: name, properties: properties, content: content};
  },
  link: function(target, text) {
    return HTML.tag("a", [text], {href: target});
  }
  /* ... many more HTML-producing functions ... */
};
provide(HTML);
console.log(link("http://download.oracle.com/docs/cd/E19957-01/816-6408-10/object.htm",
          "This is how objects work."));