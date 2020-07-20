
import { DebugGetThisConsole } from '../utils/DebugConsoleFunc.js';

export default class InputManager {
    constructor() {
        this.cursorKey = undefined;
    }
    create(_scene, _debugBox, _folder) {
        this.createCursorKey(_scene);
        this.createConsoleCmd(_scene, this.getCursorKey(), _debugBox);
        this.createOverEvent(_scene, _debugBox, _folder);
        this.createFocusEvent(_scene, this.getCursorKey(), _debugBox, _folder);
        this.createDetailEvent(_scene, this.getCursorKey(), _debugBox, _folder);
        this.createVisibleEvent(_scene, this.getCursorKey(), _debugBox);
    }

    createCursorKey(_scene) {
        this.cursorKey = _scene.input.keyboard.createCursorKeys(); // cursor key
    }
    createConsoleCmd(_scene, _cursorKey, _debugBox) {
        // when press command SHIFT + C
        _scene.input.keyboard.on('keydown-C', () => {
            if (this.chckCmdShiftKeyDown(_cursorKey)) { // if focus
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
    createFocusEvent(_scene, _cursorKey, _debugBox, _folder) {
        // when want to focus logic
        _scene.input.on('gameobjectdown', (_pointer, _gameObj) => {
            // if middle button pressed
            if (this.chckCommandKey(_cursorKey, _pointer)) {
                this.runFocusLogic(_scene, _gameObj, _debugBox, _folder);
            }
        });
        // when press command SHIFT + F
        _scene.input.keyboard.on('keydown-F', () => {
            if (this.chckCmdShiftKeyDown(_cursorKey)) {
                // set gameObj via which pointer over on
                let tmpGameObj = _debugBox.getOverGameObj();
                this.runFocusLogic(_scene, tmpGameObj, _debugBox, _folder);
            }
        });
    }

    // when focused, SHIFT + D deep into the focused obj in detailed property
    createDetailEvent(_scene, _cursorKey, _debugBox, _folder) {
        _scene.input.keyboard.on('keydown-D', () => {
            let tmpFocusGameObj = _debugBox.getFocusGameObj();
            if ( // chck if focus valid & shift key down
                tmpFocusGameObj &&
                this.chckCmdShiftKeyDown(_cursorKey)
                )
            {    
                _folder.cross2FocusObj(_debugBox.getFocusGameObj(), this.objList);
            }
        });
    }

    createVisibleEvent(_scene, _cursorKey, _debugBox) {
        // when press command SHIFT + V, visible on/off logic
        _scene.input.keyboard.on('keydown-V', (_pointer, _gameObj) => {
            let tmpFocusGameObj = _debugBox.getFocusGameObj();
            if ( // chck if focus valid & shift key down
                tmpFocusGameObj &&
                this.chckCmdShiftKeyDown(_cursorKey)
                ) {
                tmpFocusGameObj.visible = !tmpFocusGameObj.visible;
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
    chckCommandKey(_tmpKey, _pointer) {
        let tmpBool = undefined;
        if ((_tmpKey.shift.isDown && _pointer.leftButtonDown()) || // shift + mouse left click or
            (!_pointer.rightButtonDown() && !_pointer.leftButtonDown())) { // mouse middle button
            tmpBool = true;
        }
        else { tmpBool = false; }
        return tmpBool;
    }
    chckCmdShiftKeyDown(_tmpKey) {
        let tmpBool = (_tmpKey.shift.isDown) ? true : false; // is shift down?
        return tmpBool;
    }
    chckGameObjIsFocusOnGUI(_gameObj) {
        let tmpGameObjBoolean = (_gameObj) ? _gameObj.isFocusOnGUI : null;
        return tmpGameObjBoolean;
    }
    chckCmdShiftKeyDown(_tmpKey) {
        let tmpBool = (_tmpKey.shift.isDown) ? true : false; // is shift down?
        return tmpBool;
    }

    getCursorKey() {
        return this.cursorKey;
    }
}