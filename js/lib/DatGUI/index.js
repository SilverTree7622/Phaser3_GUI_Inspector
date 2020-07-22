
import * as dat from './DatGUILib.js'; // import GUI lib
import GUIcss from './DatGUIcss.js'; // import GUI CSS

export default class GUIMain { // GUI property main class
    constructor(_cssObj) {
        this.lib = new dat.GUI();
        this.side = new dat.GUI();
        this.css = new GUIcss(_cssObj);
    }
    getLib() {
        return this.lib;
    }
    getSide() {
        return this.side;
    }
    getcss() {
        return this.css;
    }
    getcssObj() {
        return this.css.getcssObj();
    }
    destroy() {
        this.lib.destroy();
    }
    callbackCSSstringSkipped() {
        this.css.callbackCSSstringSkipped();
    }
}