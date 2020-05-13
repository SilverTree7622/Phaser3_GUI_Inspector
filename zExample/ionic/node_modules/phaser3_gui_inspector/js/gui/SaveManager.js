
/*
    this should work with (Ctrl + S) command
    included for saving changed GUI touched stuffs
*/

export default class SaveManager {
    constructor(_save) {
        this.saveFunc = _save;
        this.saveQ = [];
        this.date = this.initDate();
    }
    create(_scene) {
        this.createCommand(_scene);
    }
    
    initDate() {
        let tmpD = {};
        tmpD.self = new Date(); // web window API
        tmpD.year = 0;
        tmpD.month = 0;
        tmpD.day = 0;
        tmpD.time = 0;
        tmpD.tot = undefined;
        return tmpD;
    }
    createCommand(_scene) {
        _scene.input.keyboard.on('keydown_S', (_event) => {
            if (_event.ctrlKey || _event.shiftKey) {
                this.useSaveFunc();
            }
        });
    }
    useSaveFunc() {
        // console.log('use save method function');
        try {
            this.saveFunc();
        } catch (e) {}
    }
    saveConfig(_config) {
        let tmpObj = {};
        tmpObj.name = _config.name;
        tmpObj.type = _config.type;
        tmpObj.texture = _config.texture;
        tmpObj.date = this.getDate();
        this.push2saveQ();
    }
    getDate() {
        let tD = this.date;
        tD.year = tD.self.getFullYear();
        tD.month = tD.self.getMonth();
        tD.day = tD.self.getDay();
        tD.time = tD.self.now();
        tD.tot = tD.year + '/' + tD.month + '/' + tD.day + '/' + tD.time;
        // console.log('tD.tot:', tD.tot);
    }
    push2saveQ(_obj) {
        this.saveQ.push(_obj);
    }
}