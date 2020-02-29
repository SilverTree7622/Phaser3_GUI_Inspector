
// function
function PhaserDatActionWithScene(_scene, _statusManager) {
    // declare
    let tmpClass;
    let tmpStatus;
    let tmpReturn;
    // value
    tmpClass = InitSet();
    tmpStatus = CheckSM(_statusManager);
    tmpReturn = CommonAction(tmpClass, _scene);
    // return
    return tmpReturn;
}

// detail function
function InitSet() {
    let tmpClass;
    try {
        tmpClass = require('./gui/GUIClass.js').GUIClass;
    }
    catch {}
    return tmpClass;
}
function CheckSM(_statusManager) {
    let tmpSM;
    if (_statusManager) {} // status manager exist
    else {} // status manager not exist
    return tmpSM;
}
function CommonAction(_tmpClass, _scene) {
    let GUIClass = new _tmpClass();
    GUIClass.create(_scene);
    // manage update(FPS)
    return GUIClass;
}

// ADD TO WINDOW
window.PhaserDatActionWithScene = PhaserDatActionWithScene;
