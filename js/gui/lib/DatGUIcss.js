
export default class GUIcss {
    constructor(_cssObj) {
        this.name = 'dg ac'; // dat gui class name
        this.class = this.initClass();
        this.alpha = this.initSetAlpha(_cssObj);
        this.initAlpha();
    }
    initClass() {
        return document.getElementsByClassName(this.name);
    }
    initSetAlpha(_cssObj) {
        let tmpDefaultValue = 0.8;
        let tmpValue = (_cssObj.alpha) ? _cssObj.alpha : tmpDefaultValue;
        return tmpValue;
    }
    initAlpha() {
        return this.class[0].style.opacity = this.alpha;
    }
    setAlphaInGUI() {
        this.class[0].style.opacity = this.alpha;
    }
}