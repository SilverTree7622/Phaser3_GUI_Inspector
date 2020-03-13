
import AnimListManager from './AnimListManager.js';

// sort obj type, pointer over properties
export default class TypeSortManager {
    constructor(_scene) {
        this.conAlert = '_PGI System_ :';
        this.timeKey = '_PGI CntEnd_ ';
        this.objLength = 0;
        this.animList = new AnimListManager(_scene);
    }

    // EXTERNAL
    // get scene then set list to form gui set up
    createListInteractive(_objList, _folder, _DebugConsoleLogOut) {
        let tmpLength = _objList.length;
        for (var i=0; i<tmpLength; i++) {
            this.createListInteractiveTryException(_objList, i, _objList[i], _folder, _DebugConsoleLogOut);
            this.createListInteractiveSetObj(_objList, i, _objList[i], _folder, _DebugConsoleLogOut);
        }
    }
    createListInteractiveTryException(_objList, _idx, _obj, _folder, _DebugConsoleLogOut) {
        if (_obj.type !== 'Graphics' &&
            _obj.type !== 'Container') {
            this.createListInteractiveTryExceptionNotContainer(_obj); // set interactive function
        }
        else if (_obj.type === 'Container') {
            // container
            this.createListInteractiveTryExceptionContainer(_objList, _idx, _obj, _folder, _DebugConsoleLogOut);
        }
        else {
            // console.log('graphics confirm!');
        }
    }
    // if the gameobj is container obj
    createListInteractiveTryExceptionContainer(_objList, _idx, _obj, _folder, _DebugConsoleLogOut) {
        let tmpList = _obj.list;
        console.log('tmpList:', tmpList);
        // add & custom container property
        this.createListInteractiveSetObj(_objList, _idx, _obj, _folder, _DebugConsoleLogOut);
        // chck this container list for nested container or just another game objects
        this.createListInteractiveInContainer(tmpList, _objList, _idx, _obj, _folder, _DebugConsoleLogOut);
    }
    // if the gameobj is NOT container obj
    createListInteractiveTryExceptionNotContainer(_obj) {
        try { _obj.setInteractive(); }
        catch(e) {}
    }

    // custom
    createListInteractiveInContainer(tmpList, _objList, _folder, _DebugConsoleLogOut) {
        let tmpLength = _objList.length;
        for (var i=0; i<tmpLength; i++) {
            this.createListInteractiveTryException(_objList, i, _objList[i], _folder, _DebugConsoleLogOut);
            this.createListInteractiveSetObj(_objList, i, _objList[i], _folder, _DebugConsoleLogOut);
        }
    }
    // custom
    
    createListInteractiveSetObj(_objList, _idx, _obj, _folder, _DebugConsoleLogOut) {
        console.log('_idx:', _idx);
        _obj.isFocusOnGUI = false; // focus check boolean
        _obj.focusTw = undefined; // save focus performance tween in this property
        _obj.GUI_BACK = _folder.back2Basic.bind(_folder, _idx);
        _obj.GUI_CONSOLE = _DebugConsoleLogOut;
        this.chckParentContainer(_objList, _idx, _obj, _folder);
    }
    chckParentContainer(_objList, _idx, _obj, _folder) {
        // if Parent Container Exist, then implant function
        let tmpPC = _obj.parentContainer;
        if (tmpPC) {
            let tmpGUIIdx = (_objList.length - 1) + _idx; // attach index number to objList total length
            console.log('tmpGUIIdx:', tmpGUIIdx);
            _obj.guiIdx = tmpGUIIdx; // typical GUI index
            _obj.GUI_CONTAINER = _folder.closeThisOpenParentContainer.bind(
                _folder, [tmpGUIIdx, tmpPC.guiIdx]
            );
            this.push2ObjList(_objList, _obj);
        }
        // if Parent Container null
        else {
            _obj.guiIdx = _idx; // typical GUI index
        }
    }
    push2ObjList(_objList, _obj) {
        // _objList.push(_obj); // add list to can create each obj folder
    }
    
