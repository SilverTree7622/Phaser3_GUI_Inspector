
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
    getcssObj() {
        return {
            alpha: this.alpha,
            right: this.posXY.right,
            top: this.posXY.top
        };
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
    setFolderNameCenter() {
        let tmpFolderList = document.getElementsByClassName('title');
        console.log('tmpFolderList:', tmpFolderList);
        console.log('tmpFolderList.length:', tmpFolderList.length);
        for (var i=0; i<tmpFolderList.length; i++) {
            console.log(i, ':', tmpFolderList[i]);
            tmpFolderList[i].style.textAlign = 'center';
        }
    }
}