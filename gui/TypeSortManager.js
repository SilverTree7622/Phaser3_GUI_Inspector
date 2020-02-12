
// sort obj type, pointer over properties
class TypeSortManager {
    constructor() {

    }
    // _EXTERNAL_
    // check each of objs type
    chckObjType(_custom, _idx, _folderInCustom, _gameObj) {
        let tmpType = _gameObj.type;
        // console.log('add sprite folder with this obj:', _gameObj.guiIdx);
        this.createBack2BasicFunc(_idx, _folderInCustom, _gameObj);
        switch (tmpType) {
            case 'Image':
                this.createListImage(_idx, _folderInCustom, _gameObj);
                break;
            case 'Sprite':
                this.createListSprite(_idx, _folderInCustom, _gameObj);
                break;
            case 'Text':
                this.createListText(_idx, _folderInCustom, _gameObj);
                break;
            case 'Graphics':
                this.createGraphics(_idx, _folderInCustom, _gameObj);
                break;
            case 'Arc': // ?? might be arcade
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
        // console.log('_gameObj:', _gameObj);
        _folderInCustom.add(_gameObj, 'name').listen();
        _folderInCustom.add(_gameObj, 'type').listen();
        _folderInCustom.add(_gameObj.texture, 'key').listen();
        _folderInCustom.add(_gameObj, 'x').listen();
        _folderInCustom.add(_gameObj, 'y').listen();
        _folderInCustom.add(_gameObj, 'width').listen();
        _folderInCustom.add(_gameObj, 'height').listen();
    }
    createListSprite(_idx, _folderInCustom, _gameObj) {
        // let tmpSpr = undefined;
        // _obj.GUIIDX = _idx;
        // tmpSpr = this.self.add(_obj, _config);
        // tmpSpr.name(_obj.name);
        // this.folder.push2FolderList(tmpSpr, 'custom');
    }
    createListText(_idx, _folderInCustom, _gameObj) {

    }
    createGraphics(_idx, _folderInCustom, _gameObj) {

    }
    createAracdeBodySprite(_idx, _folderInCustom, _gameObj) {

    }
    createEmitter(_idx, _folderInCustom, _gameObj) {

    }
}