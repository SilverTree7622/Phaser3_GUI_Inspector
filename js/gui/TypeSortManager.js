
import AnimListManager from './AnimListManager.js';

// sort obj type, pointer over properties
export default class TypeSortManager {
    constructor(_scene) {
        this.conAlert = '_PGI System_ :';
        this.timeKey = '_PGI CntEnd_ ';
        this.objLength = 0;
        this.animListManager = new AnimListManager(_scene);
    }

    // EXTERNAL
    // get scene then set list to form gui set up
    createFocusFolder(_objList, _folder, _debugBox, _DebugGetThisConsole) {
        let tmpLength = _objList.length;
        for (var i=0; i<tmpLength; i++) {
            this.createFocusFolderTryException(_objList, _objList[i], _folder, _debugBox, _DebugGetThisConsole);
            this.createFocusFolderSetObj(_objList, _objList[i], _folder, _debugBox, _DebugGetThisConsole);
        }
    }
    createFocusFolderTryException(_objList, _obj, _folder, _debugBox, _DebugGetThisConsole) {
        if (_obj.type !== 'Graphics' &&
            _obj.type !== 'Container') {
            this.createFocusFolderTryExceptionNotContainer(_obj); // set interactive function
        }
        else if (_obj.type === 'Container') {
            // container
            this.createFocusFolderTryExceptionContainer(_objList, _obj, _folder, _debugBox, _DebugGetThisConsole);
        }
        else {
            // console.log('graphics confirm!');
        }
    }
    // if the gameobj is container obj
    createFocusFolderTryExceptionContainer(_objList, _obj, _folder, _debugBox, _DebugGetThisConsole) {
        let tmpList = _obj.list;
        let tmpLength = tmpList.length;
        for (var i=0; i<tmpLength; i++) {
            this.createFocusFolderTryException(tmpList, tmpList[i], _folder, _DebugGetThisConsole);
            this.createFocusFolderSetObj(_objList, tmpList[i], _folder, _debugBox, _DebugGetThisConsole);
        }
    }
    // if the gameobj is NOT container obj
    createFocusFolderTryExceptionNotContainer(_obj) {
        try { _obj.setInteractive(); }
        catch(e) {}
    }

    createFocusFolderSetObj(_objList, _obj, _folder, _debugBox, _DebugGetThisConsole) {
        let tmpGUIIdx = _folder.getGUIIdx();
        _obj.guiIdx = tmpGUIIdx;
        _obj.isFocusOnGUI = false; // focus check boolean
        _obj.focusTw = undefined; // save focus performance tween in this property
        _obj.GUI_BACK = _folder.back2Basic.bind(_folder, tmpGUIIdx);
        _obj.GUI_CONSOLE = _DebugGetThisConsole;
        this.chckParentContainer(_obj, _folder, _objList, tmpGUIIdx, _debugBox);
        this.createCustomInDetail(_obj, _folder, _objList, tmpGUIIdx);
    }
    chckParentContainer(_obj, _folder, _objList, _tmpGUIIdx, _debugBox) {
        // if Parent Container Exist, then implant function
        let tmpPC = _obj.parentContainer;
        if (tmpPC) { // if this object parentContainer is exist
            _obj.GUI_CONTAINER = _folder.closeThisOpenParentContainer.bind(
                _obj, [_tmpGUIIdx, tmpPC, _folder, _debugBox]
            );
        } else {}
    }
    createCustomInDetail(_obj, _folder, _objList, _tmpGUIIdx) {
        let tmpFolderInCustom = _folder.add2CustomFolder();
        this.chckObjType(_folder.getCustomFolder(), _tmpGUIIdx, tmpFolderInCustom, _obj);
    }

