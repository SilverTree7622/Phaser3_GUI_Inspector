
import { DebugGetThisConsole } from '../utils/DebugConsoleFunc.js';
import SrcManager from './SrcManager.js';

// sort obj type, pointer over properties
export default class TypeSortManager {
    constructor(_scene) {
        this.conAlert = '_PGI System_ :';
        this.timeKey = '_PGI CntEnd_ ';
        this.objLength = 0;
        this.srcObj = new SrcManager(_scene);
        // class objs
        this.scene = _scene;
        this.folder;
        this.debugBox;
        this.input;
        this.camera;
    }
    create(_guiClass) {
        this.createInitClassObjs(_guiClass);   
    }

    // EXTERNAL
    // get scene then set list to form gui set up
    createInitClassObjs(_guiClass) {
        this.folder = _guiClass.folder;
        this.debugBox = _guiClass.debugBox;
        this.input = _guiClass.input;
        this.camera = _guiClass.camera;
    }
    createFocusFolder(_objList) {
        let tmpLength = _objList.length;
        for (var i=0; i<tmpLength; i++) {
            this.createFocusFolderTryException(_objList, _objList[i]);
            this.createFocusFolderSetObj(_objList, _objList[i]);
        }
    }
    createFocusFolderTryException(_objList, _obj) {
        if (_obj.type !== 'Graphics' &&
            _obj.type !== 'Container') {
            this.createFocusFolderTryExceptionNotContainer(_obj); // set interactive function
        }
        else if (_obj.type === 'Container') {
            // container
            this.createFocusFolderTryExceptionContainer(_objList, _obj);
        }
        else {
            // console.log('graphics confirm!');
        }
    }
    // if the gameobj is container obj
    createFocusFolderTryExceptionContainer(_objList, _obj) {
        let tmpList = _obj.list;
        let tmpLength = tmpList.length;
        for (var i=0; i<tmpLength; i++) {
            this.createFocusFolderTryException(tmpList, tmpList[i]);
            this.createFocusFolderSetObj(_objList, tmpList[i]);
        }
    }
    // if the gameobj is NOT container obj
    createFocusFolderTryExceptionNotContainer(_obj) {
        try { _obj.setInteractive(); }
        catch(e) {}
    }

    createFocusFolderSetObj(_objList, _obj) {
        let tmpGUIIdx = this.folder.getGUIIdx();
        let tmpObjs = {};
        tmpObjs.input = this.input;
        tmpObjs.scene = this.scene;
        tmpObjs.debugBox = this.debugBox;
        tmpObjs.folder = this.folder;
        tmpObjs.camera = this.camera;
        _obj.guiIdx = tmpGUIIdx;
        _obj.isFocusOnGUI = false; // focus check boolean
        _obj.focusTw = undefined; // save focus performance tween in this property
        _obj.GUI_BACK = this.folder.back2Basic.bind(this.folder, tmpGUIIdx);
        _obj.GUI_FOCUS_ONOFF = function () {
            // focus off => on logic so activate function like focused
            if (!this.isFocusOnGUI) {
                tmpObjs.folder.cross2FocusObj(this);
            }
            tmpObjs.input.runFocusLogic.call(
                tmpObjs.input, tmpObjs.scene, this, tmpObjs.debugBox, tmpObjs.folder, tmpObjs.camera
            );
        }
        _obj.GUI_CONSOLE = DebugGetThisConsole;
        this.chckParentContainer(_obj, _objList, tmpGUIIdx);
        this.createCustomInDetail(_obj, _objList, tmpGUIIdx);
    }
    chckParentContainer(_obj, _objList, _tmpGUIIdx) {
        // if Parent Container exist, then insert the function
        let tmpPC = _obj.parentContainer;
        if (tmpPC) { // if this object parentContainer is exist
            _obj.GUI_CONTAINER = this.folder.closeThisNopenParentContainer.bind(
                _obj, [_tmpGUIIdx, tmpPC, this.folder, this.debugBox]
            );
        }
    }
    createCustomInDetail(_obj, _objList, _tmpGUIIdx) {
        let tmpFolderInCustom = this.folder.add2CustomFolder();
        this.chckObjType(this.folder.getCustomFolder(), _tmpGUIIdx, tmpFolderInCustom, _obj);
    }