    // EXTERNAL: sorting
    chckObjType(_custom, _idx, _folderInCustom, _objList) { // check each of objs type
        let tmpGameObj = _objList[_idx];
        let tmpType = tmpGameObj.type;
        this.chckStartSorting(_idx, _objList.length);
        this.createBack2BasicFunc(_idx, _folderInCustom, tmpGameObj);
        this.createConsoleLogOut(_idx, _folderInCustom, tmpGameObj);
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
    chckStartSorting(_idx, _length) {
        if (_idx === 0) {
            console.log(this.conAlert, 'START CUSTOM SORTING');
            console.time(this.timeKey);
            this.objLength = _length - 1;
        } else {}
    }
    chckEndSorting(_idx) {
        if (_idx === this.objLength) {
            console.log(this.conAlert, 'END CUSTOM SORTING');
            console.timeEnd(this.timeKey)
            console.log(this.conAlert, 'DISPLAY LENGTH IS', this.objLength + 1);
        } else {}
    }

    createBack2BasicFunc(_idx, _folderInCustom, _gameObj) { // create back 2 basic function
        _folderInCustom.add(_gameObj, 'GUI_BACK');
    }
    createConsoleLogOut(_idx, _folderInCustom, _gameObj) {
        _folderInCustom.add(_gameObj, 'GUI_CONSOLE');
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
        _folderInCustom.add(_gameObj, 'name');
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
    createParticleEmitterManager() {
        // console.log('ParticleEmitter type:', _gameObj);
        this.chckEndSorting(_idx);
    }
    createTilemapLayer() {
        // console.log('TilemapLayer type:', _gameObj);
        this.chckEndSorting(_idx);
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
    // chckPhysicsBody(_folderInCustom, _gameObj) {
    //     let tmpType = (_gameObj.body) ? true : false;
    //     if (tmpType) { // arcade image
    //         let tmpOffset = undefined;
    //         let tmpBody = _folderInCustom.addFolder('body');
    //         tmpBody.open();
    //         this.tryCatch(tmpBody, _gameObj.body, 'x');
    //         this.tryCatch(tmpBody, _gameObj.body, 'y');
    //         this.tryCatch(tmpBody, _gameObj.body, 'width');
    //         this.tryCatch(tmpBody, _gameObj.body, 'height');
    //         this.tryCatch(tmpBody, _gameObj.body, 'angle');
    //         this.tryCatch(tmpBody, _gameObj.body, 'allowRotation');
    //         this.tryCatch(tmpBody, _gameObj.body, 'rotation');
    //         this.tryCatch(tmpBody, _gameObj.body, 'debugShowBody');
    //         this.tryCatch(tmpBody, _gameObj.body, 'debugShowVelocity');
    //         this.tryCatch(tmpBody, _gameObj.body, 'debugBodyColor');
    //         this.tryCatch(tmpBody, _gameObj.body, 'onWorldBounds');
    //         this.tryCatch(tmpBody, _gameObj.body, 'allowDrag');
    //         this.tryCatch(tmpBody, _gameObj.body, 'allowGravity');
    //         this.tryCatch(tmpBody, _gameObj.body, 'onCollide');
    //         this.tryCatch(tmpBody, _gameObj.body, 'onOverlap');
    //         this.tryCatch(tmpBody, _gameObj.body, 'enable');
    //         this.tryCatch(tmpBody, _gameObj.body, 'isCircle');
            
    //         tmpOffset = tmpBody.addFolder('offset');
    //         tmpOffset.open();
    //         this.tryCatch(tmpOffset, _gameObj.body.offset, 'x');
    //         this.tryCatch(tmpOffset, _gameObj.body.offset, 'y');
            
    //     }
    // }
    createCommonFront(_folderInCustom, _gameObj) {
        // set properties (GUIIdx, name, type)
        this.tryCatch(_folderInCustom, _gameObj, 'GUIIdx');
        this.tryCatch(_folderInCustom, _gameObj, 'name');
        this.tryCatch(_folderInCustom, _gameObj, 'type');
    }
    // findVarNameLogic
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
    createAnims(_idx, _folderInCustom, _gameObj) { // create anims property folder
        let tmpAnims = _folderInCustom.addFolder('anims');
        tmpAnims.open();
        // play animation
        // this.tryCatch(tmpAnims, _gameObj.anims, 'play');
        tmpAnims.add(_gameObj.anims, 'play', this.animList.getKeyListObj());
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

