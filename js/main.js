
// Publish method 1
window.GUIClass = require('./gui/GUIClass.js').GUIClass;

// Publish method 2
// import * as GUIClass from require('./gui/GUIClass.js');

// Publish method 3
// require('./gui/GUIClass.js');

// window.GUIClass = GUIClass;

// check is really exist
console.log('window:', window);
console.log('GUIClass in window:', window.GUIClass);