    chckObjType(_custom, _idx, _folderInCustom, _obj) { // check each of objs type
        let tmpGameObj = _obj;
        let tmpType = tmpGameObj.type;

        this.chckStartSorting(_idx);
        // BACK, FOCUS TOGGLE, CONSOLE
        this.createBackFunc(_idx, _folderInCustom, tmpGameObj);
        this.createFocusToggle(_folderInCustom, tmpGameObj);
        this.createConsoleFunc(_idx, _folderInCustom, tmpGameObj);
        // chck container exist & other stuffs
        this.createContainerFunc(_idx, _folderInCustom, tmpGameObj);
        this.createCommonFront(_folderInCustom, tmpGameObj);
        this.chckNCreatePhysicsType(_folderInCustom, tmpGameObj);

        // set each specific type properties
        switch (tmpType) {
            case 'Container': this.createContainer(_idx, _folderInCustom, tmpGameObj); break;
            case 'Image': this.createListImage(_idx, _folderInCustom, tmpGameObj, this.srcObj); break;
            case 'Sprite': this.createListSprite(_idx, _folderInCustom, tmpGameObj, this.srcObj); break;
            case 'Text': this.createListText(_idx, _folderInCustom, tmpGameObj); break;
            case 'TileSprite': this.createTileSprite(_idx, _folderInCustom, tmpGameObj); break;
            case 'ParticleEmitterManager': this.createParticleEmitterManager(_idx, _folderInCustom, tmpGameObj); break;
            // ++ TileMap Stuff
            case 'StaticTilemapLayer': this.createTilemapLayer(_idx, _folderInCustom, tmpGameObj); break;
            // ++ Spine
            case 'Spine': this.createSpine(_idx, _folderInCustom, tmpGameObj); break;
            // ++ Group
            case 'Group': this.createGroup(_idx, _folderInCustom, tmpGameObj); break;
            case 'Graphics': this.createGraphics(_idx, _folderInCustom, tmpGameObj); break;
            case 'Arc': // WTF is Arc????
                this.chckEndSorting(_idx);
                console.log('Arc:', tmpGameObj);
                // this.createAracdeBodySprite(_idx, _folderInCustom, tmpGameObj);
                break;
            // + ETC
            default:
                this.chckEndSorting(_idx);
                console.warn(tmpType, '<= this is not on the type or not yet updated type options');
                break;
        }
    }
    chckStartSorting(_idx) {
        // if (_idx === 0) {
        //     console.log(this.conAlert, 'START CUSTOM SORTING');
        //     console.time(this.timeKey);
        //     this.objLength = _length - 1;
        // }
    }
    chckEndSorting(_idx) {
        // if (_idx === this.objLength) {
        //     console.log(this.conAlert, 'END CUSTOM SORTING');
        //     console.timeEnd(this.timeKey)
        //     console.log(this.conAlert, 'DISPLAY LENGTH IS', this.objLength + 1);
        // }
    }

