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

import LibClass from './lib/index.js'; // import whole GUI
import TypeSortManager from './TypeSortManager.js';
import FolderManager from './FolderManager.js';
import SaveManager from './SaveManager.js';
import DebugBoxClass from './DebugBoxClass.js';

export class GUIClass {
    constructor(_tmpHandOverObj) {
        this.libs = new LibClass(_tmpHandOverObj.css);
        this.scene = undefined;
        this.objList = undefined; // all game object list
        this.conAlert = '_PGI System_ :';
        this.URLPath = this.initURLPath();
        this.statusManager = this.initChckStatusManager(this.status);
        this.overConfig = this.initOverConfig();
        this.focusConfig = this.initFocusConfig();
        this.typeSort = new TypeSortManager(_tmpHandOverObj.scene);
        this.folder = new FolderManager(this.libs.getGUILib(), this.typeSort);
        this.save = new SaveManager();
        this.debugBox = new DebugBoxClass();
    }
    create(_scene) {
        this.createETCClass(_scene);
        this.createList(_scene, this.debugBox, this.folder);
        this.createBasic(_scene, this.libs, this.folder, this.folder.getBasicFolder());
        this.createCustom(_scene, this.folder.getCustomFolder(), this.typeSort, this.debugBox);
        this.folder.chckOpenAllList();
    }
    createETCClass(_scene) {
        this.folder.create(_scene);
        this.save.create(_scene);
        this.debugBox.create(_scene);
    }
    update(_time, _delta) {
        this.debugBox.update(_time, _delta, this.objList);
    }


