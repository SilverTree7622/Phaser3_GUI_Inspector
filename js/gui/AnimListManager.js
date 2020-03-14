
// get and set Phaser.Scene.Anims list
export default class AnimListManager {
    constructor(_scene) {
        this.animList = this.initAnimList(_scene); // boolean
        this.list = this.initList(this.animList); // object list
        this.keyList = this.initKeyList(this.list); // pure list for dat.GUI
    }
    initAnimList(_scene) {
        let tmpAL = undefined;
        tmpAL= _scene.anims.anims;
        return tmpAL;
    }
    initList(_animList) {
        if (_animList) {
            let tmpList = [];
            console.log('_animList:', _animList);
            for (var tmpProperty in _animList.entries) {
                tmpList.push(tmpProperty);
            }
            return tmpList;
        } else {}
    }
    initKeyList(_list) {
        if (_list) {
            let tmpKL = [];
            for (var i=0; i<_list.length; i++) {
                tmpKL.push(_list[0].key);
            }
            return tmpKL;
        } else {}
    }

    // EXTERNAL: give key list object
    getList() {
        return this.list;
    }
    getKeyList() {
        console.log('this scope in getKeyList:', this);
        console.log('this.keyList:', this.keyList);
        return this.keyList;
    }
}