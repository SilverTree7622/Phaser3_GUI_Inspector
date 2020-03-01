
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
            case 'Arc': 
                // console.log('Arc:', tmpGameObj);
                // this.createAracdeBodySprite(_idx, _folderInCustom, tmpGameObj);
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
            case 'Arc':
                console.log('object:', _gameObj);
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
        this.tryCatchFlow(_folderInCustom.add(_gameObj.texture, 'key').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj.texture, '_displayOriginX').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj.texture, '_displayOriginY').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj.texture, 'originX').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj.texture, 'originY').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj.texture, 'z').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj.texture, 'w').listen);
        // _folderInCustom.add(_gameObj, '_displayOriginX').listen();
        // _folderInCustom.add(_gameObj, '_displayOriginY').listen();
        // _folderInCustom.add(_gameObj, 'originX').listen();
        // _folderInCustom.add(_gameObj, 'originY').listen();
        // _folderInCustom.add(_gameObj, 'z').listen();
        // _folderInCustom.add(_gameObj, 'w').listen();
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

        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'alpha').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'scale').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'angle').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'rotation').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'visible').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'defaultFillColor').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'defaultFillAlpha').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'defaultStrokeWidth').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'defaultStrokeColor').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'defaultStrokeAlpha').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, '_lineWidth').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'active').listen);

        // _folderInCustom.add(_gameObj, 'alpha').listen();
        // _folderInCustom.add(_gameObj, 'scale').listen();
        // _folderInCustom.add(_gameObj, 'angle').listen();
        // _folderInCustom.add(_gameObj, 'rotation').listen();
        // _folderInCustom.add(_gameObj, 'visible').listen();
        // _folderInCustom.add(_gameObj, 'defaultFillColor').listen();
        // _folderInCustom.add(_gameObj, 'defaultFillAlpha').listen();
        // _folderInCustom.add(_gameObj, 'defaultStrokeWidth').listen();
        // _folderInCustom.add(_gameObj, 'defaultStrokeColor').listen();
        // _folderInCustom.add(_gameObj, 'defaultStrokeAlpha').listen();
        // _folderInCustom.add(_gameObj, '_lineWidth').listen();
        // _folderInCustom.add(_gameObj, 'active').listen();
        // this.createCommon(_idx, _folderInCustom, _gameObj);
        this.chckEndSorting(_idx);
    }
    createContainer(_idx, _folderInCustom, _gameObj) {
        // console.log('CONTAINER type:', _gameObj);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'name').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'name').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'name').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'type').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'alpha').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'depth').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'scale').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'angle').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'rotation').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'visible').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'originX').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'originY').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'length').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'active').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'exclusive').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'position').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'scrollFactorX').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'scrollFactorY').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'x').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'y').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'z').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'w').listen);
        
        // _folderInCustom.add(_gameObj, 'name').listen();
        // _folderInCustom.add(_gameObj, 'type').listen();
        // _folderInCustom.add(_gameObj, 'alpha').listen();
        // _folderInCustom.add(_gameObj, 'depth').listen();
        // _folderInCustom.add(_gameObj, 'scale').listen();
        // _folderInCustom.add(_gameObj, 'angle').listen();
        // _folderInCustom.add(_gameObj, 'rotation').listen();
        // _folderInCustom.add(_gameObj, 'visible').listen();
        // _folderInCustom.add(_gameObj, 'originX').listen();
        // _folderInCustom.add(_gameObj, 'originY').listen();
        // _folderInCustom.add(_gameObj, 'length').listen();
        // _folderInCustom.add(_gameObj, 'active').listen();
        // _folderInCustom.add(_gameObj, 'exclusive').listen();
        // _folderInCustom.add(_gameObj, 'position').listen();
        // _folderInCustom.add(_gameObj, 'scrollFactorX').listen();
        // _folderInCustom.add(_gameObj, 'scrollFactorY').listen();
        // _folderInCustom.add(_gameObj, 'x').listen();
        // _folderInCustom.add(_gameObj, 'y').listen();
        // _folderInCustom.add(_gameObj, 'z').listen();
        // _folderInCustom.add(_gameObj, 'w').listen();
        let tmpList = _folderInCustom.addFolder('list');
        tmpList.add(_gameObj.list, 'length');
        for (var i=0; i<_gameObj.list.length; i++) {
            this.tryCatchFlow(tmpList.add.bind(this, _gameObj.list, i));
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
            this.tryCatchFlow(tmpBody.add(_gameObj.body, 'x').listen);
            this.tryCatchFlow(tmpBody.add(_gameObj.body, 'y').listen);
            this.tryCatchFlow(tmpBody.add(_gameObj.body, 'width').listen);
            this.tryCatchFlow(tmpBody.add(_gameObj.body, 'height').listen);
            this.tryCatchFlow(tmpBody.add(_gameObj.body, 'angle').listen);
            this.tryCatchFlow(tmpBody.add(_gameObj.body, 'allowRotation').listen);
            this.tryCatchFlow(tmpBody.add(_gameObj.body, 'rotation').listen);
            this.tryCatchFlow(tmpBody.add(_gameObj.body, 'debugShowBody').listen);
            this.tryCatchFlow(tmpBody.add(_gameObj.body, 'debugShowVelocity').listen);
            this.tryCatchFlow(tmpBody.add(_gameObj.body, 'debugBodyColor').listen);
            this.tryCatchFlow(tmpBody.add(_gameObj.body, 'onWorldBounds').listen);
            this.tryCatchFlow(tmpBody.add(_gameObj.body, 'allowDrag').listen);
            this.tryCatchFlow(tmpBody.add(_gameObj.body, 'allowGravity').listen);
            this.tryCatchFlow(tmpBody.add(_gameObj.body, 'onCollide').listen);
            this.tryCatchFlow(tmpBody.add(_gameObj.body, 'onOverlap').listen);

            // tmpBody.add(_gameObj.body, 'x').listen();
            // tmpBody.add(_gameObj.body, 'y').listen();
            // tmpBody.add(_gameObj.body, 'width').listen();
            // tmpBody.add(_gameObj.body, 'height').listen();
            // tmpBody.add(_gameObj.body, 'angle').listen();
            // tmpBody.add(_gameObj.body, 'allowRotation').listen();
            // tmpBody.add(_gameObj.body, 'rotation').listen();
            // tmpBody.add(_gameObj.body, 'debugShowBody').listen();
            // tmpBody.add(_gameObj.body, 'debugShowVelocity').listen();
            // tmpBody.add(_gameObj.body, 'debugBodyColor').listen();
            // tmpBody.add(_gameObj.body, 'onWorldBounds').listen();
            // tmpBody.add(_gameObj.body, 'allowDrag').listen();
            // tmpBody.add(_gameObj.body, 'allowGravity').listen();
            // tmpBody.add(_gameObj.body, 'onCollide').listen();
            // tmpBody.add(_gameObj.body, 'onOverlap').listen();

            tmpOffset = tmpBody.addFolder('offset');
            this.tryCatchFlow(tmpOffset.add(_gameObj.body.offset, 'x').listen);
            this.tryCatchFlow(tmpOffset.add(_gameObj.body.offset, 'y').listen);
            // tmpOffset.add(_gameObj.body.offset, 'x').listen();
            // tmpOffset.add(_gameObj.body.offset, 'y').listen();
            tmpOffset.open();
            
            this.tryCatchFlow(tmpBody.add(_gameObj.body, 'enable').listen);
            this.tryCatchFlow(tmpBody.add(_gameObj.body, 'isCircle').listen);
            // tmpBody.add(_gameObj.body, 'enable').listen();
            // tmpBody.add(_gameObj.body, 'isCircle').listen();

            // tmpBody.add(_gameObj.body, 'radius').listen(); // why is this not working?
            
            tmpBody.open();
        }
    }
    createCommon(_idx, _folderInCustom, _gameObj) {
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'x').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'y').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'width').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'height').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'alpha').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'depth').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'scale').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'angle').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'rotation').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'visible').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'originX').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'originY').listen);
        this.tryCatchFlow(_folderInCustom.add(_gameObj, 'active').listen);
    }
    createAnims(_idx, _folderInCustom, _gameObj) { // create anims property folder
        let tmpAnims = _folderInCustom.addFolder('anims');
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, 'isPlaying').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, 'currentAnim').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, 'currentFrame').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, 'nextAnim').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, 'duration').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, 'msPerFrame').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, 'skipMissedFrames').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, '_delay').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, '_repeat').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, '_repeatDelay').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, '_yoyo').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, 'forward').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, '_reverse').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, 'accumulator').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, 'nextTick').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, 'repeatCounter').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, 'pendingRepeat').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, '_paused').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, '_wasPlaying').listen);
        this.tryCatchFlow(tmpAnims.add(_gameObj.anims, '_pendingStop').listen);

        // tmpAnims.add(_gameObj.anims, 'isPlaying').listen();
        // tmpAnims.add(_gameObj.anims, 'currentAnim').listen();
        // tmpAnims.add(_gameObj.anims, 'currentFrame').listen();
        // tmpAnims.add(_gameObj.anims, 'nextAnim').listen();
        // tmpAnims.add(_gameObj.anims, 'duration').listen();
        // tmpAnims.add(_gameObj.anims, 'msPerFrame').listen();
        // tmpAnims.add(_gameObj.anims, 'skipMissedFrames').listen();
        // tmpAnims.add(_gameObj.anims, '_delay').listen();
        // tmpAnims.add(_gameObj.anims, '_repeat').listen();
        // tmpAnims.add(_gameObj.anims, '_repeatDelay').listen();
        // tmpAnims.add(_gameObj.anims, '_yoyo').listen();
        // tmpAnims.add(_gameObj.anims, 'forward').listen();
        // tmpAnims.add(_gameObj.anims, '_reverse').listen();
        // tmpAnims.add(_gameObj.anims, 'accumulator').listen();
        // tmpAnims.add(_gameObj.anims, 'nextTick').listen();
        // tmpAnims.add(_gameObj.anims, 'repeatCounter').listen();
        // tmpAnims.add(_gameObj.anims, 'pendingRepeat').listen();
        // tmpAnims.add(_gameObj.anims, '_paused').listen();
        // tmpAnims.add(_gameObj.anims, '_wasPlaying').listen();
        // tmpAnims.add(_gameObj.anims, '_pendingStop').listen();
        tmpAnims.open();
    }
    tryCatchFlow(_function) {
        try {
            _function();
        }
        catch {}
    }
}