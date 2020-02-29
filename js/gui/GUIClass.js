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

import * as dat from './lib/DatGUILib.js'; // import lib
import TypeSortManager from './TypeSortManager.js';
import FolderManager from './FolderManager.js';
import SaveManager from './SaveManager.js';
import DebugBoxClass from './DebugBoxClass.js';

export class GUIClass {
    constructor(_statusManager) {
        this.self = new dat.GUI();
        this.scene = undefined;
        this.objList = undefined; // all game object list
        this.statusManager = this.initChckStatusManager(_statusManager);
        this.overConfig = this.initOverConfig();
        this.focusConfig = this.initFocusConfig();
        this.typeSort = new TypeSortManager();
        this.folder = new FolderManager(this.self, this.typeSort);
        this.save = new SaveManager();
        this.debugBox = new DebugBoxClass();
        this._basic = undefined;
        this._custom = undefined;
    }
    create(_scene) {
        this.createETCClass(_scene);
        this.createList(_scene, this.debugBox, this.folder);
        this.createBasic(_scene, this.folder, this._basic);
        this.createCustom(_scene, this._custom, this.typeSort);
        this.folder.chckOpenAllList();
    }
    createETCClass(_scene) {
        this.folder.create(_scene);
        this._basic = this.folder.getFolder().basic;
        this._custom = this.folder.getFolder().custom;
        this.save.create(_scene);
        this.debugBox.create(_scene);
    }
    update(_time, _delta) {
        this.folder.update(_time, _delta);
        this.debugBox.update(_time, _delta, this.objList);
    }

    initChckStatusManager(_statusManager) {
        let tmpSM;
        if (_statusManager) {
            tmpSM = _statusManager;
            console.log('_inspector SYSTEM_: USING STATUS MANAGER');
        }
        else {
            tmpSM = undefined;
            console.log('_inspector SYSTEM_: NOT USING STATUS MANAGER');
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
            if (this.objList[i].type !== 'Container') {
                this.objList[i].setInteractive();
            }
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
            if (!_gameObj.isFocusOnGUI) {
                this.setPointerOver(_gameObj);
                _debugBox.setOver(_gameObj);
            }
            else {}
        });
        // when out from pointer over obj
        _scene.input.on('gameobjectout', (_pointer, _gameObj) => {
            if (!_gameObj.isFocusOnGUI) { // not focus
                this.clearPointerOver(_gameObj);
                _debugBox.clearOverGameObj();
            }
            else {}
        });
    }
    createListInteractiveFocusEvent(_scene, _debugBox, _folder) {
        // when want to focus logic
        _scene.input.on('gameobjectdown', (_pointer, _gameObj) => {
            // if middle button pressed
            if (!_pointer.rightButtonDown() && !_pointer.leftButtonDown()) {
                if (_gameObj.isFocusOnGUI) { // clear the focus object
                    this.setFocusConfig(true, _gameObj);
                    this.clearFocus(_gameObj);
                    _debugBox.clearFocusGameObj();
                    _folder.setBasicFocusFolder();
                }
                else { // set the focus object
                    if (this.focusConfig.gameObj) { // init focus check
                        this.clearFocus(this.focusConfig.gameObj);
                        this.setFocusConfig(false, undefined);
                        _debugBox.clearFocusGameObj();
                    }
                    // set to this game object
                    this.setFocusConfig(true, _gameObj);
                    this.setFocus(_scene, _gameObj);
                    _debugBox.setFocus(_gameObj);
                    _folder.setBasicFocusFolder(_gameObj);
                }
            }
        });
    }
    setOverConfig(_status, _gameObj) {
        this.overConfig.status = _status;
        this.overConfig.gameObj = _gameObj;
    }
    setFocusConfig(_status, _gameObj) {
        this.focusConfig.status = _status;
        this.focusConfig.gameObj = _gameObj;
    }
    createBasic(_scene, _folder, _basic) { // create basic pointer
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
    createCustom(_scene, _custom, _typeSort) {
        let tmpLength = this.objList.length;
        for (var i=0; i<tmpLength; i++) {
            let tmpFolderInCustom = this.folder.add2CustomFolder(i);
            _typeSort.chckObjType(_custom, i, tmpFolderInCustom, this.objList);
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
                let tmpValue = ~~(_gameObj.focusTw.getValue());
                _gameObj.setTint(Phaser.Display.Color.GetColor(tmpValue, tmpValue, tmpValue));
            }
        });
    }
    clearFocus(_gameObj) {
        let tmpObj = undefined;
        (_gameObj) ? (tmpObj = _gameObj) : (tmpObj = this.focusConfig.gameObj);
        (tmpObj.focusTw) ? tmpObj.focusTw.remove() : null;
        tmpObj.setAlpha(1); // temp (should be set alpha to saved alpha value)
        tmpObj.clearTint();
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
        tmpFocus.guiAlpha = _gameObj.alpha;
        tmpFocus.guiTint = _gameObj.tint;
    }
    clearStoreConfig(_folderType) {
        if (_folderType === 'BASIC') {

        }
        else if (_folderType === 'CUSTOM') {

        }
        else {

        }
    }

    // WARNING THIS IS TRIAL: config
    saveConfig() {

    }
    loadConfig() {

    }
}
