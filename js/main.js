
// Publish method 1
window.GUIClass = require('./gui/GUIClass.js').GUIClass;


console.log('require:', require('./gui/GUIClass.js'));
console.log('window in lib:', window);
console.log('GUIClass in window:', window.GUIClass);
// Publish method 2
// import * as GUIClass from require('./gui/GUIClass.js');

// Publish method 3
// require('./gui/GUIClass.js');

// window.GUIClass = GUIClass;

// check is really exist