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
import InputManager from './InputManager.js';
import FolderManager from './FolderManager.js';
import SaveManager from './SaveManager.js';
import DebugBoxClass from './DebugBoxClass.js';


export class GUIClass {
    constructor(_tmpHandOverObj) {
        // Lib class & init stuff
        this.libs = new LibClass(_tmpHandOverObj.css);
        this.scene = undefined;
        this.objList = undefined; // all game object list
        this.conAlert = '_PGI System_ :';
        this.initConsole(this.libs.getGUIcssObj());
        // Manager class
        this.typeSort = new TypeSortManager(_tmpHandOverObj.scene);
        this.folder = new FolderManager(this.libs.getGUILib(), this.typeSort);
        this.save = new SaveManager();
        this.debugBox = new DebugBoxClass();
        this.input = new InputManager();
    }
    create(_scene) {
        this.createETCClass(_scene);
        this.createBasicFolder(_scene, this.libs, this.folder, this.folder.getBasicFolder(), this.debugBox, this.input);
        this.createFocusFolder(_scene, this.input.getCursorKey(), this.debugBox, this.folder, this.typeSort);
        this.folder.chckOpenAllList();
    }
    createETCClass(_scene) {
        this.folder.create(_scene);
        this.save.create(_scene);
        this.debugBox.create(_scene, this.input);
        this.input.create(_scene, this.debugBox, this.folder);
    }
    update(_time, _delta) {
        this.debugBox.update(_time, _delta);
        this.input.update();
    }


    initConsole(_cssObj) {
        let tmpName = ' PGInspector.js';
        let tmpVersion = '1.2.0';
        let tmpURL = 'https://github.com/SilverTree7622/Phaser3_GUI_Inspector';
        DebugConsole({
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
    createBasicFolder(_scene, _lib, _folder, _basic, _debugBox, _input) { // create basic pointer
        let tmpAllConsole = {};
        tmpAllConsole.CONSOLE_CLEAR = () => {
            console.clear();
            this.initConsole(this.libs.getGUIcssObj(), DebugConsole);
        }
        tmpAllConsole.SCENE_LIST = DebugSceneNAllDisplayList.bind(_scene),
        tmpAllConsole.DEFAULT_CAM = _input.set2defaultZoom.bind(_input);
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
        _basic.add(tmpAllConsole, 'CONSOLE_CLEAR');
        _basic.add(tmpAllConsole, 'SCENE_LIST');
        _basic.add(tmpAllConsole, 'DEFAULT_CAM');
        _lib.addFolderInBasic(_basic);
        tmpPointer = _basic.addFolder('Pointer');
        tmpPointer.add(_scene.input, 'x').min(0).max(tmpXY.x).listen();
        tmpPointer.add(_scene.input, 'y').min(0).max(tmpXY.y).listen();
        tmpPointer.add(_scene.cameras.main, 'zoom').min(0.1).listen();
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
    createFocusFolder(_scene, _cursorKey, _debugBox, _folder, _typeSort) {
        let tmpDisplayList = undefined;
        tmpDisplayList = _scene.children;
        this.objList = tmpDisplayList.list;
        _typeSort.createFocusFolder(this.objList, _folder, _debugBox);
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
