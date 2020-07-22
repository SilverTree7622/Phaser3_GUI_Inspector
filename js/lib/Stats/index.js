
import Stats from './StatsLib.js'; // import GUI CSS

export default class StatsMain {
    constructor(_cssObj) {
        this.self = new Stats();
        this.body = undefined;
        this.alpha = this.initAlpha(_cssObj);
        this.initShowStats();
    }
    initAlpha(_cssObj) {
        let tmpDefaultValue = 0.8;
        let tmpValue = (_cssObj.alpha) ? _cssObj.alpha : tmpDefaultValue;
        return tmpValue;
    }
    initShowStats() {
        this.self.showPanel(0);
        this.self.dom.style.opacity = this.alpha;
        this.body = document.body.appendChild(this.self.dom);
        requestAnimationFrame(this.statsAnimate.bind(this));
    }
    statsAnimate() {
        this.self.begin();
        this.self.end();
        requestAnimationFrame(this.statsAnimate.bind(this));
    }
    getStats() {
        return this.self;
    }
    setAlphaInStats(_alpha) {
        this.body.style.opacity = _alpha;
    }
}