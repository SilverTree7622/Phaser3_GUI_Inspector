
export function DebugConsole(_obj) {
    let tmpName = _obj.name;
    let tmpVersion = _obj.version;
    let tmpInitConfig = _obj.initConfig;
    let tmpA = 'ALPHA:' + tmpInitConfig.alpha;
    let tmpR = 'RIGHT:' + tmpInitConfig.right;
    let tmpT = 'TOP:' + tmpInitConfig.top;
    let tmpURL = _obj.url;
    let tmp_nameNversion = '%c' + tmpName + ' v' + tmpVersion + ' \n';
    let tmp_config = '%c INIT_CONFIG( ' + tmpA + ' | ' + tmpR + ' | ' + tmpT + ' ) \n';
    let tmp_url = '%c' + tmpURL;
    let tmpShadowGap = 1;
    let tmpShadowList = [
        tmpShadowGap + 'px ' + tmpShadowGap + 'px 0 rgb(217,31,38)',
        tmpShadowGap * 2 + 'px ' + tmpShadowGap * 2 + 'px 0 rgb(226,91,14)',
        tmpShadowGap * 3 + 'px ' + tmpShadowGap * 3 + 'px 0 rgb(245,221,8)',
        tmpShadowGap * 4 + 'px ' + tmpShadowGap * 4 + 'px 0 rgb(5,148,68)',
        tmpShadowGap * 5 + 'px ' + tmpShadowGap * 5 + 'px 0 rgb(2,135,206)',
        tmpShadowGap * 6 + 'px ' + tmpShadowGap * 6 + 'px 0 rgb(4,77,145)',
        tmpShadowGap * 7 + 'px ' + tmpShadowGap * 7 + 'px 0 rgb(42,21,113)'
    ];
    let tmpShadow = 'text-shadow:';
    for (var i=0; i<tmpShadowList.length; i++) {
        let tmpMiddle = ',';
        if (i === tmpShadowList.length - 1) {
            tmpMiddle = ';';
        } else {}
        tmpShadow += tmpShadowList[i] + tmpMiddle;
    }
    let tmpStyle1 = 'font-weight:bold; font-size:30px; color: rgb(255, 111, 0);' + tmpShadow;
    let tmpStyle2 = 'color: white; background: rgb(181, 0, 0); font-size: 15px;';
    let tmpStyle3 = 'font-size: 12px;'

    // final console log with vars
    return console.log(
        tmp_nameNversion + tmp_config + tmp_url,
        tmpStyle1, tmpStyle2, tmpStyle3
    );
}

// debug console log out the specific game object
export function DebugConsoleLogOut() {
    let tmpInit = '%c_PGI LogOut_';
    let tmpInfo = ': GUIIdx[' + this.guiIdx + ']';
    let tmpStyle = 'color: white; background: rgb(255, 111, 0);';
    return console.log(tmpInit, tmpStyle, tmpInfo, this);
}