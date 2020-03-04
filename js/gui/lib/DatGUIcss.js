
export default class GUIcss {
    constructor(_cssObj) {
        this.name = 'dg ac'; // dat gui class name
        this.class = this.initClass();
        this.alpha = this.initSetAlpha(_cssObj);
        this.posXY = this.initSetPosXY(_cssObj);
        this.color = this.initSetColor(_cssObj);
        this.initAlpha();
        this.initPosXY();
        this.initColor();
    }
    initClass() {
        return document.getElementsByClassName(this.name);
    }
    initSetAlpha(_cssObj) {
        let tmpDefaultValue = 0.8;
        let tmpValue = (_cssObj.alpha) ? _cssObj.alpha : tmpDefaultValue;
        return tmpValue;
    }
    initSetPosXY(_cssObj) {
        let tmpDefaultValue = {
            right: 0, top: 0
        };
        let tmpValue = (_cssObj.posXY) ? _cssObj.posXY : tmpDefaultValue;
        return tmpValue;
    }
    initSetColor(_cssObj) {
        let tmpDefaultValue = [255, 255, 255];
        let tmpValue = (_cssObj.color) ? _cssObj.color : tmpDefaultValue;
        return tmpValue;
    }
    initAlpha() {
        return this.class[0].style.opacity = this.alpha;
    }
    initPosXY() {
        
        return this.class[0].style.
    }
    initColor() {
        console.log('this.class:', this.class);
        console.log('this.class[0].style:', this.class[0].style);
        return this.class[0].style.backgroundColor = this.color;
    }
    // EXTERNAL
    setAlphaInGUI() {
        this.class[0].style.opacity = this.alpha;
    }
    setColorInGUI() {
        this.class[0].style.opacity = this.alpha;
    }
}