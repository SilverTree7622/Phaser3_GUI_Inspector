
import AnimListManager from './AnimListManager.js';

// sort obj type, pointer over properties
export default class TypeSortManager {
    constructor(_scene) {
        this.conAlert = '_PGI System_ :';
        this.timeKey = '_PGI CntEnd_ ';
        this.objLength = 0;
        this.animList = new AnimListManager(_scene);
    }

    // _EXTERNAL_
    chckObjType(_custom, _idx, _folderInCustom, _objList) { // check each of objs type
        let tmpGameObj = _objList[_idx];
        let tmpType = tmpGameObj.type;
        this.createBack2BasicFunc(_idx, _folderInCustom, tmpGameObj);
        this.chckStartSorting(_idx, _objList.length);
        switch (tmpType) {
            case 'Image': this.createListImage(_idx, _folderInCustom, tmpGameObj); break;
            case 'Sprite': this.createListSprite(_idx, _folderInCustom, tmpGameObj); break;
            case 'Text': this.createListText(_idx, _folderInCustom, tmpGameObj); break;
            case 'Graphics': this.createGraphics(_idx, _folderInCustom, tmpGameObj); break;
            case 'Container': this.createContainer(_idx, _folderInCustom, tmpGameObj); break;
            case 'TileSprite': this.createTileSprite(_idx, _folderInCustom, tmpGameObj); break;
            case 'ParticleEmitterManager': this.createParticleEmitterManager(_idx, _folderInCustom, tmpGameObj); break;
            case 'Arc':
                this.chckEndSorting(_idx);
                console.log('Arc:', tmpGameObj);
                // this.createAracdeBodySprite(_idx, _folderInCustom, tmpGameObj);
                break;
            // + etc
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
            case 'Graphics':
            case 'Container':
            case 'Emitter':
            case 'Arc':
                console.log('Arc:', _gameObj);
                break;
            case 'TileSprite':
                console.log('TileSprite:', _gameObj);
                break;
            default:
                console.log(tmpType, 'this is not on the type or not yet updated type options');
                break;
        }
        return tmpReturn;
    }


