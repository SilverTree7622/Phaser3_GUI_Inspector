
// get and set Phaser.Scene.Anims list
export default class SrcManager {
    constructor(_scene) {
        this.textureList = this.initTextureList(_scene);
        this.textureKeyList = this.initTextureKeyList(this.textureList);
        this.animList = this.initAnimList(_scene);
        this.animKeyList = this.initAnimKeyList(this.animList);
    }
    initTextureList(_scene) {
        let tmpTL = _scene.textures.list;
        return tmpTL;
    }
    initTextureKeyList(_textureList) {
        if (_textureList) {
            let tmpTKL = [];
            let tmpPropertyList = [];
            for (var tmpProperty in _textureList) {
                let tmpTextureFrames = _textureList[tmpProperty].frames;
                let tmpFramesList = [];
                for (var tmpProperty2 in tmpTextureFrames) {
                    tmpFramesList.push(tmpProperty2);
                }
                tmpTKL.push({
                    tKey: tmpProperty,
                    fKeyList: tmpFramesList
                });
                tmpPropertyList.push(tmpProperty);
            }
            tmpTKL.unshift({tKey: tmpPropertyList, fKeyList: undefined});
            return tmpTKL;
        }
    }
    initAnimList(_scene) {
        let tmpAL = _scene.anims.anims;
        return tmpAL;
    }
    initAnimKeyList(_animList) {
        if (_animList) {
            let tmpAKL = [];
            for (var tmpProperty in _animList.entries) {
                tmpAKL.push(tmpProperty);
            }
            return tmpAKL;
        }
    }

    // EXTERNAL: give key list object
    getTextureKeyList() {
        return this.textureKeyList[0].tKey;
    }
    getAnimKeyList() {
        return this.animKeyList;
    }
    getGameObjTextureKey(_gameObj) {
        return _gameObj.texture.key;
    }
    getGameObjFrameName(_gameObj) {
        return _gameObj.texture.frames;
    }
    getGameObjTextureFrames(_gameObj) {
        let tmpFrames = undefined;
        try {
            tmpFrames = _gameObj.texture.frames;
        } catch (e) {}
        if (tmpFrames) {
            let tmpList = [];
            for (var tmpProperty in tmpFrames) {
                tmpList.push(tmpProperty);
            }
            return tmpList;
        }
    }
    updateDropdown(_target, _list){
        let innerHTMLStr = "";
        for(var i=0; i<_list.length; i++){
            var str = "<option value='" + _list[i] + "'>" + _list[i] + "</option>";
            innerHTMLStr += str;
        }
        if (innerHTMLStr != "") _target.domElement.children[0].innerHTML = innerHTMLStr;
    }
}