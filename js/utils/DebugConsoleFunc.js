
export function DebugConsole(_obj) {
    let tmpName = _obj.name;
    let tmpVersion = _obj.version;
    let tmpIC = _obj.initConfig;
    let tmpA = 'ALPHA:' + tmpIC.css.alpha;
    let tmpR = 'RIGHT:' + tmpIC.css.right;
    let tmpT = 'TOP:' + tmpIC.css.top;
    let tmpI = 'SIDE:' + tmpIC.init.side;
    let tmpURL = _obj.url;
    let tmp_nameNversion = '%c' + tmpName + ' v' + tmpVersion + ' \n';
    let tmp_config = '%c INIT_CONFIG( ' + tmpA + ' | ' + tmpR + ' | ' + tmpT + ' | ' + tmpI + ' ) \n';
    let tmp_url = '%c' + tmpURL;
    let tmpShadowGap = 1;
    let tmpShadowList = [
        tmpShadowGap + 'px ' + -tmpShadowGap + 'px 0 rgb(217,31,38)',
        tmpShadowGap * 2 + 'px ' + -tmpShadowGap * 2 + 'px 0 rgb(226,91,14)',
        tmpShadowGap * 3 + 'px ' + -tmpShadowGap * 3 + 'px 0 rgb(245,221,8)',
        tmpShadowGap * 4 + 'px ' + -tmpShadowGap * 4 + 'px 0 rgb(5,148,68)',
        tmpShadowGap * 5 + 'px ' + -tmpShadowGap * 5 + 'px 0 rgb(2,135,206)',
        tmpShadowGap * 6 + 'px ' + -tmpShadowGap * 6 + 'px 0 rgb(4,77,145)',
        tmpShadowGap * 7 + 'px ' + -tmpShadowGap * 7 + 'px 0 rgb(42,21,113)'
    ];
    let tmpShadow = 'text-shadow:';
    for (var i=0; i<tmpShadowList.length; i++) {
        let tmpMiddle = ',';
        if (i === tmpShadowList.length - 1) {
            tmpMiddle = ';';
        }
        tmpShadow += tmpShadowList[i] + tmpMiddle;
    }
    let tmpStyle1 = 'font-weight:bold; font-size:25px; color: rgb(255, 111, 0);' + tmpShadow;
    let tmpStyle2 = 'color: white; background: rgb(181, 0, 0); font-size: 12px;';
    let tmpStyle3 = 'font-size: 12px;'

    // final console log with vars
    return console.log(
        tmp_nameNversion + tmp_config + tmp_url,
        tmpStyle1, tmpStyle2, tmpStyle3
    );
}

// debug console log out the specific game object
export function DebugGetThisConsole() {
    let tmpInit = '%c_PGI LogOut_';
    let tmpInfo = ': GUIIdx[' + this.guiIdx + ']';
    let tmpStyle = 'color: white; background: rgb(255, 111, 0);';
    return console.log(tmpInit, tmpStyle, tmpInfo, this);
}

// show Phaser.Scene & Phaser's all the displayList
export function DebugSceneNAllDisplayList() {
    // scope: Phaser.Scene
    let tmpDisplayList = this.children.list;
    let tmpInit = '%c_PGI Expose_';
    let tmpInfo = ': |Scene| & |DisplayList|\n';
    let tmpStyle = 'color: white; background: rgb(250, 0, 0);';
    return console.log(tmpInit, tmpStyle, tmpInfo, this, '\n', tmpDisplayList);
}

// export function DebugPointerPosition(_mainCamera, _pointer) {
//     let tmpInit = '%c_PGI Pointer Info_';
//     let tmpStyle = 'color: white; background: rgb(125, 0, 125);';
//     let tmpGap = ':';
//     let tmpXStr = 'X:';
//     let tmpX = _pointer.x;
//     let tmpYStr = 'Y:';
//     let tmpY = _pointer.y;
//     let tmpZoomStr = 'ZoomRate:';
//     let tmpZoom = _mainCamera.zoom;

//     return console.log(
//         tmpInit, tmpStyle, tmpGap, '\n',
//         tmpXStr, tmpX, tmpYStr, tmpY, '\n',
//         tmpZoomStr, tmpZoom
//     );
// }