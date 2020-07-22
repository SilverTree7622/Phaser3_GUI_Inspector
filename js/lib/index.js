
import GUIMain from './DatGUI/index.js';
import StatsMain from './Stats/index.js';

export default class LibClass {
    constructor(_tmpHandOverObj) {
        this.stats = new StatsMain(_tmpHandOverObj.css);
        this.GUI = new GUIMain(_tmpHandOverObj);
    }
    // stats
    getStats() {
        return this.stats;
    }
    getStatsSelf() {
        return this.stats.getStats();
    }
    // EXTERNAL GUI
    getGUI() {
        return this.GUI;
    }
    getGUILib() {
        return this.getGUI().getLib();
    }
    getGUISide() {
        return this.getGUI().getSide();
    }
    getGUIcss() {
        return this.getGUI().getcss();
    }
    getGUIcssObj() {
        return this.getGUI().getcssObj();
    }
    // destroy GUI
    destroyGUI() {
        this.getGUI().destroy();
    }

    // EXTERNAL : GUI
    addFolderInBasic(_basic) { // add in basic folder with events
        let tmpcss = this.getGUIcss();
        // gui & stats alpha
        _basic.add(tmpcss, 'alpha').min(0.1).max(1.0).step(0.02)
        .onChange( this.setAlphaInGUINStats.bind(this) );
        
        // // DEFERRED
        // // gui color
        // _basic.addColor(this, 'color')
        // .onChange( this.setColorInGUI.bind(this) );

        // gui posXY (right, top)
        _basic.add(tmpcss.posXY, 'right').step(1)
        .onChange( tmpcss.setPosXYInGUI.bind(tmpcss) );
        _basic.add(tmpcss.posXY, 'top').step(1)
        .onChange( tmpcss.setPosXYInGUI.bind(tmpcss) );
    }
    setAlphaInGUINStats() {
        let tmpcss = this.getGUIcss();
        let tmpAlpha = tmpcss.getAlpha();
        let tmpStats = this.getStats();
        tmpcss.setAlphaInGUI.apply(tmpcss);
        tmpStats.setAlphaInStats.apply(tmpStats, [tmpAlpha]);
    }

    // EXTERNAL : Side


    // EXTERNAL : Main
    callbackCSSstringSkipped() {
        this.GUI.callbackCSSstringSkipped();
    }
}