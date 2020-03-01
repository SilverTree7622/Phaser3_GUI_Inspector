
import * as dat from './DatGUILib.js'; // import GUI lib
import GUIcss from './DatGUIcss'; // import GUI CSS

export default class GUIMain {
    constructor(_cssObj) {
        this.lib = new dat.GUI();
        this.css = new GUIcss(_cssObj);
    }
    getLib() {
        return this.lib;
    }
    getcss() {
        return this.css;
    }
}