    createBackFunc(_idx, _folderInCustom, _gameObj) { // create back 2 basic function
        _folderInCustom.add(_gameObj, 'GUI_BACK');
    }
    createFocusToggle(_folderInCustom, _gameObj) {
        if (_gameObj.type !== 'Graphics') {
            _folderInCustom.add(_gameObj, 'GUI_FOCUS_ONOFF');
        }
    }
    createConsoleFunc(_idx, _folderInCustom, _gameObj) {
        try { _folderInCustom.add(_gameObj, 'GUI_CONSOLE'); }
        catch(e) {}
    }
    createContainerFunc(_idx, _folderInCustom, _gameObj) {
        if (_gameObj.GUI_CONTAINER) {
            _folderInCustom.add(_gameObj, 'GUI_CONTAINER');
        }
    }
    createCommonFront(_folderInCustom, _gameObj) {
        // set properties (GUIIdx, name, type)
        this.tryCatch(_folderInCustom, _gameObj, 'GUIIdx');
        this.tryCatch(_folderInCustom, _gameObj, 'name');
    }
    // check body is arcade or matter
    chckNCreatePhysicsType(_folderInCustom, _gameObj) {
        let tmpType = (_gameObj.body) ? true : false;
        if (tmpType === true) { // chck if body exist
            let tmpStr = _gameObj.type; // check type
            let tmpBodyType = typeof _gameObj.body.type; // check body type
            let tmpObj = undefined;
            switch (tmpBodyType) {
                case 'string': // matter
                    tmpObj = {type: 'Matter ' + tmpStr};
                    _folderInCustom.add(tmpObj, 'type');
                    this.createCommonBack(_folderInCustom, _gameObj);
                    this.createMatterBody(_folderInCustom, _gameObj);
                break;
                case 'number': // impact
                    tmpObj = {type: 'Impact ' + tmpStr};
                    _folderInCustom.add(tmpObj, 'type');
                    this.createCommonBack(_folderInCustom, _gameObj);
                break;
                default: // arcade
                    tmpObj = {type: 'Arcade ' + tmpStr};
                    _folderInCustom.add(tmpObj, 'type');
                    this.createCommonBack(_folderInCustom, _gameObj);
                    this.createArcadeBody(_folderInCustom, _gameObj);
                break;
            }
        }
        // chck if body is not exist, just set normal type
        else {
            this.tryCatch(_folderInCustom, _gameObj, 'type');
            this.createCommonBack(_folderInCustom, _gameObj);
        }
    }
    createCommonBack(_folderInCustom, _gameObj) {
        this.tryCatch(_folderInCustom, _gameObj, 'x', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'y', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'width', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'height', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'scaleX', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'scaleY', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'originX', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'originY', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'alpha', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'depth');
        this.tryCatch(_folderInCustom, _gameObj, 'angle', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'rotation', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'visible');
        this.tryCatch(_folderInCustom, _gameObj, 'active');
    }
    createContainer(_idx, _folderInCustom, _gameObj) {
        this.tryCatch(_folderInCustom, _gameObj, 'exclusive');
        this.tryCatch(_folderInCustom, _gameObj, 'position', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'scrollFactorX', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'scrollFactorY', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'z');
        this.tryCatch(_folderInCustom, _gameObj, 'w');
        
        let tmpList = _folderInCustom.addFolder('list');
        tmpList.open();
        tmpList.add(_gameObj.list, 'length');
        for (var i=0; i<_gameObj.list.length; i++) {
            this.tryCatch(tmpList, _gameObj.list, i);
        }

        this.chckEndSorting(_idx);
    }
    createListImage(_idx, _folderInCustom, _gameObj, _srcObj) {
        // also check what type of Physics
        this.createTextureNFrame(_idx, _folderInCustom, _gameObj, _srcObj);
        this.chckEndSorting(_idx);
    }
    createListSprite(_idx, _folderInCustom, _gameObj, _srcObj) {
        this.tryCatch(_folderInCustom, _gameObj.texture, 'originX');
        this.tryCatch(_folderInCustom, _gameObj.texture, 'originY');
        this.createTextureNFrame(_idx, _folderInCustom, _gameObj, _srcObj);
        this.createAnims(_idx, _folderInCustom, _gameObj);
        this.chckEndSorting(_idx);
    }
    createListText(_idx, _folderInCustom, _gameObj) {
        _folderInCustom.add(_gameObj, 'text').listen();
        this.chckEndSorting(_idx);
    }
    createGraphics(_idx, _folderInCustom, _gameObj) {
        this.tryCatch(_folderInCustom, _gameObj, 'alpha');
        this.tryCatch(_folderInCustom, _gameObj, 'scale');
        this.tryCatch(_folderInCustom, _gameObj, 'angle');
        this.tryCatch(_folderInCustom, _gameObj, 'rotation');
        this.tryCatch(_folderInCustom, _gameObj, 'visible');
        this.tryCatch(_folderInCustom, _gameObj, 'defaultFillColor');
        this.tryCatch(_folderInCustom, _gameObj, 'defaultFillAlpha');
        this.tryCatch(_folderInCustom, _gameObj, 'defaultStrokeWidth');
        this.tryCatch(_folderInCustom, _gameObj, 'defaultStrokeColor');
        this.tryCatch(_folderInCustom, _gameObj, 'defaultStrokeAlpha');
        this.tryCatch(_folderInCustom, _gameObj, '_lineWidth');
        this.tryCatch(_folderInCustom, _gameObj, 'active');

        this.chckEndSorting(_idx);
    }
    createTileSprite(_idx, _folderInCustom, _gameObj) {
        this.tryCatch(_folderInCustom, _gameObj, 'tilePositionX', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'tilePositionY', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'tileScaleX', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'tileScaleY', 'listen');
        this.tryCatch(_folderInCustom, _gameObj, 'tabIndex');
        this.tryCatch(_folderInCustom, _gameObj, 'ignoreDestroy');
        this.tryCatch(_folderInCustom, _gameObj, 'potWidth');
        this.tryCatch(_folderInCustom, _gameObj, 'potHeight');
        this.tryCatch(_folderInCustom, _gameObj, 'scrollFactorX');
        this.tryCatch(_folderInCustom, _gameObj, 'scrollFactorY');
        this.tryCatch(_folderInCustom, _gameObj, 'potHeight');
        // // tile crop
        // let tmpCrop = _folderInCustom.addFolder('_crop');
        // tmpCrop.open();
        // for (var tmpProperty in _gameObj._crop) {
        //     this.tryCatch(tmpCrop, _gameObj._crop, tmpProperty);
        // }
        this.chckEndSorting(_idx);
    }
    createParticleEmitterManager(_idx, _folderInCustom, _gameObj) {
        console.log('particle emitter in typesort');
        this.chckEndSorting(_idx);
    }
    createTilemapLayer(_idx, _folderInCustom, _gameObj) {
        this.chckEndSorting(_idx);
    }
    createSpine(_idx, _folderInCustom, _gameObj) {
        this.chckEndSorting(_idx);
    }
    createGroup(_idx, _folderInCustom, _gameObj) {
        this.chckEndSorting(_idx);
    }
    createMatterBody(_folderInCustom, _gameObj) {
        let tmpBody = _folderInCustom.addFolder('body');
        tmpBody.open();
        this.tryCatch(tmpBody, _gameObj.body, 'id');
        this.tryCatch(tmpBody, _gameObj.body, 'type');
        this.tryCatch(tmpBody, _gameObj.body, 'label');
        this.createAllThePropertyOfObj(tmpBody, 'position', _gameObj.body);
        this.createAllThePropertyOfObj(tmpBody, 'force', _gameObj.body);
        
        this.tryCatch(tmpBody, _gameObj.body, 'speed', 'listen');
        this.tryCatch(tmpBody, _gameObj.body, 'angularSpeed', 'listen');
        this.tryCatch(tmpBody, _gameObj.body, 'angularVelocity', 'listen');
        this.tryCatch(tmpBody, _gameObj.body, 'isSensor');
        this.tryCatch(tmpBody, _gameObj.body, 'isStatic');
        this.tryCatch(tmpBody, _gameObj.body, 'isSleeping');
        this.tryCatch(tmpBody, _gameObj.body, 'sleepThreshold');
        this.tryCatch(tmpBody, _gameObj.body, 'density');
        this.tryCatch(tmpBody, _gameObj.body, 'restitution');
        this.tryCatch(tmpBody, _gameObj.body, 'frictionStatic');
        this.tryCatch(tmpBody, _gameObj.body, 'frictionAir');

        this.tryCatch(tmpBody, _gameObj.body, 'slop');
        this.tryCatch(tmpBody, _gameObj.body, 'mass');
        this.tryCatch(tmpBody, _gameObj.body, 'area');
        this.tryCatch(tmpBody, _gameObj.body, 'inertia');
        this.tryCatch(tmpBody, _gameObj.body, 'inverseInertia');
        this.tryCatch(tmpBody, _gameObj.body, 'chamfer');

        this.tryCatch(tmpBody, _gameObj.body, 'ignoreGravity');
        this.tryCatch(tmpBody, _gameObj.body, 'ignorePointer');
        this.tryCatch(tmpBody, _gameObj.body, 'ignoreDestroy');
    }
    createArcadeBody(_folderInCustom, _gameObj) {
        let tmpBody = _folderInCustom.addFolder('body');
        tmpBody.open();
        this.tryCatch(tmpBody, _gameObj.body, 'debugShowBody');
        this.tryCatch(tmpBody, _gameObj.body, 'debugShowVelocity');
        this.tryCatch(tmpBody, _gameObj.body, 'debugBodyColor');
        this.tryCatch(tmpBody, _gameObj.body, 'onWorldBounds');
        this.tryCatch(tmpBody, _gameObj.body, 'allowDrag');
        this.tryCatch(tmpBody, _gameObj.body, 'allowGravity');
        this.tryCatch(tmpBody, _gameObj.body, 'allowRotation');
        this.tryCatch(tmpBody, _gameObj.body, 'onCollide');
        this.tryCatch(tmpBody, _gameObj.body, 'onOverlap');
        this.tryCatch(tmpBody, _gameObj.body, 'enable');
        this.tryCatch(tmpBody, _gameObj.body, 'isCircle');
        this.createAllThePropertyOfObj(tmpBody, 'offset', _gameObj.body);
        this.createAllThePropertyOfObj(tmpBody, 'position', _gameObj.body);
        this.tryCatch(tmpBody, _gameObj.body, 'sourceWidth', 'listen');
        this.tryCatch(tmpBody, _gameObj.body, 'sourceHeight', 'listen');
        this.tryCatch(tmpBody, _gameObj.body, 'halfWidth', 'listen');
        this.tryCatch(tmpBody, _gameObj.body, 'halfHeight', 'listen');
        this.tryCatch(tmpBody, _gameObj.body, 'angularVelocity', 'listen');
        this.tryCatch(tmpBody, _gameObj.body, 'angularAcceleration', 'listen');
        this.tryCatch(tmpBody, _gameObj.body, 'angularDrag');
        this.tryCatch(tmpBody, _gameObj.body, 'maxAngular');
        this.tryCatch(tmpBody, _gameObj.body, 'mass');
        this.tryCatch(tmpBody, _gameObj.body, 'angle');
        this.tryCatch(tmpBody, _gameObj.body, 'speed');
        this.tryCatch(tmpBody, _gameObj.body, 'facing');
        this.tryCatch(tmpBody, _gameObj.body, 'immovable');
        this.tryCatch(tmpBody, _gameObj.body, 'moves');
        this.tryCatch(tmpBody, _gameObj.body, 'collideWorldBounds');
        this.tryCatch(tmpBody, _gameObj.body, 'syncBounds');
        
    }
    createTextureNFrame(_idx, _folderInCustom, _gameObj, _srcObj) {
        let tmpGameObjTexture = _srcObj.getGameObjTextureKey(_gameObj);
        let tmpTexture = {};
        let tmpFrame = {};
        let tmpT = undefined;
        let tmpF = undefined;
        tmpTexture.textureList = _srcObj.getTextureKeyList();
        tmpTexture.setTexture = () => {
            let tmpKey = tmpT.getValue();
            let tmpW = _gameObj.width;
            let tmpH = _gameObj.height;
            let tmpSX = _gameObj.scaleX;
            let tmpSY = _gameObj.scaleY;
            _gameObj.setTexture(tmpKey);
            _gameObj.setDisplaySize( tmpW * tmpSX, tmpH * tmpSY );
            // change frame list
            let tmpList = _srcObj.getGameObjTextureFrames(_gameObj);
            _srcObj.updateDropdown(tmpF, tmpList);
        }
        tmpFrame.frameList = _srcObj.getGameObjTextureFrames(_gameObj);
        tmpFrame.setFrame = () => {
            let tmpName = tmpF.getValue();
            _gameObj.setFrame(tmpName);
        }
        tmpT = _folderInCustom.add(tmpTexture, 'textureList', tmpTexture.textureList)
        .setValue(tmpGameObjTexture);
        _folderInCustom.add(tmpTexture, 'setTexture');
        tmpF = _folderInCustom.add(tmpFrame, 'frameList', tmpFrame.frameList);
        _folderInCustom.add(tmpFrame, 'setFrame');
    }
    createAnims(_idx, _folderInCustom, _gameObj) { // create anims property folder
        let tmpAnimList = undefined;
        let tmpAnimPlay = {};
        tmpAnimPlay.playList = this.srcObj.getAnimKeyList();
        tmpAnimPlay.play = () => {
            let tmpKey = tmpAnimList.getValue();
            let tmpW = _gameObj.width;
            let tmpH = _gameObj.height;
            let tmpSX = _gameObj.scaleX;
            let tmpSY = _gameObj.scaleY;
            _gameObj.anims.play(tmpKey);
            _gameObj.setDisplaySize( tmpW * tmpSX, tmpH * tmpSY );
        } 
        let tmpAnims = _folderInCustom.addFolder('anims');
        tmpAnims.open();
        // play animation
        tmpAnimList = tmpAnims.add(tmpAnimPlay, 'playList', tmpAnimPlay.playList).setValue(tmpAnimPlay.playList[0]);
        tmpAnims.add(tmpAnimPlay, 'play');
        this.tryCatch(tmpAnims, _gameObj.anims, 'stop');
        this.tryCatch(tmpAnims, _gameObj.anims, 'pause');
        this.tryCatch(tmpAnims, _gameObj.anims, 'resume');
        // etc properties
        this.tryCatch(tmpAnims, _gameObj.anims, 'isPlaying');
        this.tryCatch(tmpAnims, _gameObj.anims, 'currentAnim');
        this.tryCatch(tmpAnims, _gameObj.anims, 'currentFrame');
        this.tryCatch(tmpAnims, _gameObj.anims, 'nextAnim');
        this.tryCatch(tmpAnims, _gameObj.anims, 'duration');
        this.tryCatch(tmpAnims, _gameObj.anims, 'msPerFrame');
        this.tryCatch(tmpAnims, _gameObj.anims, 'skipMissedFrames');
        this.tryCatch(tmpAnims, _gameObj.anims, '_delay');
        this.tryCatch(tmpAnims, _gameObj.anims, '_repeat');
        this.tryCatch(tmpAnims, _gameObj.anims, '_repeatDelay');
        this.tryCatch(tmpAnims, _gameObj.anims, '_yoyo');
        this.tryCatch(tmpAnims, _gameObj.anims, 'forward');
        this.tryCatch(tmpAnims, _gameObj.anims, '_reverse');
        this.tryCatch(tmpAnims, _gameObj.anims, 'accumulator');
        this.tryCatch(tmpAnims, _gameObj.anims, 'nextTick');
        this.tryCatch(tmpAnims, _gameObj.anims, 'repeatCounter');
        this.tryCatch(tmpAnims, _gameObj.anims, 'pendingRepeat');
        this.tryCatch(tmpAnims, _gameObj.anims, '_paused');
        this.tryCatch(tmpAnims, _gameObj.anims, '_wasPlaying');
        this.tryCatch(tmpAnims, _gameObj.anims, '_pendingStop');
    }
    createAllThePropertyOfObj(_folderInCustom, _nameStr, _listenObj) {
        let tmpFolder = _folderInCustom.addFolder(_nameStr);
        let tmpObj = _listenObj[_nameStr];
        tmpFolder.open();
        for (var tmpProperty in tmpObj) {
            this.tryCatch(tmpFolder, _listenObj, tmpProperty);
        }
        return tmpFolder;
    }
    tryCatch(_guiObj, _obj, _property, _cmd, _customFunction) {
        let tmpAddFunc = undefined;
        try { tmpAddFunc = _guiObj.add(_obj, _property); } catch(e) {};
        if (tmpAddFunc) {
            switch (_cmd) {
                case null:
                case undefined:
                break;
                case 'listen':
                    tmpAddFunc.listen();
                break;
                // onChange
                case 'onChange':
                    if (_customFunction) {
                        tmpAddFunc.onChange(_customFunction);
                    }
                break;
                default:
                    console.log(_cmd, '<= this is not on the options');
                break;
            }
        }
    }

    // pointer over texture sorting
    setTextureProperty(_gameObj) {
        let tmpType = _gameObj.type;
        let tmpReturn = undefined;
        switch (tmpType) {
            case 'Image':
            case 'Sprite':
                tmpReturn = _gameObj.texture.key;
                break;
            case 'Text':
                tmpReturn = _gameObj.text;
                break;
            case 'TileSprite':
                tmpReturn = _gameObj.displayTexture.key;
                break;
            case 'Container':
                break;
            case 'Emitter':
            case 'Arc':
                console.log('Arc:', _gameObj);
                break;
            case 'Graphics':
                break;
            default:
                console.log(tmpType, 'this is not on the type or not yet updated type options');
                break;
        }
        return tmpReturn;
    }
}

