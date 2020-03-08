
import GUIMain from './DatGUI/index.js';
import StatsMain from './Stats/index.js';

export default class LibClass {
    constructor(_cssObj) {
        this.stats = new StatsMain(_cssObj);
        this.GUI = new GUIMain(_cssObj);
    }
    // stats
    getStats() {
        return this.stats;
    }
    getStatsSelf() {
        return this.stats.getStats();
    }
    // GUI
    getGUI() {
        return this.GUI;
    }
    getGUILib() {
        return this.GUI.getLib();
    }
    getGUIcss() {
        return this.GUI.getcss();
    }

    // EXTERNAL
    addFolderInBasic(_basic) { // add in basic folder with events
        let tmpcss = this.getGUIcss();
        // gui & stats alpha
        _basic.add(tmpcss, 'alpha').min(0.1).max(1.0).step(0.02)
        .onChange( this.setAlphaInGUINStats.bind(this) );
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
}