
// make debug box with phaser graphics
export default class DebugBoxManager {
    constructor() {
        this.scene;
        this.camera;
        this.graphics;
        this.list;
        this.gameBound = this.initGameBound();
        this.over = this.initOver();
        this.focus = this.initFocus();
    }
    create(_scene, _camera) {
        this.scene = _scene;
        this.camera = _camera;
        this.createSetting(_scene);
        this.createOver(Phaser.Geom.Rectangle);
        this.createFocus(Phaser.Geom.Rectangle);
    }
    update(_time, _delta) {
        this.clearDebugBox();
        this.updateSizeBound();
        this.updateChaseOver();
        this.updateChaseFocus();
    }

    initGameBound() {
        let tmpS = {};
        tmpS.self;
        tmpS.style = {
            stroke: 3,
            color: 0x7fa5e3
        };
        return tmpS;
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

    updateSizeBound() {
        if (this.camera.getIsDebugCamBound() || this.camera.getIsDraggable()) {
            this.graphics.lineStyle(this.gameBound.style.stroke, this.gameBound.style.color);
            this.graphics.strokeRectShape({
                x: 0,
                y: 0,
                width: this.camera.getSize().w,
                height: this.camera.getSize().h
            });
        }
    }
    updateChaseOver() {
        if (this.over.self && this.over.gameObj) {
            this.setOver(this.over.gameObj);
        }
    }
    updateChaseFocus() {
        if (this.focus.self && this.focus.gameObj) {
            this.setFocus(this.focus.gameObj);
        }
    }

    // EXTERNAL: get logic
    getOverGameObj() {
        return this.over.gameObj;
    }
    getFocusGameObj() {
        return this.focus.gameObj;
    }
    // EXTERNAL: set logic
    setOverGameObj(_gameObj) {
        this.over.gameObj = _gameObj;
    }
    setFocusGameObj(_gameObj) {
        this.focus.gameObj = _gameObj;
    }
    setOver(_gameObj) {
        this.over.gameObj = _gameObj;
        this.setDebugBox(this.over, _gameObj);
    }
    setClearNFocus(_gameObj) {
        this.clearDebugBox();
        this.setFocus(_gameObj);
    }
    // config should contain pos, scale(width, height)
    setDebugBox(_target, _gameObj) {
        // let tmpPC = this.chckParentContainer(_gameObj);
        // let tmpTarget = _target;
        // let tmpConfig = {};
        // tmpTarget.gameObj = _gameObj;
        // if (tmpPC) {
        //     tmpConfig.originX = _gameObj.originX * tmpPC.originX;
        //     tmpConfig.originY = _gameObj.originY * tmpPC.originY;
        //     tmpConfig.width = _gameObj.width * _gameObj.scaleX;
        //     tmpConfig.height = _gameObj.height * _gameObj.scaleY;
        //     tmpConfig.x = _gameObj.x - tmpConfig.width * tmpConfig.originX;
        //     tmpConfig.y = _gameObj.y - tmpConfig.height * tmpConfig.originY;
        // }
        // else {
        //     tmpConfig.originX = _gameObj.originX;
        //     tmpConfig.originY = _gameObj.originY;
        //     tmpConfig.width = _gameObj.width * _gameObj.scaleX;
        //     tmpConfig.height = _gameObj.height * _gameObj.scaleY;
        //     tmpConfig.x = _gameObj.x - tmpConfig.width * _gameObj.originX;
        //     tmpConfig.y = _gameObj.y - tmpConfig.height * _gameObj.originY;
        // }
        this.graphics.lineStyle(_target.style.stroke, _target.style.color);
        // tmpTarget.self.setPosition(tmpConfig.x, tmpConfig.y);
        // tmpTarget.self.setSize(tmpConfig.width, tmpConfig.height);
        this.graphics.strokeRectShape(_gameObj.getBounds());
    }
    
    setFocus(_gameObj) {
        if (_gameObj) { // check is gameObj
            _gameObj.isFocusOnGUI = true;
            this.focus.gameObj = _gameObj;
            this.setDebugBox(this.focus, _gameObj);
        }
    }
    setFocusPerformance(_gameObj, _folder) { // flickering tween performance
        let tmpTwConfig = { // basically, this is for container tween setting ALPHA
            from: 1,
            to: 0.5,
            isTint: false
        };
        if (_gameObj.setTint) { // this is just mono gameObj tween setting TINT
            tmpTwConfig.from = 255;
            tmpTwConfig.to = 120;
            tmpTwConfig.isTint = true;
        }

        _gameObj.focusTw = this.scene.tweens.addCounter({
            from: tmpTwConfig.from, to: tmpTwConfig.to,
            duration: 500,
            ease: 'Sine.easeIn',
            repeat: -1, yoyo: true,
            onStart: () => {
                this.setStoreConfig('BASIC', _gameObj, _folder);
            },
            onUpdate: () => {
                if (_gameObj.isFocusOnGUI) {
                    if (tmpTwConfig.isTint) {
                        let tmpValue = ~~(_gameObj.focusTw.getValue());
                        _gameObj.setTint(Phaser.Display.Color.GetColor(tmpValue, tmpValue, tmpValue));
                    }
                    else {
                        let tmpValue = _gameObj.focusTw.getValue();
                        _gameObj.setAlpha(tmpValue);
                    }
                }
                else {
                    if (tmpTwConfig.isTint) {
                        _gameObj.clearTint();
                    }
                    else {
                        _gameObj.setAlpha(1);
                    }
                    _gameObj.focusTw.remove();
                }
            }
        });
    }
    clearFocus(_gameObj) {
        let tmpObj = undefined;
        (_gameObj) ? (tmpObj = _gameObj) : (tmpObj = this.getFocusGameObj());
        if (tmpObj) {
            tmpObj.setAlpha(1); // temp (should be set alpha to saved alpha value)
            tmpObj.isFocusOnGUI = false;
        }
    }
    setPointerOver(_gameObj) {
        _gameObj.setAlpha(0.7);
    }
    clearPointerOver(_gameObj) {
        (_gameObj.isTinted) ? _gameObj.clearTint() : null;
        _gameObj.setAlpha(1); // temp (should be set alpha to saved alpha value)
    }
    setStoreConfig(_folderType, _gameObj, _folder) {
        let tmpFocus = undefined;
        if (_folderType === 'BASIC') {
            tmpFocus = _folder.getTmpStorageOver();
        }
        else if (_folderType === 'CUSTOM') {
            tmpFocus = _folder.getTmpStorageFocus();
        }

        tmpFocus.guiIdx = _gameObj.guiIdx;

        try {
            tmpFocus.guiAlpha = _gameObj.alpha;
        } catch (e) {}
        try {
            tmpFocus.guiTint = _gameObj.tint;
        } catch (e) {}
    }
    clearStoreConfig(_folderType) {
        if (_folderType === 'BASIC') {

        }
        else if (_folderType === 'CUSTOM') {

        }
        else {

        }
    }
    // ___________________________________________
    
    chckParentContainer(_gameObj) {
        return _gameObj.parentContainer;
    }
    // clear logics
    clearDebugBox() {
        this.graphics.clear();
    }
    clearOverGameObj() {
        this.over.gameObj = undefined;
        this.clearDebugBox();
        if (this.focus.gameObj) {
            this.setDebugBox(this.focus, this.focus.gameObj);
        }
       
    }
    clearFocusGameObj() {
        this.focus.gameObj = undefined;
        this.clearDebugBox();
    }
}