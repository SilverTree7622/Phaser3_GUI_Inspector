
export default class GUIcss {
    constructor(_cssObj) {
        this.name = 'dg ac'; // dat gui class name
        this.class = this.initClass();
        this.gui = this.initGui();
        this.alpha = this.initSetAlpha(_cssObj);
        this.posXY = this.initSetPosXY(_cssObj);
        // delay GUI color all structure
        // this.color = this.initSetColor(_cssObj);
        this.initAlpha();
        this.initPosXY();
        // this.initColor();
    }
    initClass() {
        return document.getElementsByClassName(this.name);
    }
    initGui() {
        return this.class[0];
    }
    initSetAlpha(_cssObj) {
        let tmpDefaultValue = 0.8;
        let tmpValue = (_cssObj.alpha) ? _cssObj.alpha : tmpDefaultValue;
        return tmpValue;
    }
    // initSetColor(_cssObj) {
    //     let tmpDefaultValue = [255, 255, 255];
    //     let tmpValue = (_cssObj.color) ? _cssObj.color : tmpDefaultValue;
    //     return tmpValue;
    // }
    initSetPosXY(_cssObj) {
        let tmpDefaultRight = 0;
        let tmpDefaultTop = 0;
        let tmpRight = (_cssObj.right) ? _cssObj.right : tmpDefaultRight;
        let tmpTop = (_cssObj.top) ? _cssObj.top : tmpDefaultTop;
        let tmpReturnObj = {
            right: tmpRight, top: tmpTop
        };
        return tmpReturnObj;
    }
    initAlpha() {
        return this.gui.style.opacity = this.alpha;
    }
    // initColor() {
    //     return this.gui.style.backgroundColor = this.color;
    // }
    initPosXY() {
        this.gui.style.right = this.posXY.right + "px";
        this.gui.style.top = this.posXY.top + "px";
    }

    // EXTERNAL
    getAlpha() {
        return this.alpha;
    }
    setAlphaInGUI() {
        this.gui.style.opacity = this.alpha;
    }
    // setColorInGUI() {
    //     this.gui.style.backgroundColor = this.color;
    // }
    setPosXYInGUI() {
        this.gui.style.right = this.posXY.right + "px";
        this.gui.style.top = this.posXY.top + "px";
    }
    // addFolderInBasic(_basic) { // add in basic folder with events
    //     // gui alpha
    //     _basic.add(this, 'alpha').min(0.1).max(1.0).step(0.02)
    //     .onChange( this.setAlphaInGUI.bind(this) );
    //     // // gui color
    //     // _basic.addColor(this, 'color')
    //     // .onChange( this.setColorInGUI.bind(this) );
    //     // gui posXY (right, top)
    //     _basic.add(this.posXY, 'right').step(1)
    //     .onChange( this.setPosXYInGUI.bind(this) );
    //     _basic.add(this.posXY, 'top').step(1)
    //     .onChange( this.setPosXYInGUI.bind(this) );
    // }
}