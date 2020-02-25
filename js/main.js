
require('./gui/lib/DatGUILib.js');
require('./gui/GUIClass.js');
// require('./gui/GUIClass.js');
// import * as dat from require('./gui/lib/DatGUILib.js');
// import * as GUIClass from require('./gui/GUIClass.js');

// Publish method
window.PHASER3_DATGUI_INSPECTOR = window.PHASER3_DATGUI_INSPECTOR || {};
window.PHASER3_DATGUI_INSPECTOR = GUIClass;
console.log('check window pdi object is fine:', window.PHASER3_DATGUI_INSPECTOR);
