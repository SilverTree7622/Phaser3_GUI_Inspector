
// sort obj type, pointer over properties
class TypeSortManager {
    constructor() {

    }
    // _EXTERNAL_
    chckObjType(_custom, _idx, _folderInCustom, _gameObj) { // check each of objs type
        let tmpType = _gameObj.type;
        this.createBack2BasicFunc(_idx, _folderInCustom, _gameObj);
        switch (tmpType) {
            case 'Image': this.createListImage(_idx, _folderInCustom, _gameObj); break;
            case 'Sprite': this.createListSprite(_idx, _folderInCustom, _gameObj); break;
            case 'Text': this.createListText(_idx, _folderInCustom, _gameObj); break;
            case 'Graphics': this.createGraphics(_idx, _folderInCustom, _gameObj); break;
            case 'Container': this.createContainer(_idx, _folderInCustom, _gameObj); break;
            case 'Arc': 
                console.log('Arc:', _gameObj);
                // this.createAracdeBodySprite(_idx, _folderInCustom, _gameObj);
                break;
            // + etc
            default:
                console.warn(tmpType, '<= this is not on the type options');
                break;
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
            case 'Graphics':
            case 'Arc':
                console.log('object:', _gameObj);
                break;
            default:
                console.log(tmpType, '<= this is not on the options');
                break;
        }
        return tmpReturn;
    }


