
// FINFAL WORK: ADD TO WINDOW OBJECT
window.PhaserGUIAction = PhaserGUIAction; // lib act function
window.PhaserGUI = undefined; // GUI self class

// Main Phaser3 GUI function **
function PhaserGUIAction(_scene, _configObj) {
    let tmpMainInstance; // main(GUI & SideGUI) instance

    // check GUI object is already exist
    ChckGUIObj();

    // chck (scene, css Opacity object / phaser scenes)
    let tmpConfigObj = ChckConfigObj(_scene, _configObj);

    // pure declare for callback or plan
    let tmpMainClass;
    
    // setting value
    tmpMainClass = InitMainClass();
    tmpMainInstance = SetCreateUpdateInstance( tmpConfigObj, tmpMainClass );

    StoreGUI(tmpMainInstance);

    // return just phaser scene
    return tmpMainInstance;
}

// detailed functions
function ChckGUIObj() {
    // if exist, destory GUI
    if (window.PhaserGUI) {
        window.PhaserGUI.destroyGUI();
        window.PhaserGUI = undefined;
    }
}
function ChckConfigObj(_scene, _configObj) {
    // init config structure
    let tmpReturn = {
        scene: undefined, // Phaser.Scene
        css: {
            alpha: undefined, // float 0 ~ 1
            right: undefined, // int
            top: undefined // int
        },
        init: {
            focus: undefined, // GameObj
            ignore: undefined, // GameObj, array, container
            noSide: false // boolean
        }
    };
    // check is init config
    TryCatchObj(tmpReturn, 'scene', _scene);
    if (typeof _configObj === 'object') {
        TryCatchObj(tmpReturn.css, 'alpha', _configObj.alpha);
        TryCatchObj(tmpReturn.css, 'right', _configObj.right);
        TryCatchObj(tmpReturn.css, 'top', _configObj.top);

        TryCatchObj(tmpReturn.init, 'focus', _configObj.focus);
        TryCatchObj(tmpReturn.init, 'ignore', _configObj.ignore);
        TryCatchObj(tmpReturn.init, 'noSide', _configObj.noSide);
    }
    return tmpReturn;
}
function TryCatchObj(_obj, _objPropertyName, _obj2) {
    try {
        _obj[_objPropertyName] = _obj2;
    }
    catch(e) {
        console.log('_PGI System_ : INIT CONFIG PROPERTY', _obj2, 'NOT FOUND');
    }
}
function InitMainClass() {
    let tmpMain;
    try {
        // parcel way
        tmpMain = require('./main.js').Main;
    }
    catch (e) {
        console.warn('failed to load PGInspector.js error message:', e);
    }
    return tmpMain;
}
function SetCreateUpdateInstance(_tmpConfigObj, _tmpMainClass) {
    let MainClass = new _tmpMainClass(_tmpConfigObj);
    MainClass.create(_tmpConfigObj.scene);
    SetRenewalUpdate(_tmpConfigObj, MainClass);
    return MainClass;
}
// setting custom update
function SetRenewalUpdate(_tmpConfigObj, MainClass) {
    let tmpUpdate = undefined;
    let tmpSceneUpdate = _tmpConfigObj.scene.update.bind(_tmpConfigObj.scene);
    tmpUpdate = function (_time, _delta) {
        tmpSceneUpdate(_time, _delta);
        MainClass.update(_time, _delta);
    }
    return _tmpConfigObj.scene.update = tmpUpdate;
}
function StoreGUI(_GUI) {
    window.PhaserGUI = _GUI;
}

// trying for npm exports
module.exports = PhaserGUIAction;