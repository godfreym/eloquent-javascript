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