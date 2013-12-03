function isTextNode(node) {
  return node.nodeType == 3;
}

console.log(isTextNode(document.body));
console.log(isTextNode(document.body.firstChild.firstChild));

/* isImage */
function isImage(node) {
  return !isTextNode(node) && node.nodeName == "IMG";
}

console.log(isImage(document.body.lastChild));