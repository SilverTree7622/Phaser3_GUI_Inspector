
// Main Phaser3 GUI function **
function PhaserGUIAction(_configObj) {
    let tmpGUIInstance;

    ChckGUI();

    // chck (scene, css Opacity object / phaser scenes)
    let tmpConfigObj = ChckConfigObj(_configObj);

    // pure declare for callback or plan
    let tmpGUIClass;
    let tmpStatusReturn;
    
    // setting value
    tmpGUIClass = InitGUIClassSetting();
    tmpStatusReturn = ChckStatusManager(tmpConfigObj.status);
    tmpGUIInstance = CommonAction(
        tmpConfigObj.css,
        tmpStatusReturn,
        tmpGUIClass,
        tmpConfigObj.scene
    );

    StoreGUI(tmpGUIInstance);

    // return just phaser scene
    return tmpGUIInstance;
}

// FINFAL WORK: ADD TO WINDOW OBJECT
// lib act function
window.PhaserGUIAction = PhaserGUIAction;
// GUI self class
window.PhaserGUI = undefined;


// detailed functions
function ChckGUI() {
    if (window.PhaserGUI) {
        window.PhaserGUI.destroy();
        window.PhaserGUI = undefined;
    }
}
function ChckConfigObj(_configObj) {
    let tmpReturn = {
        css: {
            alpha: undefined
        },
        status: undefined,
        scene: undefined
    };
    if (!_configObj.sys) { // obj with config
        try {
            tmpReturn.css = {
                alpha: _configObj.alpha
            };
        }
        catch {}
        try {
            tmpReturn.status = _configObj.status;
        }
        catch {}
        tmpReturn.scene = _configObj.scene;
    }
    else { // only phaser scene
        tmpReturn.scene = _configObj;
    }
    return tmpReturn;
}
function InitGUIClassSetting() {
    let tmpClass;
    try {
        tmpClass = require('./gui/GUIClass.js').GUIClass; // parcel way
    }
    catch {}
    return tmpClass;
}
function CommonAction(_tmpcss, _tmpStatusReturn, _tmpGUIClass, _tmpScene) {
    let tmpHandOverObj = {
        css: _tmpcss,
        status: _tmpStatusReturn
    };
    let GUIClass = new _tmpGUIClass(tmpHandOverObj);
    GUIClass.create(_tmpScene);
    return GUIClass;
}
function ChckStatusManager(_tmpStatus) {
    let tmpSM;
    if (_tmpStatus) {} // status manager exist
    else {} // status manager not exist
    return tmpSM;
}
function StoreGUI(_GUI) {
    window.PhaserGUI = _GUI;
}