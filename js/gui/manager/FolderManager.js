
// Folder manager
export default class FolderManager {
    constructor(_typeSort) {
        this.GUI;
        this.typeSort = _typeSort;
        this.config = this.initConfig();
        this.basic = this.initBasic();
        this.custom = this.initCustom();
    }
    create(_scene, _GUI) {
        this.GUI = _GUI;
        this.createBasic();
        this.createCustom();
        this.createFolderBtnClickEvent();
    }
    initConfig() { // config
        let tmpC = {};
        tmpC.initFolderCnt = 0;
        tmpC.openBasicDefault = true;
        tmpC.openCustomDefault = false;
        tmpC.tmpStorage = {
            Obj: {
                over: {
                    guiIdx: 0,
                    guiAlpha: 0,
                    guiTint: undefined
                },
                focus: {
                    guiIdx: 0,
                    guiAlpha: 0,
                    guiTint: undefined
                }
            }
        };
        return tmpC;
    }
    initBasic() { // basic folder
        let tmpB = {};
        tmpB.folder = undefined;
        tmpB.list = [];
        return tmpB;
    }
    initCustom() { // custom folder
        let tmpC = {};
        tmpC.folder = undefined;
        tmpC.list = [];
        tmpC.isDetailedOpen = false;
        return tmpC;
    }
    setDetailedStatus(_bool) {
        this.custom.folder.isDetailedOpen = _bool;
    }
    getDetailedStatus() {
        return this.custom.folder.isDetailedOpen;
    }
    createBasic() {
        this.basic.folder = this.GUI.addFolder('BASIC');
    }
    createCustom() {
        this.custom.folder = this.GUI.addFolder('DISPLAY_LIST');
    }

    createFolderBtnClickEvent() {
        let tmpBasic = this.basic.folder;
        let tmpCustom = this.custom.folder;
        // BASIC & CUSTOM folder div placement
        let tmpBasicTitle = tmpBasic.domElement.getElementsByClassName('title')[0];
        let tmpCustomTitle = tmpCustom.domElement.getElementsByClassName('title')[0];

        // dat.GUI folder pointer interactive event handling
        tmpBasicTitle.addEventListener('pointerup', (_event) => {
            if (tmpBasic.closed) { // result is open
                this.openBigFolder(tmpBasic);
            }
            else { // result is close
                this.closeBigFolder(tmpBasic);
            }
        });
        tmpCustomTitle.addEventListener('pointerup', (_event) => {
            if (tmpCustom.closed) { // result is open
                this.closeChildrenFolder(tmpCustom);
            }
            else { // result is close
                this.openChildrenFolder(tmpCustom);
            }
        });
    }

    push2FolderList(_folder, _isBasic) {
        if (_isBasic === 'basic') {
            this.basic.list.push(_folder);
        }
        else if (_isBasic === 'custom') {
            this.custom.list.push(_folder);
        }
        else if (!_isBasic) {
            this.custom.list.push(_folder);
            console.warn('this is not proper way of adding folder, change to string');
        }
        else {
            this.basic.list.push(_folder);
            console.warn('this is not proper way of adding folder, change to string');
        }
    }
    getGUIIdx() {
        return this.config.initFolderCnt;
    }
    add2CustomFolder() {
        let tmpFolder = this.custom.folder.addFolder(this.config.initFolderCnt);
        this.push2FolderList(tmpFolder, 'custom');
        this.config.initFolderCnt++;
        return tmpFolder;
    }
    // check init open or close
    chckOpenAllList() {
        this.chckOpenBasicList();
        this.chckOpenCustomList();
    }
    chckOpenBasicList() {
        if (this.config.openBasicDefault) {
            let tmpLength = this.basic.list.length;
            this.openFolder(this.basic.folder);
            for (var i=0; i<tmpLength; i++) {
                this.openFolder(this.basic.list[i]);
            }
        }
    }
    chckOpenCustomList() {
        if (this.config.openCustomDefault) {
            this.openFolder(this.custom.folder);
        }
        else {
            for (let i=0; i<this.config.initFolderCnt; i++) {
                this.closeFolder(this.custom.list[i]);
            }
        }
    }
    // open folder
    openBigFolder(_folder) {
        _folder.open();
    }
    closeBigFolder(_folder) {
        _folder.close();
    }
    openFolder(_folder) {
        this.setFolderDisplay(_folder, 'default');
        _folder.open();
    }
    closeFolder(_folder) {
        _folder.close();
        this.setFolderDisplay(_folder, 'none');
    }
    openChildrenFolder(_folder) {
        this.setFolderChildrenDisplay(_folder, 'default');
        _folder.open();
    }
    closeChildrenFolder(_folder) {
        _folder.close();
        this.setFolderChildrenDisplay(_folder, 'none');
    }
    setFolderDisplay(_folder, _cmd) {
        const tmpCmds = {none: 'none', default: ''};
        _folder.domElement.style.display = tmpCmds[_cmd];
    }
    setFolderChildrenDisplay(_folder, _cmd) {
        const tmpCmds = {none: 'none', default: ''};
        // control individual property dom display
        let tmpLength = Object.keys(_folder.__folders).length;
        for (let i=0; i<tmpLength; i++) {
            _folder.__folders[String(i)].domElement.style = tmpCmds[_cmd];
        }
    }

