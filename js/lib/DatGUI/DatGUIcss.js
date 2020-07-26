
export default class GUIcss {
    constructor(_cssObj) {
        this.name = 'dg ac'; // dat gui class name
        this.class = this.initClass();
        this.gui = this.initGui();
        this.alpha = _cssObj.alpha;
        this.posXY = { right: _cssObj.right, top: _cssObj.top };
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
    callbackCSSstringSkipped() {
        let tmpList = document.getElementsByClassName('property-name');
        for (let tmpCompo of tmpList) {
            tmpCompo.style.overflow = 'inherit';
        }
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
        for (var i=0; i<tmpFolderList.length; i++) {
            // console.log(i, ':', tmpFolderList[i]);
            tmpFolderList[i].style.textAlign = 'center';
        }
    }
}