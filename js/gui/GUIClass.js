/*
    * Origin ref from under URL
    https://github.com/dataarts/dat.gui/blob/master/API.md
    
    * DAT.GUI
    particle
    https://labs.phaser.io/edit.html?src=src/game%20objects\particle%20emitter\particle%20editor.js
    physics sprite
    https://labs.phaser.io/edit.html?src=src/physics\arcade\body%20controls.js
    matter
    audio
    https://labs.phaser.io/edit.html?src=src/audio\HTML5%20Audio\Loop%20Delay.js
    https://labs.phaser.io/view.html?src=src/audio\Web%20Audio\Seek.js
    world view
    https://labs.phaser.io/edit.html?src=src/camera\move%20camera%20with%20keys.js

    * DAT.GUI Control
    press 'H' to toggle the GUI visibility

    * Another Ref
    https://github.com/koreezgames/phaser3-particle-editor
*/
/*
    END GOAL:
        you can get name when you over the objects,
        and if you click it, you can get its properties in custom GUI list.
        (my wish is load, save json from phaser scene, then flexible implement,
        for each gameobjects, but this is gonna be hard so i just drawback for next version)
*/

"use strict";

// import * as dat from './lib/DatGUILib.js'; // import GUI lib
// import GUIcss from './lib/DatGUIcss'; // import GUI CSS

// lib
import LibClass from './lib/index.js'; // import whole GUI
// debug console utils
import {DebugConsole, DebugGetThisConsole, DebugSceneNAllDisplayList} from '../utils/DebugConsoleFunc.js';
// root
import TypeSortManager from './TypeSortManager.js';
import FolderManager from './FolderManager.js';
import SaveManager from './SaveManager.js';
import DebugBoxClass from './DebugBoxClass.js';


export class GUIClass {
    constructor(_tmpHandOverObj) {
        this.libs = new LibClass(_tmpHandOverObj.css);
        this.scene = undefined;
        this.objList = undefined; // all game object list
        this.cursorKey = undefined;
        this.conAlert = '_PGI System_ :';
        this.initConsole(this.libs.getGUIcssObj(), DebugConsole);
        // this.statusManager = this.initChckStatusManager(this.status);
        this.typeSort = new TypeSortManager(_tmpHandOverObj.scene);
        this.folder = new FolderManager(this.libs.getGUILib(), this.typeSort);
        this.save = new SaveManager();
        this.debugBox = new DebugBoxClass();
    }
    create(_scene) {
        this.createCursorKey(_scene, this.cursorKey);
        this.createETCClass(_scene);
        this.createBasicFolder(_scene, this.libs, this.folder, this.folder.getBasicFolder(), this.debugBox, DebugConsole, DebugSceneNAllDisplayList);
        this.createFocusFolder(_scene, this.cursorKey, this.debugBox, this.folder, this.typeSort);
        this.createConsoleCmd(_scene, this.cursorKey, this.debugBox, DebugGetThisConsole);
        this.folder.chckOpenAllList();
    }
    createCursorKey(_scene) {
        this.cursorKey = _scene.input.keyboard.createCursorKeys(); // cursor key
    }
    createETCClass(_scene) {
        this.folder.create(_scene);
        this.save.create(_scene);
        this.debugBox.create(_scene);
    }
    update(_time, _delta) {
        this.debugBox.update(_time, _delta, this.objList);
    }


