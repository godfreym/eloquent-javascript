
var form = window.open("example_getinfo.html");

/* Ex. 11.1 */
function validInfo(form) {
  return form.elements.name.value != "" &&
    /^.+@.+\.\w{2,3}$/.test(form.elements.email.value);
}

console.log(validInfo(document.forms.userinfo));

