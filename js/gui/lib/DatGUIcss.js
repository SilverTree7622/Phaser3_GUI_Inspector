
export default class GUIcss {
    constructor(_cssObj) {
        this.name = 'dg ac'; // dat gui class name
        this.class = document.getElementsByClassName(this.name);
        this.alpha = this.initSetOpacity(_cssObj);
        this.initOpacity();
    }
    initSetOpacity(_cssObj) {
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