    initConsole(_cssObj, _debugConsole) {
        let tmpName = ' PGInspector.js';
        let tmpVersion = '1.1.0';
        let tmpURL = 'https://github.com/SilverTree7622/Phaser3_GUI_inspector';
        _debugConsole({
            name: tmpName,
            version: tmpVersion,
            initConfig: _cssObj,
            url: tmpURL
        });
    }
    initChckStatusManager(_statusManager) {
        let tmpSM;
        if (_statusManager) {
            tmpSM = _statusManager;
            console.log(this.conAlert, 'USING STATUS MANAGER');
        }
        else {
            tmpSM = undefined;
            console.log(this.conAlert, 'NOT USING STATUS MANAGER');
        }
        return tmpSM;
    }
    createFocusFolder(_scene, _cursorKey, _debugBox, _folder, _typeSort) {
        let tmpDisplayList = undefined;
        tmpDisplayList = _scene.children;
        this.objList = tmpDisplayList.list;
        _typeSort.createFocusFolder(this.objList, _folder, _debugBox, DebugGetThisConsole);
        this.createFocusFolderOverEvent(_scene, _debugBox, _folder);
        this.createFocusFolderFocusEvent(_scene, _cursorKey, _debugBox, _folder);
        this.createFocusFolderVisibleEvent(_scene, _cursorKey, _debugBox);
    }
    createConsoleCmd(_scene, _cursorKey, _debugBox, _DebugGetThisConsole) {
        // when press command SHIFT + C
        _scene.input.keyboard.on('keydown-C', () => {
            if (this.chckCmdShiftKeyDown(_cursorKey)) { // if focus
                let tmpFocusGameObj = _debugBox.getFocusGameObj();
                if (tmpFocusGameObj) {
                    _DebugGetThisConsole.call(tmpFocusGameObj);
                }
            }
        });
    }
    createFocusFolderOverEvent(_scene, _debugBox, _folder) {
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
    createFocusFolderFocusEvent(_scene, _cursorKey, _debugBox, _folder) {
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
    createFocusFolderVisibleEvent(_scene, _cursorKey, _debugBox) {
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
    createBasicFolder(_scene, _lib, _folder, _basic, _debugBox, _DebugConsole, _DebugSceneNAllDisplayList) { // create basic pointer
        let tmpAllConsole = {};
        tmpAllConsole.GUI_SCENE_LIST = _DebugSceneNAllDisplayList.bind(_scene),
        tmpAllConsole.GUI_CLEAR = () => {
            console.clear();
            this.initConsole(this.libs.getGUIcssObj(), _DebugConsole);
        }
        let tmpPointer = undefined;
        let tmpXY = {};
        tmpXY.x = _scene.game.config.width;
        tmpXY.y = _scene.game.config.height;
        let tmpObj = undefined;
        let tmpFocus = undefined;
        let tmpObjProperties = {
            GUIIdx: 'NONE',
            name: 'NONE',
            type: 'NONE',
            texture: 'NONE'
        };
        // focus off function
        let tmpFocusFunc = () => {
            _debugBox.clearFocus();
            _folder.setBasicFocusFolder();
            _debugBox.clearFocusGameObj();
        }
        // cross2FocusObj
        let tmpGo2ThisFunc = () => {
            _folder.cross2FocusObj(_debugBox.getFocusGameObj(), this.objList);
        };
        let tmpFocusProperties = {
            GUIIdx: 'NONE',
            name: 'NONE',
            type: 'NONE',
            texture: 'NONE',
            GUI_FOCUS_OFF: tmpFocusFunc,
            GUI_GO_2_DETAIL: tmpGo2ThisFunc
        };

        // setting folder hierarchy list
        _basic.add(tmpAllConsole, 'GUI_SCENE_LIST');
        _basic.add(tmpAllConsole, 'GUI_CLEAR');
        _lib.addFolderInBasic(_basic);
        tmpPointer = _basic.addFolder('Pointer');
        tmpPointer.add(_scene.input, 'x').min(0).max(tmpXY.x).listen();
        tmpPointer.add(_scene.input, 'y').min(0).max(tmpXY.y).listen();
        tmpObj = _basic.addFolder('Obj');
        tmpObj.add(tmpObjProperties, 'GUIIdx').listen();
        tmpObj.add(tmpObjProperties, 'name').listen();
        tmpObj.add(tmpObjProperties, 'type').listen();
        tmpObj.add(tmpObjProperties, 'texture').listen();
        tmpFocus= tmpObj.addFolder('Focus'); // add to Parent Obj folder
        tmpFocus.add(tmpFocusProperties, 'GUIIdx').listen();
        tmpFocus.add(tmpFocusProperties, 'name');
        tmpFocus.add(tmpFocusProperties, 'type');
        tmpFocus.add(tmpFocusProperties, 'texture');
        tmpFocus.add(tmpFocusProperties, 'GUI_FOCUS_OFF'); // function
        tmpFocus.add(tmpFocusProperties, 'GUI_GO_2_DETAIL'); // function

        _folder.push2FolderList(tmpPointer, 'basic');
        _folder.push2FolderList(tmpObj, 'basic');
    }
    // create each custom folder from Phaser.scene.displayList
    createCustom(_scene, _custom, _typeSort) {
        let tmpLength = this.objList.length;
        for (var i=0; i<tmpLength; i++) {
            let tmpFolderInCustom = this.folder.add2CustomFolder(i);
            _typeSort.chckObjType(_custom, i, tmpFolderInCustom, this.objList);
        }
    }

    // destroy GUI when restart Phaser.Scene
    destroyGUI() {
        this.libs.destroyGUI();
    }

    // WARNING THIS IS TRIAL: config
    saveConfig() {

    }
    loadConfig() {

    }

    tryCatchFlow(_function) {
        try {
            _function();
        }
        catch(e) {}
    }
}
