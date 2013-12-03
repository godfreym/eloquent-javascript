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

/* Ex. 12.1 */
function asHTML(node) {
  if (isTextNode(node))
    return escapeHTML(node.nodeValue);
  else if (node.childNodes.length == 0)
    return "<" + node.nodeName + "/>";
  else
    return "<" + node.nodeName + ">" +
           map(asHTML, node.childNodes).join("") +
           "</" + node.nodeName + ">";
}

console.log(asHTML(document.body));