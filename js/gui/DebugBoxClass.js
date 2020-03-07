
// make debug box with phaser graphics
export default class DebugBoxClass {
    constructor() {
        this.graphics = undefined;
        this.list = undefined;
        this.over = this.initOver();
        this.focus = this.initFocus();
    }
    create(_scene, _list) {
        this.createSetting(_scene);
        this.createOver(Phaser.Geom.Rectangle);
        this.createFocus(Phaser.Geom.Rectangle);
    }
    update(_time, _delta, _list) {
        this.clearDebugBox();
        this.updateChaseOver();
        this.updateChaseFocus();
    }

    initOver() {
        let tmpO = {};
        tmpO.gameObj = undefined; // over game object
        tmpO.self = undefined; // over self graphics
        tmpO.style = {
            stroke: 3,
            color: 0x00ff00 // green
        };
        return tmpO;
    }
    initFocus() {
        let tmpF = {};
        tmpF.gameObj = undefined; // focus game object
        tmpF.self = undefined; // focus self graphics
        tmpF.style = {
            stroke: 4,
            color: 0xff0000 // red
        };
        return tmpF;
    }
    createSetting(_scene) {
        this.graphics = _scene.add.graphics();
        _scene.add.existing(this.graphics); // do this just for sure
    }
    createOver(_geomRectangle) {
        this.over.self = new _geomRectangle(0, 0, 1, 1);
    }
    createFocus(_geomRectangle) {
        this.focus.self = new _geomRectangle(0, 0, 1, 1);
    }
    updateChaseOver() {
        if (this.over.self && this.over.gameObj) {
            this.setOver(this.over.gameObj);
        }
    }
    updateChaseFocus(_gameObj) {
        if (this.focus.self && this.focus.gameObj) {
            this.setFocus(this.focus.gameObj);
        }
        else {
            // console.log('this.focus.self:', this.focus.self);
            // console.log('this.focus.gameObj:', this.focus.gameObj);
        }
    }

    // set logic
    setOver(_gameObj) {
        this.over.gameObj = _gameObj;
        this.setDebugBox(this.over, _gameObj);
    }
    setFocus(_gameObj) {
        if (_gameObj) { // check is gameObj
            this.focus.gameObj = _gameObj;
            this.setDebugBox(this.focus, _gameObj);
        } else {}
    }
    setClearNFocus(_gameObj) {
        this.clearDebugBox();
        this.setFocus(_gameObj);
    }
    // config should contain pos, scale(width, height)
    setDebugBox(_target, _gameObj) {
        let tmpTarget = _target;
        let tmpConfig = {};
        tmpTarget.gameObj = _gameObj;
        tmpConfig.originX = _gameObj.originX;
        tmpConfig.originY = _gameObj.originY;
        tmpConfig.w = _gameObj.width * _gameObj.scaleX;
        tmpConfig.h = _gameObj.height * _gameObj.scaleY;
        tmpConfig.x = _gameObj.x - tmpConfig.w * _gameObj.originX;
        tmpConfig.y = _gameObj.y - tmpConfig.h * _gameObj.originY;
        this.graphics.lineStyle(tmpTarget.style.stroke, tmpTarget.style.color);
        tmpTarget.self.setPosition(tmpConfig.x, tmpConfig.y);
        tmpTarget.self.setSize(tmpConfig.w, tmpConfig.h);
        this.graphics.strokeRectShape(tmpTarget.self);
    }
    // clear logic
    clearDebugBox() {
        this.graphics.clear();
    }
    clearOverGameObj() {
        this.over.gameObj = undefined;
        this.clearDebugBox();
        if (this.focus.gameObj) {
            this.setDebugBox(this.focus, this.focus.gameObj);
        }
        else {}
    }
    clearFocusGameObj() {
        this.focus.gameObj = undefined;
        this.clearDebugBox();
    }
}