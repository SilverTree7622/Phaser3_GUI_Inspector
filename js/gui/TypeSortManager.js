
// sort obj type, pointer over properties
export default class TypeSortManager {
    constructor() {
        this.conAlert = '_Inspector System_ :';
        this.timeKey = '_Inspector CntEnd_ ';
        this.objLength = 0;
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
            case 'Emitter':
                break;
            case 'Arc':
                console.log('Arc:', tmpGameObj);
                // this.createAracdeBodySprite(_idx, _folderInCustom, tmpGameObj);
                break;
            case 'TileSprite':
                console.log('TileSprite:', tmpGameObj);
                break;
            // + etc
            default:
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
        let tmpType = (_gameObj.body) ? true : false;

        _folderInCustom.add(_gameObj, 'name');
        this.chckPhysicsType(tmpType, _folderInCustom, _gameObj);

        _folderInCustom.add(_gameObj.texture, 'key').listen();
        this.createCommon(_idx, _folderInCustom, _gameObj);
        this.chckPhysicsBody(tmpType, _folderInCustom, _gameObj);
        this.chckEndSorting(_idx);
    }
    createListSprite(_idx, _folderInCustom, _gameObj) {
        // console.log('SPRITE type:', _gameObj);
        _folderInCustom.add(_gameObj, 'name');
        _folderInCustom.add(_gameObj, 'type');
        this.tryCatch(_folderInCustom, _gameObj.texture, 'key');
        // this.tryCatch(_folderInCustom.add, _gameObj.texture, '_displayOriginX');
        // this.tryCatch(_folderInCustom.add, _gameObj.texture, '_displayOriginY');
        this.tryCatch(_folderInCustom, _gameObj.texture, 'originX');
        this.tryCatch(_folderInCustom, _gameObj.texture, 'originY');
        this.tryCatch(_folderInCustom, _gameObj.texture, 'z');
        this.tryCatch(_folderInCustom, _gameObj.texture, 'w');
        // _folderInCustom.add, _gameObj, '_displayOriginX').listen();
        // _folderInCustom.add, _gameObj, '_displayOriginY').listen();
        // _folderInCustom.add, _gameObj, 'originX').listen();
        // _folderInCustom.add, _gameObj, 'originY').listen();
        // _folderInCustom.add, _gameObj, 'z').listen();
        // _folderInCustom.add, _gameObj, 'w').listen();
        this.createCommon(_idx, _folderInCustom, _gameObj);
        this.createAnims(_idx, _folderInCustom, _gameObj);
        this.chckEndSorting(_idx);
    }
    createListText(_idx, _folderInCustom, _gameObj) {
        // console.log('TEXT type:', _gameObj);
        let tmpType = (_gameObj.body) ? true : false;
        _folderInCustom.add(_gameObj, 'name');
        this.chckPhysicsType(tmpType, _folderInCustom, _gameObj);
        _folderInCustom.add(_gameObj, 'text').listen();
        this.createCommon(_idx, _folderInCustom, _gameObj);
        this.chckPhysicsBody(tmpType, _folderInCustom, _gameObj);
        this.chckEndSorting(_idx);
    }
    createGraphics(_idx, _folderInCustom, _gameObj) {
        // console.log('GRAPHICS type:', _gameObj);
        _folderInCustom.add(_gameObj, 'name');
        _folderInCustom.add(_gameObj, 'type');

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

        // _folderInCustom.add, _gameObj, 'alpha').listen();
        // _folderInCustom.add, _gameObj, 'scale').listen();
        // _folderInCustom.add, _gameObj, 'angle').listen();
        // _folderInCustom.add, _gameObj, 'rotation').listen();
        // _folderInCustom.add, _gameObj, 'visible').listen();
        // _folderInCustom.add, _gameObj, 'defaultFillColor').listen();
        // _folderInCustom.add, _gameObj, 'defaultFillAlpha').listen();
        // _folderInCustom.add, _gameObj, 'defaultStrokeWidth').listen();
        // _folderInCustom.add, _gameObj, 'defaultStrokeColor').listen();
        // _folderInCustom.add, _gameObj, 'defaultStrokeAlpha').listen();
        // _folderInCustom.add, _gameObj, '_lineWidth').listen();
        // _folderInCustom.add, _gameObj, 'active').listen();
        // this.createCommon(_idx, _folderInCustom, _gameObj);
        this.chckEndSorting(_idx);
    }
    createContainer(_idx, _folderInCustom, _gameObj) {
        // console.log('CONTAINER type:', _gameObj);
        this.tryCatch(_folderInCustom, _gameObj, 'name');
        this.tryCatch(_folderInCustom, _gameObj, 'name');
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
        
        // _folderInCustom.add, _gameObj, 'name').listen();
        // _folderInCustom.add, _gameObj, 'type').listen();
        // _folderInCustom.add, _gameObj, 'alpha').listen();
        // _folderInCustom.add, _gameObj, 'depth').listen();
        // _folderInCustom.add, _gameObj, 'scale').listen();
        // _folderInCustom.add, _gameObj, 'angle').listen();
        // _folderInCustom.add, _gameObj, 'rotation').listen();
        // _folderInCustom.add, _gameObj, 'visible').listen();
        // _folderInCustom.add, _gameObj, 'originX').listen();
        // _folderInCustom.add, _gameObj, 'originY').listen();
        // _folderInCustom.add, _gameObj, 'length').listen();
        // _folderInCustom.add, _gameObj, 'active').listen();
        // _folderInCustom.add, _gameObj, 'exclusive').listen();
        // _folderInCustom.add, _gameObj, 'position').listen();
        // _folderInCustom.add, _gameObj, 'scrollFactorX').listen();
        // _folderInCustom.add, _gameObj, 'scrollFactorY').listen();
        // _folderInCustom.add, _gameObj, 'x').listen();
        // _folderInCustom.add, _gameObj, 'y').listen();
        // _folderInCustom.add, _gameObj, 'z').listen();
        // _folderInCustom.add, _gameObj, 'w').listen();
        let tmpList = _folderInCustom.addFolder('list');
        tmpList.add(_gameObj.list, 'length');
        for (var i=0; i<_gameObj.list.length; i++) {
            this.tryCatch(tmpList, _gameObj.list, i);
        }
        tmpList.open();
        this.chckEndSorting(_idx);
    }
    createEmitter(_idx, _folderInCustom, _gameObj) {
        // console.log('EMITTER type:', _gameObj);
    }