    chckObjType(_custom, _idx, _folderInCustom, _obj) { // check each of objs type
        let tmpGameObj = _obj;
        let tmpType = tmpGameObj.type;
        this.chckStartSorting(_idx);
        this.createBackFunc(_idx, _folderInCustom, tmpGameObj);
        this.createConsoleFunc(_idx, _folderInCustom, tmpGameObj);
        this.createContainerFunc(_idx, _folderInCustom, tmpGameObj);
        this.createCommonFront(_folderInCustom, tmpGameObj);
        this.chckPhysicsType(_folderInCustom, tmpGameObj);
        this.createCommonBack(_folderInCustom, tmpGameObj);
        switch (tmpType) {
            case 'Container': this.createContainer(_idx, _folderInCustom, tmpGameObj); break;
            case 'Image': this.createListImage(_idx, _folderInCustom, tmpGameObj); break;
            case 'Sprite': this.createListSprite(_idx, _folderInCustom, tmpGameObj); break;
            case 'Text': this.createListText(_idx, _folderInCustom, tmpGameObj); break;
            case 'TileSprite': this.createTileSprite(_idx, _folderInCustom, tmpGameObj); break;
            case 'ParticleEmitterManager': this.createParticleEmitterManager(_idx, _folderInCustom, tmpGameObj); break;
            // ++ TileMap Stuff
            case 'StaticTilemapLayer': this.createTilemapLayer(_idx, _folderInCustom, tmpGameObj); break;
            // ++ Done
            case 'Spine': this.createSpine(_idx, _folderInCustom, tmpGameObj); break;
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
        // } else {}
    }
    chckEndSorting(_idx) {
        // if (_idx === this.objLength) {
        //     console.log(this.conAlert, 'END CUSTOM SORTING');
        //     console.timeEnd(this.timeKey)
        //     console.log(this.conAlert, 'DISPLAY LENGTH IS', this.objLength + 1);
        // } else {}
    }

    createBackFunc(_idx, _folderInCustom, _gameObj) { // create back 2 basic function
        _folderInCustom.add(_gameObj, 'GUI_BACK');
    }
    createConsoleFunc(_idx, _folderInCustom, _gameObj) {
        _folderInCustom.add(_gameObj, 'GUI_CONSOLE');
    }
    createContainerFunc(_idx, _folderInCustom, _gameObj) {
        if (_gameObj.GUI_CONTAINER) {
            _folderInCustom.add(_gameObj, 'GUI_CONTAINER');
        } else {}
    }
    createCommonFront(_folderInCustom, _gameObj) {
        // set properties (GUIIdx, name, type)
        this.tryCatch(_folderInCustom, _gameObj, 'GUIIdx');
        this.tryCatch(_folderInCustom, _gameObj, 'name');
        this.tryCatch(_folderInCustom, _gameObj, 'type');
    }
    // check body is arcade or matter
    chckPhysicsType(_folderInCustom, _gameObj) {
        let tmpType = (_gameObj.body) ? true : false;
        if (tmpType === true) { // if body exist
            let tmpStr = _gameObj.type; // check type
            let tmpBodyType = typeof _gameObj.body.type; // check body type
            let tmpObj = undefined;
            switch (tmpBodyType) {
                case 'string': // matter
                    tmpObj = {type: 'Matter ' + tmpStr};
                    _folderInCustom.add(tmpObj, 'type');
                    this.createMatterBody(_folderInCustom, _gameObj);
                break;
                case 'number': // impact
                    tmpObj = {type: 'Impact ' + tmpStr};
                    _folderInCustom.add(tmpObj, 'type');
                break;
                default: // arcade
                    tmpObj = {type: 'Arcade ' + tmpStr};
                    _folderInCustom.add(tmpObj, 'type');
                    this.createArcadeBody(_folderInCustom, _gameObj);
                break;
            }
        }
    }
    createCommonBack(_folderInCustom, _gameObj) {
        this.tryCatch(_folderInCustom, _gameObj, 'x');
        this.tryCatch(_folderInCustom, _gameObj, 'y');
        this.tryCatch(_folderInCustom, _gameObj, 'width');
        this.tryCatch(_folderInCustom, _gameObj, 'height');
        this.tryCatch(_folderInCustom, _gameObj, 'alpha');
        this.tryCatch(_folderInCustom, _gameObj, 'depth');
        this.tryCatch(_folderInCustom, _gameObj, 'angle');
        this.tryCatch(_folderInCustom, _gameObj, 'rotation');
        this.tryCatch(_folderInCustom, _gameObj, 'visible');
        this.tryCatch(_folderInCustom, _gameObj, 'originX');
        this.tryCatch(_folderInCustom, _gameObj, 'originY');
        this.tryCatch(_folderInCustom, _gameObj, 'active');
    }



    createContainer(_idx, _folderInCustom, _gameObj) {
        // console.log('CONTAINER type:', _gameObj);
        this.tryCatch(_folderInCustom, _gameObj, 'exclusive');
        this.tryCatch(_folderInCustom, _gameObj, 'position');
        this.tryCatch(_folderInCustom, _gameObj, 'scrollFactorX');
        this.tryCatch(_folderInCustom, _gameObj, 'scrollFactorY');
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
    createListImage(_idx, _folderInCustom, _gameObj) {
        // also check what type of Physics
        // console.log('IMAGE type:', _gameObj);
        this.chckEndSorting(_idx);
    }
    createListSprite(_idx, _folderInCustom, _gameObj) {
        // console.log('SPRITE type:', _gameObj);
        this.tryCatch(_folderInCustom, _gameObj.texture, 'originX');
        this.tryCatch(_folderInCustom, _gameObj.texture, 'originY');
        this.createAnims(_idx, _folderInCustom, _gameObj);
        this.chckEndSorting(_idx);
    }
    createListText(_idx, _folderInCustom, _gameObj) {
        // console.log('TEXT type:', _gameObj);
        _folderInCustom.add(_gameObj, 'text').listen();
        this.chckEndSorting(_idx);
    }
    createGraphics(_idx, _folderInCustom, _gameObj) {
        // console.log('GRAPHICS type:', _gameObj);
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
        // console.log('TileSprite type:', _gameObj);
        this.tryCatch(_folderInCustom, _gameObj, 'tilePositionX');
        this.tryCatch(_folderInCustom, _gameObj, 'tilePositionY');
        this.tryCatch(_folderInCustom, _gameObj, 'tileScaleX');
        this.tryCatch(_folderInCustom, _gameObj, 'tileScaleY');
        this.tryCatch(_folderInCustom, _gameObj, 'tabIndex');
        // // tile crop
        // let tmpCrop = _folderInCustom.addFolder('_crop');
        // tmpCrop.open();
        // for (var tmpProperty in _gameObj._crop) {
        //     this.tryCatch(tmpCrop, _gameObj._crop, tmpProperty);
        // }
        this.chckEndSorting(_idx);
    }
    createParticleEmitterManager(_idx, _folderInCustom, _gameObj) {
        // console.log('ParticleEmitter type:', _gameObj);
        this.chckEndSorting(_idx);
    }
    createTilemapLayer(_idx, _folderInCustom, _gameObj) {
        // console.log('TilemapLayer type:', _gameObj);
        this.chckEndSorting(_idx);
    }
    createSpine(_idx, _folderInCustom, _gameObj) {
        // console.log('Spine type:', _gameObj);
        this.chckEndSorting(_idx);
    }
    createMatterBody(_folderInCustom, _gameObj) {
        this.tryCatch(tmpBody, _gameObj.body, 'id');
        this.tryCatch(tmpBody, _gameObj.body, 'type');
        this.tryCatch(tmpBody, _gameObj.body, 'label');
        this.createAllThePropertyOfObj(_folderInCustom, 'position', _gameObj.body.position);
        this.createAllThePropertyOfObj(_folderInCustom, 'force', _gameObj.body.force);

    }
    createArcadeBody(_folderInCustom, _gameObj) {
        let tmpOffset = undefined;
        let tmpBody = _folderInCustom.addFolder('body');
        tmpBody.open();
        this.createCommonBack(tmpBody, _gameObj);
        this.tryCatch(tmpBody, _gameObj.body, 'allowRotation');
        this.tryCatch(tmpBody, _gameObj.body, 'debugShowBody');
        this.tryCatch(tmpBody, _gameObj.body, 'debugShowVelocity');
        this.tryCatch(tmpBody, _gameObj.body, 'debugBodyColor');
        this.tryCatch(tmpBody, _gameObj.body, 'onWorldBounds');
        this.tryCatch(tmpBody, _gameObj.body, 'allowDrag');
        this.tryCatch(tmpBody, _gameObj.body, 'allowGravity');
        this.tryCatch(tmpBody, _gameObj.body, 'onCollide');
        this.tryCatch(tmpBody, _gameObj.body, 'onOverlap');
        this.tryCatch(tmpBody, _gameObj.body, 'enable');
        this.tryCatch(tmpBody, _gameObj.body, 'isCircle');
        
        tmpOffset = tmpBody.addFolder('offset');
        tmpOffset.open();
        this.tryCatch(tmpOffset, _gameObj.body.offset, 'x');
        this.tryCatch(tmpOffset, _gameObj.body.offset, 'y');
    }

    createAnims(_idx, _folderInCustom, _gameObj) { // create anims property folder
        let tmpAnimPlay = {};
        // tmpAnimPlay.play = this.animListManager.playFunc.bind(this.animListManager, []);
        // function CONSOLEOUT() {
        //     return console.log('play function press');
        // }
        // tmpAnimPlay.play = CONSOLEOUT();
        let tmpAnims = _folderInCustom.addFolder('anims');
        tmpAnims.open();
        // play animation
        // ++ add play list for array
        tmpAnims.add(_gameObj.anims, 'play', this.animListManager.getList());
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
        tmpFolder.open();
        for (var tmpProperty in tmpFolder) {
            this.tryCatch(tmpFolder, _listenObj, tmpProperty);
        }
    }
    tryCatch(_guiObj, _obj, _property, _cmd, _customFunction) {
        let tmpAddFunc = undefined;
        try { tmpAddFunc = _guiObj.add(_obj, _property); } catch(e) {};
        if (tmpAddFunc) {
            switch (_cmd) {
                // default is listen() function
                case null:
                case undefined:
                case 'listen':
                    tmpAddFunc.listen();
                break;
                // onChange
                case 'onChange':
                    if (_customFunction) {
                        tmpAddFunc.onChange(_customFunction);
                    } else {}
                break;
                default:
                    console.log(_cmd, '<= this is not on the options');
                break;
            }
        } else {}
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

