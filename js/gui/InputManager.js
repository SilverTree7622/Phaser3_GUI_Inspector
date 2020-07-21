
import { DebugGetThisConsole, DebugPointerPosition } from '../utils/DebugConsoleFunc.js';

export default class InputManager {
    constructor() {
        this.size = {};
        this.mainCamera = undefined;
        this.cursorKey = undefined;
        this.wheelValue = 150;
        this.followConfig = {
            x: 0, y: 0, zoom: 1
        };
    }
    create(_scene, _debugBox, _folder) {
        this.createDisableRightClick();
        this.createSize(_scene);
        this.createMainCamera(_scene);
        this.createCursorKey(_scene);
        this.createConsoleCmd(_scene, _debugBox);
        this.createOverEvent(_scene, _debugBox, _folder);
        this.createFocusEvent(_scene, _debugBox, _folder);
        this.createDetailEvent(_scene, _debugBox, _folder);
        this.createVisibleEvent(_scene, _debugBox);
        this.createCameraEvent(_scene);
        this.createFollowEvent(_scene, _debugBox);
    }
    
    createDisableRightClick() {
        window.addEventListener('contextmenu', (e) => {
            e.preventDefault(); 
        });
    }
    createSize(_scene) {
        this.size.w = _scene.game.config.width;
        this.size.h = _scene.game.config.height;
    }
    createMainCamera(_scene) {
        this.mainCamera = _scene.cameras.main;
    }
    createCursorKey(_scene) {
        this.cursorKey = _scene.input.keyboard.createCursorKeys(); // cursor key
    }
    getCursorKey() {
        return this.cursorKey;
    }
    setFollowConfig() {
        this.followConfig.x = this.mainCamera.midPoint.x;
        this.followConfig.y = this.mainCamera.midPoint.y;
        this.followConfig.zoom = this.mainCamera.zoom;
    }
    getPrevFollowConfig() {
        return this.followConfig;
    }

    createConsoleCmd(_scene, _debugBox) {
        // when press command SHIFT + C
        _scene.input.keyboard.on('keyup-C', () => {
            if (this.chckCmdShiftKeyDown()) { // if focus
                let tmpFocusGameObj = _debugBox.getFocusGameObj();
                if (tmpFocusGameObj) {
                    DebugGetThisConsole.call(tmpFocusGameObj);
                }
            }
        });
    }
    createOverEvent(_scene, _debugBox, _folder) {
        // just pointer over obj
        _scene.input.on('gameobjectover', (_pointer, _gameObj) => {
            if (!this.chckGameObjIsFocusOnGUI(_gameObj)) { // not focus
                _debugBox.setPointerOver(_gameObj);
                _debugBox.setOver(_gameObj);
                _debugBox.setOverGameObj(_gameObj);
                _folder.setBasicOverFolder(_gameObj);
            }
        });
        // when out from pointer over obj
        _scene.input.on('gameobjectout', (_pointer, _gameObj) => {
            if (!this.chckGameObjIsFocusOnGUI(_gameObj)) { // not focus
                _debugBox.clearPointerOver(_gameObj);
                _debugBox.clearOverGameObj();
                _debugBox.setOverGameObj(undefined);
                _folder.setBasicOverFolder();
            }
        });
    }
    createFocusEvent(_scene, _debugBox, _folder) {
        // when want to focus logic
        _scene.input.on('gameobjectdown', (_pointer, _gameObj) => {
            // if middle button pressed
            if (this.chckCommandKey(_pointer)) {
                this.runFocusLogic(_scene, _gameObj, _debugBox, _folder);
            }
        });
        // when press command SHIFT + F
        _scene.input.keyboard.on('keyup-F', () => {
            if (this.chckCmdShiftKeyDown()) {
                // set gameObj via which pointer over on
                let tmpGameObj = _debugBox.getOverGameObj();
                this.runFocusLogic(_scene, tmpGameObj, _debugBox, _folder);
            }
        });
    }

    // when focused, SHIFT + D deep into the focused obj in detailed property
    createDetailEvent(_scene, _debugBox, _folder) {
        _scene.input.keyboard.on('keyup-D', () => {
            let tmpFocusGameObj = _debugBox.getFocusGameObj();
            if ( // chck if focus valid & shift key down
                tmpFocusGameObj &&
                this.chckCmdShiftKeyDown()
                )
            {
                // chck isDetailedOpen boolean then go 2 detailed or basic
                if (_folder.getDetailedStatus()) {
                    _folder.back2Basic(tmpFocusGameObj.guiIdx);
                }
                else {
                    _folder.cross2FocusObj(_debugBox.getFocusGameObj(), this.objList);
                } 
            }
        });
    }