    createBack2BasicFunc(_idx, _folderInCustom, _gameObj) { // create back 2 basic function
        _folderInCustom.add(_gameObj, 'GUI_BACK_2_BASIC');
    }
    createListImage(_idx, _folderInCustom, _gameObj) {
        // also check what type of Physics
        console.log('IMAGE type:', _gameObj);
        let tmpType = (_gameObj.body) ? true : false;
        _folderInCustom.add(_gameObj, 'name');
        this.chckPhysicsType(tmpType, _folderInCustom, _gameObj);
        _folderInCustom.add(_gameObj.texture, 'key').listen();
        this.createCommon(_idx, _folderInCustom, _gameObj);
        this.chckPhysicsBody(tmpType, _folderInCustom, _gameObj);
    }
    createListSprite(_idx, _folderInCustom, _gameObj) {
        console.log('SPRITE type:', _gameObj);
        _folderInCustom.add(_gameObj, 'name');
        _folderInCustom.add(_gameObj, 'type');
        _folderInCustom.add(_gameObj.texture, 'key').listen();
        _folderInCustom.add(_gameObj, '_displayOriginX').listen();
        _folderInCustom.add(_gameObj, '_displayOriginY').listen();
        _folderInCustom.add(_gameObj, 'originX').listen();
        _folderInCustom.add(_gameObj, 'originY').listen();
        _folderInCustom.add(_gameObj, 'z').listen();
        _folderInCustom.add(_gameObj, 'w').listen();
        this.createCommon(_idx, _folderInCustom, _gameObj);
        this.createAnims(_idx, _folderInCustom, _gameObj);
    }
    createListText(_idx, _folderInCustom, _gameObj) {
        console.log('TEXT type:', _gameObj);
        let tmpType = (_gameObj.body) ? true : false;
        _folderInCustom.add(_gameObj, 'name');
        this.chckPhysicsType(tmpType, _folderInCustom, _gameObj);
        _folderInCustom.add(_gameObj, 'text').listen();
        this.createCommon(_idx, _folderInCustom, _gameObj);
        this.chckPhysicsBody(tmpType, _folderInCustom, _gameObj);
    }
    createGraphics(_idx, _folderInCustom, _gameObj) {
        console.log('GRAPHICS type:', _gameObj);
        _folderInCustom.add(_gameObj, 'name');
        _folderInCustom.add(_gameObj, 'type');
        _folderInCustom.add(_gameObj, 'alpha').listen();
        _folderInCustom.add(_gameObj, 'scale').listen();
        _folderInCustom.add(_gameObj, 'angle').listen();
        _folderInCustom.add(_gameObj, 'rotation').listen();
        _folderInCustom.add(_gameObj, 'visible').listen();
        _folderInCustom.add(_gameObj, 'defaultFillColor').listen();
        _folderInCustom.add(_gameObj, 'defaultFillAlpha').listen();
        _folderInCustom.add(_gameObj, 'defaultStrokeWidth').listen();
        _folderInCustom.add(_gameObj, 'defaultStrokeColor').listen();
        _folderInCustom.add(_gameObj, 'defaultStrokeAlpha').listen();
        _folderInCustom.add(_gameObj, '_lineWidth').listen();
        _folderInCustom.add(_gameObj, 'active').listen();
        // this.createCommon(_idx, _folderInCustom, _gameObj);
    }
    createContainer(_idx, _folderInCustom, _gameObj) {
        console.log('CONTAINER type:', _gameObj);
        _folderInCustom.add(_gameObj, 'name').listen();
        _folderInCustom.add(_gameObj, 'type').listen();
        _folderInCustom.add(_gameObj, 'alpha').listen();
        _folderInCustom.add(_gameObj, 'depth').listen();
        _folderInCustom.add(_gameObj, 'scale').listen();
        _folderInCustom.add(_gameObj, 'angle').listen();
        _folderInCustom.add(_gameObj, 'rotation').listen();
        _folderInCustom.add(_gameObj, 'visible').listen();
        _folderInCustom.add(_gameObj, 'originX').listen();
        _folderInCustom.add(_gameObj, 'originY').listen();
        _folderInCustom.add(_gameObj, 'length').listen();
        _folderInCustom.add(_gameObj, 'active').listen();
        _folderInCustom.add(_gameObj, 'exclusive').listen();
        _folderInCustom.add(_gameObj, 'position').listen();
        _folderInCustom.add(_gameObj, 'scrollFactorX').listen();
        _folderInCustom.add(_gameObj, 'scrollFactorY').listen();
        _folderInCustom.add(_gameObj, 'x').listen();
        _folderInCustom.add(_gameObj, 'y').listen();
        _folderInCustom.add(_gameObj, 'z').listen();
        _folderInCustom.add(_gameObj, 'w').listen();
        let tmpList = _folderInCustom.addFolder('list');
        tmpList.add(_gameObj.list, 'length');
        for (var i=0; i<_gameObj.list.length; i++) {
            tmpList.add(_gameObj.list, i);
        }
        tmpList.open();
    }
    createEmitter(_idx, _folderInCustom, _gameObj) {
        console.log('EMITTER type:', _gameObj);
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
            tmpBody.add(_gameObj.body, 'x').listen();
            tmpBody.add(_gameObj.body, 'y').listen();
            tmpBody.add(_gameObj.body, 'width').listen();
            tmpBody.add(_gameObj.body, 'height').listen();
            tmpBody.add(_gameObj.body, 'angle').listen();
            tmpBody.add(_gameObj.body, 'allowRotation').listen();
            tmpBody.add(_gameObj.body, 'rotation').listen();
            tmpBody.add(_gameObj.body, 'debugShowBody').listen();
            tmpBody.add(_gameObj.body, 'debugShowVelocity').listen();
            tmpBody.add(_gameObj.body, 'debugBodyColor').listen();
            tmpBody.add(_gameObj.body, 'onWorldBounds').listen();
            tmpBody.add(_gameObj.body, 'allowDrag').listen();
            tmpBody.add(_gameObj.body, 'allowGravity').listen();
            tmpBody.add(_gameObj.body, 'onCollide').listen();
            tmpBody.add(_gameObj.body, 'onOverlap').listen();

            tmpOffset = tmpBody.addFolder('offset');
            tmpOffset.add(_gameObj.body.offset, 'x').listen();
            tmpOffset.add(_gameObj.body.offset, 'y').listen();
            tmpOffset.open();
            
            tmpBody.add(_gameObj.body, 'enable').listen();
            tmpBody.add(_gameObj.body, 'isCircle').listen();

            // tmpBody.add(_gameObj.body, 'radius').listen(); // why is this not working?
            
            tmpBody.open();
        }
    }
    createCommon(_idx, _folderInCustom, _gameObj) {
        _folderInCustom.add(_gameObj, 'x').listen();
        _folderInCustom.add(_gameObj, 'y').listen();
        _folderInCustom.add(_gameObj, 'width').listen();
        _folderInCustom.add(_gameObj, 'height').listen();
        _folderInCustom.add(_gameObj, 'alpha').listen();
        _folderInCustom.add(_gameObj, 'depth').listen();
        _folderInCustom.add(_gameObj, 'scale').listen();
        _folderInCustom.add(_gameObj, 'angle').listen();
        _folderInCustom.add(_gameObj, 'rotation').listen();
        _folderInCustom.add(_gameObj, 'visible').listen();
        _folderInCustom.add(_gameObj, 'originX').listen();
        _folderInCustom.add(_gameObj, 'originY').listen();
        _folderInCustom.add(_gameObj, 'active').listen();
    }
    createAnims(_idx, _folderInCustom, _gameObj) { // create anims property folder
        let tmpAnims = _folderInCustom.addFolder('anims');
        tmpAnims.add(_gameObj.anims, 'isPlaying').listen();
        tmpAnims.add(_gameObj.anims, 'currentAnim').listen();
        tmpAnims.add(_gameObj.anims, 'currentFrame').listen();
        tmpAnims.add(_gameObj.anims, 'nextAnim').listen();
        tmpAnims.add(_gameObj.anims, 'duration').listen();
        tmpAnims.add(_gameObj.anims, 'msPerFrame').listen();
        tmpAnims.add(_gameObj.anims, 'skipMissedFrames').listen();
        tmpAnims.add(_gameObj.anims, '_delay').listen();
        tmpAnims.add(_gameObj.anims, '_repeat').listen();
        tmpAnims.add(_gameObj.anims, '_repeatDelay').listen();
        tmpAnims.add(_gameObj.anims, '_yoyo').listen();
        tmpAnims.add(_gameObj.anims, 'forward').listen();
        tmpAnims.add(_gameObj.anims, '_reverse').listen();
        tmpAnims.add(_gameObj.anims, 'accumulator').listen();
        tmpAnims.add(_gameObj.anims, 'nextTick').listen();
        tmpAnims.add(_gameObj.anims, 'repeatCounter').listen();
        tmpAnims.add(_gameObj.anims, 'pendingRepeat').listen();
        tmpAnims.add(_gameObj.anims, '_paused').listen();
        tmpAnims.add(_gameObj.anims, '_wasPlaying').listen();
        tmpAnims.add(_gameObj.anims, '_pendingStop').listen();
        tmpAnims.open();
    }
}