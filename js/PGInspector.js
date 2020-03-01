
// function
function PhaserGUIAction(_configObj) {
    // chck (scene, css Opacity object / phaser scenes)
    let tmpConfigObj = ChckConfigObj(_configObj);
    let tmpcss = tmpConfigObj.css;
    let tmpStatus = tmpConfigObj.status;
    let tmpScene = tmpConfigObj.scene;

    // pure declare
    let tmpClass;
    let tmpStatusReturn;
    let tmpSceneReturn;
    
    // setting value
    tmpClass = InitClassSetting();
    tmpStatusReturn = ChckStatusManager(tmpStatus);
    tmpSceneReturn = CommonAction(tmpcss, tmpStatusReturn, tmpClass, tmpScene);

    // return
    return tmpSceneReturn;
}

function ChckConfigObj(_configObj) {
    let tmpReturn = {};
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
        console.log('just only phaser scene');
        tmpReturn.css = {
            alpha: undefined
        };
        tmpReturn.status = undefined;
        tmpReturn.scene = _configObj;
    }
    return tmpReturn;
}

// detail function
function InitClassSetting() {
    let tmpClass;
    try {
        tmpClass = require('./gui/GUIClass.js').GUIClass;
    }
    catch {}
    return tmpClass;
}
function CommonAction(_tmpcss, _tmpStatusReturn, _tmpClass, _scene) {
    let tmpHandOverObj = {
        css: _tmpcss,
        status: _tmpStatusReturn
    };
    let GUIClass = new _tmpClass(tmpHandOverObj);
    GUIClass.create(_scene);
    // manage update(FPS)
    return GUIClass;
}
function ChckStatusManager(_tmpStatus) {
    let tmpSM;
    if (_tmpStatus) {} // status manager exist
    else {} // status manager not exist
    return tmpSM;
}


// FINFAL WORK: ADD TO WINDOW
window.PhaserGUIAction = PhaserGUIAction;
