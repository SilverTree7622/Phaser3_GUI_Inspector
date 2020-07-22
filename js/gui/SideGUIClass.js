
export default class SideGUIClass {
    constructor(_main) {
        this.main = _main;
        this.lib = this.main.sideGUI;
        if (!this.main.sideGUI) {
            return;
        }
        this.manager = this.main.manager;
        this.cmdFolder;
        this.cmdList = this.initCmdList();
    }
    create(_scene) {
        if (!this.main.sideGUI) {
            return;
        }
        console.log('this.lib:', this.lib);
        this.createSetConfig();
        this.createCmdFolder();
    }

    initCmdList() {
        let tmpCL = [];
        tmpCL.push('SHIFT + V');

        return tmpCL;
    }

    createSetConfig() {
        this.lib.width = 120;
        this.lib.domElement.style.marginRight = '2px';
    }
    createCmdFolder() {
        this.cmdFolder = this.lib.addFolder('COMMAND_LIST');
        // add pointer over and out for description (open or close folder)
        for (let i of this.cmdList) {
            this.cmdFolder.addFolder(i);
        }
    }
}