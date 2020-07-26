
import * as dat from './DatGUILib.js'; // import GUI lib
import GUIcss from './DatGUIcss.js'; // import GUI CSS

export default class GUIMain { // GUI property main class
    constructor(_tmpHandOverObj) {
        this.lib = new dat.GUI();
        this.side = this.chckSideOption(_tmpHandOverObj);
        this.css = new GUIcss(_tmpHandOverObj.css);
    }
    chckSideOption(_tmpHandOverObj) {
        return (_tmpHandOverObj.init.side) ? new dat.GUI() : undefined;
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