    createBack2BasicFunc(_idx, _folderInCustom, _gameObj) { // create back 2 basic function
        _folderInCustom.add(_gameObj, 'GUI_BACK_2_BASIC');
    }
    createListImage(_idx, _folderInCustom, _gameObj) {
        // also check what type of Physics
        // console.log('IMAGE type:', _gameObj);
        this.createCommonFront(_idx, _folderInCustom, _gameObj);
        this.chckPhysicsType(_folderInCustom, _gameObj);
        _folderInCustom.add(_gameObj.texture, 'key').listen();
        this.createCommonBack(_idx, _folderInCustom, _gameObj);
        this.chckPhysicsBody(_folderInCustom, _gameObj);
        this.chckEndSorting(_idx);
    }
    createListSprite(_idx, _folderInCustom, _gameObj) {
        // console.log('SPRITE type:', _gameObj);
        _folderInCustom.add(_gameObj, 'name');
        this.chckPhysicsType(_folderInCustom, _gameObj);
        this.tryCatch(_folderInCustom, _gameObj.texture, 'originX');
        this.tryCatch(_folderInCustom, _gameObj.texture, 'originY');
        this.createCommonBack(_idx, _folderInCustom, _gameObj);
        this.createAnims(_idx, _folderInCustom, _gameObj);
        this.chckPhysicsBody(_folderInCustom, _gameObj);
        this.chckEndSorting(_idx);
    }
    createListText(_idx, _folderInCustom, _gameObj) {
        // console.log('TEXT type:', _gameObj);
        _folderInCustom.add(_gameObj, 'name');
        this.chckPhysicsType(_folderInCustom, _gameObj);
        _folderInCustom.add(_gameObj, 'text').listen();
        this.createCommonBack(_idx, _folderInCustom, _gameObj);
        this.chckPhysicsBody(_folderInCustom, _gameObj);

        this.chckEndSorting(_idx);
    }
    createGraphics(_idx, _folderInCustom, _gameObj) {
        // console.log('GRAPHICS type:', _gameObj);
        this.createCommonFront(_idx, _folderInCustom, _gameObj);
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
    createContainer(_idx, _folderInCustom, _gameObj) {
        // console.log('CONTAINER type:', _gameObj);
        this.tryCatch(_folderInCustom, _gameObj, 'name');
        this.tryCatch(_folderInCustom, _gameObj, 'type');
        this.tryCatch(_folderInCustom, _gameObj, 'alpha');
        this.tryCatch(_folderInCustom, _gameObj, 'depth');
        this.tryCatch(_folderInCustom, _gameObj, 'scale');
        this.tryCatch(_folderInCustom, _gameObj, 'angle');
        this.tryCatch(_folderInCustom, _gameObj, 'rotation');
        this.tryCatch(_folderInCustom, _gameObj, 'visible');
        this.tryCatch(_folderInCustom, _gameObj, 'originX');
        this.tryCatch(_folderInCustom, _gameObj, 'originY');
        this.tryCatch(_folderInCustom, _gameObj, 'length');
        this.tryCatch(_folderInCustom, _gameObj, 'active');
        this.tryCatch(_folderInCustom, _gameObj, 'exclusive');
        this.tryCatch(_folderInCustom, _gameObj, 'position');
        this.tryCatch(_folderInCustom, _gameObj, 'scrollFactorX');
        this.tryCatch(_folderInCustom, _gameObj, 'scrollFactorY');
        this.tryCatch(_folderInCustom, _gameObj, 'x');
        this.tryCatch(_folderInCustom, _gameObj, 'y');
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
    createTileSprite(_idx, _folderInCustom, _gameObj) {
        // console.log('EMITTER type:', _gameObj);
        
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
                break;
                case 'number': // impact
                    tmpObj = {type: 'Impact ' + tmpStr};
                    _folderInCustom.add(tmpObj, 'type');
                break;
                default: // arcade
                    tmpObj = {type: 'Arcade ' + tmpStr};
                    _folderInCustom.add(tmpObj, 'type');
                break;
            }
        }
    }
    chckPhysicsBody(_folderInCustom, _gameObj) {
        let tmpType = (_gameObj.body) ? true : false;
        if (tmpType) { // arcade image
            let tmpOffset = undefined;
            let tmpBody = _folderInCustom.addFolder('body');
            tmpBody.open();
            this.tryCatch(tmpBody, _gameObj.body, 'x');
            this.tryCatch(tmpBody, _gameObj.body, 'y');
            this.tryCatch(tmpBody, _gameObj.body, 'width');
            this.tryCatch(tmpBody, _gameObj.body, 'height');
            this.tryCatch(tmpBody, _gameObj.body, 'angle');
            this.tryCatch(tmpBody, _gameObj.body, 'allowRotation');
            this.tryCatch(tmpBody, _gameObj.body, 'rotation');
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
            
            this.chckEndSorting(_idx);
        }
    }
    createCommonFront(_idx, _folderInCustom, _gameObj) {
        // set properties (GUIIdx, name, type)
        this.tryCatch(_folderInCustom, _gameObj, 'GUIIdx');
        this.tryCatch(_folderInCustom, _gameObj, 'name');
        this.tryCatch(_folderInCustom, _gameObj, 'type');
    }
    // findVarNameLogic
    createCommonBack(_idx, _folderInCustom, _gameObj) {
        // this.tryCatch(_folderInCustom, _gameObj, 'x', 'onChange', _debugBox.setClearNFocus.bind(_debugBox, _gameObj));
        // this.tryCatch(_folderInCustom, _gameObj, 'y', 'onChange', _debugBox.setClearNFocus.bind(_debugBox, _gameObj));
        this.tryCatch(_folderInCustom, _gameObj, 'x');
        this.tryCatch(_folderInCustom, _gameObj, 'y');
        // this.tryCatch(_folderInCustom, _gameObj, 'width', 'onChange', _debugBox.setClearNFocus.bind(_debugBox, _gameObj));
        // this.tryCatch(_folderInCustom, _gameObj, 'height', 'onChange', _debugBox.setClearNFocus.bind(_debugBox, _gameObj));
        this.tryCatch(_folderInCustom, _gameObj, 'width');
        this.tryCatch(_folderInCustom, _gameObj, 'height');
        this.tryCatch(_folderInCustom, _gameObj, 'alpha');
        this.tryCatch(_folderInCustom, _gameObj, 'depth');
        // this.tryCatch(_folderInCustom, _gameObj, 'angle', 'onChange', _debugBox.setClearNFocus.bind(_debugBox, _gameObj));
        // this.tryCatch(_folderInCustom, _gameObj, 'rotation', 'onChange', _debugBox.setClearNFocus.bind(_debugBox, _gameObj));
        this.tryCatch(_folderInCustom, _gameObj, 'angle');
        this.tryCatch(_folderInCustom, _gameObj, 'rotation');
        this.tryCatch(_folderInCustom, _gameObj, 'visible');
        // this.tryCatch(_folderInCustom, _gameObj, 'originX', 'onChange', _debugBox.setClearNFocus.bind(_debugBox, _gameObj));
        // this.tryCatch(_folderInCustom, _gameObj, 'originY', 'onChange', _debugBox.setClearNFocus.bind(_debugBox, _gameObj));
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
    tryCatch(_guiObj, _obj, _property, _cmd, _customFunction) {
        let tmpAddFunc = undefined;
        try { tmpAddFunc = _guiObj.add(_obj, _property); }
        catch(e) {}
        
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
        }
    }
}