    // check body is arcade or matter
    chckPhysicsType(_tmpType, _folderInCustom, _gameObj) {
        if (_tmpType === true) { // if body exist
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
    chckPhysicsBody(_tmpType, _folderInCustom, _gameObj) {
        if (_tmpType) { // arcade image
            let tmpBody = _folderInCustom.addFolder('body');
            let tmpOffset = undefined;
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

            // tmpBody.add, _gameObj.body, 'x').listen();
            // tmpBody.add, _gameObj.body, 'y').listen();
            // tmpBody.add, _gameObj.body, 'width').listen();
            // tmpBody.add, _gameObj.body, 'height').listen();
            // tmpBody.add, _gameObj.body, 'angle').listen();
            // tmpBody.add, _gameObj.body, 'allowRotation').listen();
            // tmpBody.add, _gameObj.body, 'rotation').listen();
            // tmpBody.add, _gameObj.body, 'debugShowBody').listen();
            // tmpBody.add, _gameObj.body, 'debugShowVelocity').listen();
            // tmpBody.add, _gameObj.body, 'debugBodyColor').listen();
            // tmpBody.add, _gameObj.body, 'onWorldBounds').listen();
            // tmpBody.add, _gameObj.body, 'allowDrag').listen();
            // tmpBody.add, _gameObj.body, 'allowGravity').listen();
            // tmpBody.add, _gameObj.body, 'onCollide').listen();
            // tmpBody.add, _gameObj.body, 'onOverlap').listen();

            tmpOffset = tmpBody.addFolder('offset');
            this.tryCatch(tmpOffset, _gameObj.body.offset, 'x');
            this.tryCatch(tmpOffset, _gameObj.body.offset, 'y');
            // tmpOffset.add, _gameObj.body.offset, 'x').listen();
            // tmpOffset.add, _gameObj.body.offset, 'y').listen();
            tmpOffset.open();
            
            this.tryCatch(tmpBody, _gameObj.body, 'enable');
            this.tryCatch(tmpBody, _gameObj.body, 'isCircle');
            // tmpBody.add, _gameObj.body, 'enable').listen();
            // tmpBody.add, _gameObj.body, 'isCircle').listen();

            // tmpBody.add, _gameObj.body, 'radius').listen(); // why is this not working?
            
            tmpBody.open();
        }
    }
    createCommon(_idx, _folderInCustom, _gameObj) {
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

        // tmpAnims.add, _gameObj.anims, 'isPlaying').listen();
        // tmpAnims.add, _gameObj.anims, 'currentAnim').listen();
        // tmpAnims.add, _gameObj.anims, 'currentFrame').listen();
        // tmpAnims.add, _gameObj.anims, 'nextAnim').listen();
        // tmpAnims.add, _gameObj.anims, 'duration').listen();
        // tmpAnims.add, _gameObj.anims, 'msPerFrame').listen();
        // tmpAnims.add, _gameObj.anims, 'skipMissedFrames').listen();
        // tmpAnims.add, _gameObj.anims, '_delay').listen();
        // tmpAnims.add, _gameObj.anims, '_repeat').listen();
        // tmpAnims.add, _gameObj.anims, '_repeatDelay').listen();
        // tmpAnims.add, _gameObj.anims, '_yoyo').listen();
        // tmpAnims.add, _gameObj.anims, 'forward').listen();
        // tmpAnims.add, _gameObj.anims, '_reverse').listen();
        // tmpAnims.add, _gameObj.anims, 'accumulator').listen();
        // tmpAnims.add, _gameObj.anims, 'nextTick').listen();
        // tmpAnims.add, _gameObj.anims, 'repeatCounter').listen();
        // tmpAnims.add, _gameObj.anims, 'pendingRepeat').listen();
        // tmpAnims.add, _gameObj.anims, '_paused').listen();
        // tmpAnims.add, _gameObj.anims, '_wasPlaying').listen();
        // tmpAnims.add, _gameObj.anims, '_pendingStop').listen();
        tmpAnims.open();
    }
    tryCatch(_guiObj, _obj, _property) {
        try {
            _guiObj.add(_obj, _property).listen();
        }
        catch(e) {
            // console.log('error:', e);
        }
    }
}