    initURLPath() {
        let tmpURL = 'https://github.com/SilverTree7622/Phaser3_GUI_inspector';
        console.log(this.conAlert, tmpURL);
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
    initOverConfig() {
        let tmpOC = {};
        tmpOC.status = false;
        tmpOC.gameObj = undefined;
        return tmpOC;
    }
    initFocusConfig() {
        let tmpFC = {};
        tmpFC.status = false;
        tmpFC.gameObj = undefined;
        return tmpFC;
    }
    createList(_scene, _debugBox, _folder) {
        let tmpDisplayList = undefined;
        tmpDisplayList = _scene.children;
        this.objList = tmpDisplayList.list;
        this.createListInteractive(_scene, _debugBox, _folder);
    }
    // get scene then set list to form gui set up
    createListInteractive(_scene, _debugBox, _folder) {
        let tmpLength = this.objList.length;
        for (var i=0; i<tmpLength; i++) {
            if (this.objList[i].type !== 'Graphics' &&
                this.objList[i].type !== 'Container') {
                try { this.objList[i].setInteractive(); }
                catch(e) {}
            } else {}
            this.objList[i].guiIdx = i;
            this.objList[i].isFocusOnGUI = false;
            this.objList[i].focusTw = undefined;
            this.objList[i].GUI_BACK_2_BASIC = _folder.back2Basic.bind(_folder, i);
        }
        this.createListInteractiveOverEvent(_scene, _debugBox);
        this.createListInteractiveFocusEvent(_scene, _debugBox, _folder);
    }
    createListInteractiveOverEvent(_scene, _debugBox) {
        // just pointer over obj
        _scene.input.on('gameobjectover', (_pointer, _gameObj) => {
            if (!this.chckGameObjIsFocusOnGUI(_gameObj)) {
                this.setPointerOver(_gameObj);
                _debugBox.setOver(_gameObj);
                this.setGameObjOver(_gameObj);
            } else {}
        });
        // when out from pointer over obj
        _scene.input.on('gameobjectout', (_pointer, _gameObj) => {
            if (!this.chckGameObjIsFocusOnGUI(_gameObj)) { // not focus
                this.clearPointerOver(_gameObj);
                _debugBox.clearOverGameObj();
                this.setGameObjOver();
            } else {}
        });
    }
    createListInteractiveFocusEvent(_scene, _debugBox, _folder) {
        // when want to focus logic
        let tmpKey = _scene.input.keyboard.createCursorKeys(); // cursor key 
        _scene.input.on('gameobjectdown', (_pointer, _gameObj) => {
            // if middle button pressed
            if (this.chckCommandKey(tmpKey, _pointer)) {
                this.runFocusLogic(_scene, _gameObj, _debugBox, _folder);
            } else {}
        });
        // when press command SHIFT + F
        _scene.input.keyboard.on('keydown-F', () => {
            if (this.chckCommandKey_F(tmpKey)) {
                // set gameObj via which pointer over on
                let tmpGameObj = this.getGameObjOver();
                this.runFocusLogic(_scene, tmpGameObj, _debugBox, _folder);
            } else {}
        });
    }
    runFocusLogic(_scene, _gameObj, _debugBox, _folder) {
        if (this.chckGameObjIsFocusOnGUI(_gameObj)) { // clear the focus object
            this.setFocusConfig(true, _gameObj);
            this.clearFocus(_gameObj);
            _debugBox.clearFocusGameObj();
            _folder.setBasicFocusFolder();
        }
        else { // set the focus object
            if (this.getGameObjFocus()) { // init focus check
                this.clearFocus(this.focusConfig.gameObj);
                this.setFocusConfig(false);
                _debugBox.clearFocusGameObj();
            } else {}
            if (_gameObj) { // check gameObj is exist
                // set to this game object
                this.setFocusConfig(true, _gameObj);
                this.setFocus(_scene, _gameObj);
                _debugBox.setFocus(_gameObj);
                _folder.setBasicFocusFolder(_gameObj);   
            } else {}
        }
    }
    chckCommandKey(_tmpKey, _pointer) {
        let tmpBool = undefined;
        if ((_tmpKey.shift.isDown && _pointer.leftButtonDown())  // shift + mouse left click
            ||
            (!_pointer.rightButtonDown() && !_pointer.leftButtonDown()) // mouse middle button
            ) {
            tmpBool = true;
        }
        else { tmpBool = false; }
        return tmpBool;
    }
    chckCommandKey_F(_tmpKey) {
        let tmpBool = (_tmpKey.shift.isDown) ? true : false; // is shift down?
        return tmpBool;
    }
    setGameObjOver(_gameObj) {
        this.overConfig.gameObj = _gameObj;
    }
    setGameObjFocus(_gameObj) {
        this.focusConfig.gameObj = _gameObj;
    }
    setOverConfig(_status, _gameObj) {
        this.overConfig.status = _status;
        this.overConfig.gameObj = _gameObj;
    }
    setFocusConfig(_status, _gameObj) {
        this.focusConfig.status = _status;
        this.focusConfig.gameObj = _gameObj;
    }
    getGameObjOver() {
        return this.overConfig.gameObj;
    }
    getGameObjFocus() {
        return this.focusConfig.gameObj;
    }
    chckGameObjIsFocusOnGUI(_gameObj) {
        let tmpGameObjBoolean = (_gameObj) ? _gameObj.isFocusOnGUI : null;
        return tmpGameObjBoolean;
    }
    createBasic(_scene, _lib, _folder, _basic) { // create basic pointer
        let tmpPointer = undefined;
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
            this.clearFocus();
            _folder.setBasicFocusFolder();
            this.debugBox.clearFocusGameObj();
        }
        // cross2FocusObj
        let tmpGo2ThisFunc = () => {
            _folder.cross2FocusObj(this.focusConfig.gameObj, this.objList);
        };
        let tmpFocusProperties = {
            GUIIdx: 'NONE',
            name: 'NONE',
            type: 'NONE',
            texture: 'NONE',
            FOCUS_OFF: tmpFocusFunc,
            GO_2_THIS_OBJ: tmpGo2ThisFunc
        };

        // setting folder hierarchy list
        _lib.addFolderInBasic(_basic);
        tmpPointer = _basic.addFolder('Pointer');
        tmpPointer.add(_scene.input, 'x').listen();
        tmpPointer.add(_scene.input, 'y').listen();
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
        tmpFocus.add(tmpFocusProperties, 'FOCUS_OFF'); // function
        tmpFocus.add(tmpFocusProperties, 'GO_2_THIS_OBJ'); // function

        _folder.push2FolderList(tmpPointer, 'basic');
        _folder.push2FolderList(tmpObj, 'basic');
    }
    // create each custom folder from Phaser.scene.displayList
    createCustom(_scene, _custom, _typeSort, _debugBox) {
        let tmpLength = this.objList.length;
        for (var i=0; i<tmpLength; i++) {
            let tmpFolderInCustom = this.folder.add2CustomFolder(i);
            _typeSort.chckObjType(_custom, i, tmpFolderInCustom, this.objList, _debugBox);
        }
    }
    setFocus(_scene, _gameObj) {
        _gameObj.isFocusOnGUI = true;
        this.setFocusPerformance(_scene, _gameObj);
    }
    setFocusPerformance(_scene, _gameObj) { // flickering tween performance
        _gameObj.focusTw = _scene.tweens.addCounter({
            from: 255, to: 120,
            duration: 350, ease: 'Linear', repeat: -1, yoyo: true,
            onStart: () => {
                this.setStoreConfig('BASIC', _gameObj);
            },
            onUpdate: () => {
                if (_gameObj.isFocusOnGUI) {
                    let tmpValue = ~~(_gameObj.focusTw.getValue());
                    _gameObj.setTint(Phaser.Display.Color.GetColor(tmpValue, tmpValue, tmpValue));
                }
                else {
                    _gameObj.clearTint();
                    _gameObj.focusTw.remove();
                }
            }
        });
    }
    clearFocus(_gameObj) {
        let tmpObj = undefined;
        (_gameObj) ? (tmpObj = _gameObj) : (tmpObj = this.focusConfig.gameObj);
        // (tmpObj.focusTw) ? this.tryCatchFlow(tmpObj.focusTw.remove) : null;
        tmpObj.setAlpha(1); // temp (should be set alpha to saved alpha value)
        // tmpObj.clearTint();
        tmpObj.isFocusOnGUI = false;
    }
    setPointerOver(_gameObj) {
        _gameObj.setAlpha(0.7);
        this.folder.setBasicOverFolder(_gameObj);
    }
    clearPointerOver(_gameObj) {
        (_gameObj.isTinted) ? _gameObj.clearTint() : null;
        _gameObj.setAlpha(1); // temp (should be set alpha to saved alpha value)
        this.folder.setBasicOverFolder();
    }
    setStoreConfig(_folderType, _gameObj) {
        let tmpFolder = undefined;
        let tmpFocus = undefined;
        if (_folderType === 'BASIC') {
            tmpFolder = this.folder.basic;
            tmpFocus = tmpFolder.tmpStorage.Obj.over;
        }
        else if (_folderType === 'CUSTOM') {
            tmpFolder = this.folder.custom;
            tmpFocus = tmpFolder.tmpStorage.Obj.focus;
        }
        else {}
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

    destroy() {
        this.libs.lib.destroy();
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