    // EXTERNAL
    setBasicOverFolder(_gameObj) {
        if (_gameObj) {
            let tmpTexture = this.typeSort.setTextureProperty(_gameObj);
            this.basic.list[1].__controllers[0].setValue(_gameObj.guiIdx);
            this.basic.list[1].__controllers[1].setValue(_gameObj.name);
            this.basic.list[1].__controllers[2].setValue(_gameObj.type);
            this.basic.list[1].__controllers[3].setValue(tmpTexture);
        }
        else { // change to all 'NONE'
            let tmpLength = this.basic.list[1].__controllers.length;
            for (var i=0; i<tmpLength; i++) {
                this.basic.list[1].__controllers[i].setValue('NONE');
            }
        }
    }
    setBasicFocusFolder(_gameObj) {
        let tmpFocus = this.basic.list[1].__folders.Focus;
        if (_gameObj) {
            let tmpTexture = this.typeSort.setTextureProperty(_gameObj);
            this.openFolder(tmpFocus);
            tmpFocus.__controllers[0].setValue(_gameObj.guiIdx);
            tmpFocus.__controllers[1].setValue(_gameObj.name);
            tmpFocus.__controllers[2].setValue(_gameObj.type);
            tmpFocus.__controllers[3].setValue(tmpTexture);
        }
        else { // change to all 'NONE'
            this.openBigFolder(this.basic.folder);
            this.closeFolder(tmpFocus);
            this.closeBigFolder(this.custom.folder);
            let tmpFuncLength = 2;
            let tmpLength = tmpFocus.__controllers.length - tmpFuncLength;
            for (var i=0; i<tmpLength; i++) {
                tmpFocus.__controllers[i].setValue('NONE');
            }
        }
    }
    cross2FocusObj(_gameObj) { // actually cross 2 custom_folder/focus_folder(config)
        if (_gameObj) {
            let tmpObjFolder = this.getCustomFoldersInFolder();
            // chck is any displayed folder exist
            for (let tmpObj in tmpObjFolder) {
                this.closeFolder(tmpObjFolder[tmpObj]);
            }
            this.closeBigFolder(this.basic.folder);
            this.openBigFolder(this.custom.folder);
            this.openFolder(tmpObjFolder[_gameObj.guiIdx]);
            this.setDetailedStatus(true);
        }
    }
    back2Basic(_idx) {
        let tmpObjFolder = this.getCustomFoldersInFolder();
        this.closeFolder(tmpObjFolder[_idx]);
        this.setDetailedStatus(false);
        this.closeBigFolder(this.custom.folder);
        this.openBigFolder(this.basic.folder);
    }
    closeThisNopenParentContainer(_arr) {
        // scope: gameObj
        let tmpLength = _arr[0];
        let tmpParentContainer = _arr[1];
        let tmpFolder = _arr[2];
        let tmpDebugBox = _arr[3];
        let tmpPCIdx = tmpParentContainer.guiIdx;
        let tmpObjFolder = tmpFolder.getCustomFoldersInFolder();
        
        tmpFolder.closeFolder(tmpObjFolder[tmpLength]);
        tmpFolder.setBasicFocusFolder(tmpParentContainer);
        tmpFolder.openFolder(tmpObjFolder[tmpPCIdx]);
        
        tmpDebugBox.clearFocus(this);
        tmpDebugBox.setClearNFocus(tmpParentContainer);
        tmpDebugBox.setFocusPerformance(tmpParentContainer, tmpFolder);
    }

    // EXTERNAL: get function
    getBasic() {
        return this.basic;
    }
    getCustom() {
        return this.custom;
    }
    getBasicFolder() {
        return this.basic.folder;
    }
    getCustomFolder() {
        return this.custom.folder;
    }
    getBasicList() {
        return this.basic.list;
    }
    getCustomList() {
        return this.custom.list;
    }
    getCustomFoldersInFolder() {
        return this.custom.folder.__folders;
    }
    getTmpStorageOver() {
        return this.config.tmpStorage.Obj.over;
    }
    getTmpStorageFocus() {
        return this.config.tmpStorage.Obj.focus;
    }
}
