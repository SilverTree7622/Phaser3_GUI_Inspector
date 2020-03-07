
// get and set Phaser.Scene.Anims list
export default class AnimListManager {
    constructor(_scene) {
        this.animList = undefined;
        this.isExist = this.initNChckAnimExist(_scene); // boolean
        this.list = this.initList(this.isExist); // object list
        this.keyList = this.initKeyList(); // pure list for dat.GUI
    }
    initNChckAnimExist(_scene) {
        this.animList = _scene.anims.anims;
        return (this.animList.size >= 1) ? true : false;
    }
    initList(_bool) {
        if (_bool) {
            let tmpLength = this.animList.size;
            for (var i=0; i<tmpLength; i++) {
                
            }
        }
    }
    initKeyList() {
        let tmpKL;
        try {
            tmpKL = this.animList.keys();
        } catch(e) {}
        return tmpKL;
    }

    // give key list object
    getKeyListObj() {
        return (this.keyList) ? this.keyList : undefined;
    }
}