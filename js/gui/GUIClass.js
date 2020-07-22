
"use strict";

// debug console utils
import { DebugSceneNAllDisplayList } from '../utils/DebugConsoleFunc.js';

export default class GUIClass {
    constructor(_main) {
        this.main = _main;
        this.lib = this.main.libs;
        this.manager = this.main.manager;
        this.objList = undefined; // all game object list
    }
    create(_scene) {
        this.createBasicFolder(_scene, this.manager.folder.getBasicFolder());
        this.createFocusFolder(_scene);
    }

    createBasicFolder(_scene, _basic) { // create basic pointer
        let tmpAllConsole = {};
        tmpAllConsole.CONSOLE_CLEAR = () => {
            console.clear();
            this.main.initConsole(this.lib.getGUIcssObj());
        }
        tmpAllConsole.SCENE_LIST = DebugSceneNAllDisplayList.bind(_scene),
        tmpAllConsole.DEFAULT_CAM = this.manager.camera.set2defaultZoom.bind(this.manager.camera);
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
            this.manager.debugBox.clearFocus();
            this.manager.folder.setBasicFocusFolder();
            this.manager.debugBox.clearFocusGameObj();
        }
        // cross2FocusObj
        let tmpGo2ThisFunc = () => {
            this.manager.folder.cross2FocusObj(this.manager.debugBox.getFocusGameObj(), this.objList);
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
        this.lib.addFolderInBasic(_basic);
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

        this.manager.folder.push2FolderList(tmpPointer, 'basic');
        this.manager.folder.push2FolderList(tmpObj, 'basic');
    }
    createFocusFolder(_scene) {
        let tmpDisplayList = _scene.children;
        this.objList = tmpDisplayList.list;
        this.manager.typeSort.createFocusFolder(this.objList);
    }

    // destroy GUI when restart Phaser.Scene
    destroyGUI() {
        this.lib.destroyGUI();
    }
    tryCatchFlow(_function) {
        try {
            _function();
        }
        catch(e) {}
    }
}
