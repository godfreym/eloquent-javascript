function registerEventHandler(node, event, handler) {
  if (typeof node.addEventListener == "function")
    node.addEventListener(event, handler, false);
  else
    node.attachEvent("on" + event, handler);
}

registerEventHandler($("button"), "click",
                     function(){console.log("Click (2)");});
					 
/* unregistering an event */					 
function unregisterEventHandler(node, event, handler) {
  if (typeof node.removeEventListener == "function")
    node.removeEventListener(event, handler, false);
  else
    node.detachEvent("on" + event, handler);
}

/* show an event */
function showEvent(event) {
  show(event || window.event);
}

registerEventHandler($("textfield"), "keypress", showEvent);

/* Report a click */
function reportClick(event) {
  event = event || window.event;
  var target = event.target || event.srcElement;
  var pageX = event.pageX, pageY = event.pageY;
  if (pageX == undefined) {
    pageX = event.clientX + document.body.scrollLeft;
    pageY = event.clientY + document.body.scrollTop;
  }

  print("Mouse clicked at ", pageX, ", ", pageY,
        ". Inside element:");
  show(target);
}
registerEventHandler(document, "click", reportClick);
unregisterEventHandler(document, "click", reportClick);

/* Event normaliser */
function normaliseEvent(event) {
  if (!event.stopPropagation) {
    event.stopPropagation = function() {this.cancelBubble = true;};
    event.preventDefault = function() {this.returnValue = false;};
  }
  if (!event.stop) {
    event.stop = function() {
      this.stopPropagation();
      this.preventDefault();
    };
  }

  if (event.srcElement && !event.target)
    event.target = event.srcElement;
  if ((event.toElement || event.fromElement) && !event.relatedTarget)
    event.relatedTarget = event.toElement || event.fromElement;
  if (event.clientX != undefined && event.pageX == undefined) {
    event.pageX = event.clientX + document.body.scrollLeft;
    event.pageY = event.clientY + document.body.scrollTop;
  }
  if (event.type == "keypress") {
    if (event.charCode === 0 || event.charCode == undefined)
      event.character = String.fromCharCode(event.keyCode);
    else
      event.character = String.fromCharCode(event.charCode);
  }

  return event;
}

/* Handler adder */
function addHandler(node, type, handler) {
  function wrapHandler(event) {
    handler(normaliseEvent(event || window.event));
  }
  registerEventHandler(node, type, wrapHandler);
  return {node: node, type: type, handler: wrapHandler};
}

function removeHandler(object) {
  unregisterEventHandler(object.node, object.type, object.handler);
}

var blockQ = addHandler($("textfield"), "keypress", function(event) {
  if (event.character.toLowerCase() == "q")
    event.stop();
});


/* declaring a square */
var Square = {
  construct: function(character, tableCell) {
    this.background = "empty";
    if (character == "#")
      this.background = "wall";
    else if (character == "*")
      this.background = "exit";

    this.tableCell = tableCell;
    this.tableCell.className = this.background;

    this.content = null;
    if (character == "0")
      this.content = "boulder";
    else if (character == "@")
      this.content = "player";

    if (this.content != null) {
      var image = dom("IMG", {src: "img/sokoban/" +
                                   this.content + ".gif"});
      this.tableCell.appendChild(image);
    }
  },

  hasPlayer: function() {
    return this.content == "player";
  },
  hasBoulder: function() {
    return this.content == "boulder";
  },
  isEmpty: function() {
    return this.content == null && this.background == "empty";
  },
  isExit: function() {
    return this.background == "exit";
  }
};

var testSquare = Square.create("@", dom("TD"));
console.log(testSquare.hasPlayer());

/* Ex. 13.2 */
Square.moveContent = function(target) {
  target.content = this.content;
  this.content = null;
  target.tableCell.appendChild(this.tableCell.lastChild);
};
Square.clearContent = function() {
  this.content = null;
  removeElement(this.tableCell.lastChild);
};


/* Ex. 13.3 */
SokobanField.move = function(direction) {
  var playerSquare = this.getSquare(this.playerPos);
  var targetPos = this.playerPos.add(direction);
  var targetSquare = this.getSquare(targetPos);

  // Possibly pushing a boulder
  if (targetSquare.hasBoulder()) {
    var pushTarget = this.getSquare(targetPos.add(direction));
    if (pushTarget.isEmpty()) {
      targetSquare.moveContent(pushTarget);
    }
    else if (pushTarget.isExit()) {
      targetSquare.moveContent(pushTarget);
      pushTarget.clearContent();
      this.bouldersToGo--;
      this.updateScore();
    }
  }
  // Moving the player
  if (targetSquare.isEmpty()) {
    playerSquare.moveContent(targetSquare);
    this.playerPos = targetPos;
  }
};

testField.move(new Point(-1, 0));
testField.move(new Point(-1, 0));
testField.remove();