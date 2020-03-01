
export default class GUIcss {
    constructor(_cssObj) {
        this.name = 'dg ac'; // dat gui class name
        this.class = this.initClass();
        this.alpha = this.initAlpha(_cssObj);
        this.initOpacity();
    }
    initClass() {
        return document.getElementsByClassName(this.name);
    }
    initAlpha(_cssObj) {
        let tmpDefaultValue = 0.8;
        let tmpValue = (_cssObj.alpha) ? _cssObj.alpha : tmpDefaultValue;
        return tmpValue;
    }
    initOpacity() {
        return this.class[0].style.opacity = this.alpha;
    }
    setOpacityInGUI() {
        this.class[0].style.opacity = this.alpha;
    }
}