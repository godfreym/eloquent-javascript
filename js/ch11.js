
var form = window.open("example_getinfo.html");
attach(form);

console.log(document.location.href);
console.log(document.title);

var userForm = document.forms.userinfo;
console.log(userForm.method);
console.log(userForm.action);

var nameField = userForm.elements.name;
nameField.value = "Eugène";
/* Ex. 11.1 */
function validInfo(form) {
  return form.elements.name.value != "" &&
    /^.+@.+\.\w{2,3}$/.test(form.elements.email.value);
}

console.log(validInfo(document.forms.userinfo));