    createVisibleEvent(_scene, _debugBox) {
        // when press command SHIFT + V, visible on/off logic
        _scene.input.keyboard.on('keyup-V', (_pointer, _gameObj) => {
            let tmpFocusGameObj = _debugBox.getFocusGameObj();
            if ( // chck if focus valid & shift key down
                tmpFocusGameObj &&
                this.chckCmdShiftKeyDown()
                ) {
                tmpFocusGameObj.visible = !tmpFocusGameObj.visible;
            }
        });
    }
    createCameraEvent(_scene) {
        // when press command SHIFT + SCROLL UP&DOWN, Main Camera zoom changes
        _scene.input.on('wheel', (_pointer, _gameObj, _deltaX, _deltaY, _deltaZ) => {
            if (this.chckCmdShiftKeyDown()) {
                let tmpZoom = this.mainCamera.zoom;
                let tmpGap = (-1) * (_deltaY / (this.wheelValue * 10));
                let tmpCal = tmpZoom + tmpGap;
                // if zoom size under 0.1 & Gap value is minus, no reason to smaller i think
                if (tmpCal <= 0.1 && tmpGap < 0) {}
                else {
                    this.mainCamera.pan(_pointer.x, _pointer.y, 100);
                    this.mainCamera.zoomTo(tmpCal, 100);
                }
            }
        });
        // SHIFT + RIGHT CLICK to panning camera to pointer position
        _scene.input.on('pointerup', (_pointer, _gameObj) => {
            if (this.chckCmdShiftKeyDown() && _pointer.rightButtonReleased()) {
                this.mainCamera.pan(_pointer.x, _pointer.y, 250, 'Power2');
                DebugPointerPosition(this.mainCamera, _pointer);
            }
        });
        // SHIFT + S get back to default zoom value
        _scene.input.keyboard.on('keyup-S', (_pointer, _gameObj) => {
            if (this.chckCmdShiftKeyDown()) {
                this.set2defaultZoom();
            }
        });
    }
    set2defaultZoom() {
        this.mainCamera.pan(this.size.w/2, this.size.h/2, 250, 'Elastic');
        this.mainCamera.zoomTo(1, 0);
    }
    createFollowEvent(_scene, _debugBox) {
        // main camera just follows focus game obj
        _scene.input.keyboard.on('keyup-A', (_pointer, _gameObj) => {
            let tmpFocusGameObj = _debugBox.getFocusGameObj();
            if (this.chckCmdShiftKeyDown() && tmpFocusGameObj) {
                
                console.log('this.mainCamera:', this.mainCamera);
                if (!this.mainCamera._follow) {
                    this.setFollowConfig();
                    this.mainCamera.startFollow(tmpFocusGameObj, true, 0.3, 0.3);
                }
                else {
                    let tmpP = this.getPrevFollowConfig();
                    console.log('tmpP:', tmpP);
                    this.mainCamera.stopFollow();
                    this.mainCamera.pan(tmpP.x, tmpP.y, 250, 'Power2');
                    this.mainCamera.zoomTo(tmpP.zoom, 0);
                }
            }
        });
    }

    // chck focus then, focus ON game object or OFF
    runFocusLogic(_scene, _gameObj, _debugBox, _folder) {
        // isFocusOnGUI boolean is true
        // (if u run focusCommand on the focus game object)
        if (this.chckGameObjIsFocusOnGUI(_gameObj)) {
            // clear the focus object
            this.runFocusLogic_focus_clear(_gameObj, _debugBox, _folder);
        }
        // isFocusOnGUI boolean is false
        // (if u run focusCommand on the not focus game object)
        else {
            let tmpFocusGameObj = _debugBox.getFocusGameObj();
            if (tmpFocusGameObj) {
                // clear the focus during object focusing
                // init focus check
                this.runFocusLogic_focus_clear(tmpFocusGameObj, _debugBox, _folder);
            }
            else {
                // pure game object focus
                // set to this game object
                this.runFocusLogic_focus_pure(_scene, _gameObj, _debugBox, _folder);
            }
        }
    }
    runFocusLogic_focus_clear(_gameObj, _debugBox, _folder) {
        _debugBox.clearFocus(_gameObj);
        _debugBox.setFocusGameObj(undefined);
        _debugBox.clearFocusGameObj();
        _folder.setBasicFocusFolder();
        _folder.back2Basic(_gameObj.guiIdx);
    }
    runFocusLogic_focus_pure(_scene, _gameObj, _debugBox, _folder) {
        if (_gameObj) {
            _debugBox.setFocusGameObj(_gameObj);
            _debugBox.setFocus(_gameObj);
            _debugBox.setFocusPerformance(_gameObj, _folder);
            _folder.setBasicFocusFolder(_gameObj);
        }
        else {
            // nothing is on the pointer so basically nothing happen
        }
    }
    chckCommandKey(_pointer) {
        let tmpBool = undefined;
        if ((this.getCursorKey().shift.isDown && _pointer.leftButtonDown()) || // shift + mouse left click or
            (!_pointer.rightButtonDown() && !_pointer.leftButtonDown())) { // mouse middle button
            tmpBool = true;
        }
        else { tmpBool = false; }
        return tmpBool;
    }
    chckCmdShiftKeyDown() {
        let tmpBool = (this.getCursorKey().shift.isDown) ? true : false; // is shift down?
        return tmpBool;
    }
    chckGameObjIsFocusOnGUI(_gameObj) {
        let tmpGameObjBoolean = (_gameObj) ? _gameObj.isFocusOnGUI : null;
        return tmpGameObjBoolean;
    }

}