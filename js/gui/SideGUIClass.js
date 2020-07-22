
export default class SideGUIClass {
    constructor(_main) {
        this.main = _main;
        this.lib = this.main.sideGUI;
        this.manager = this.main.manager;
    }
    create(_scene) {
        console.log('this.lib:', this.lib);
        console.log('this.main.mainGUI:', this.main.mainGUI);

        this.lib.width = 120;
        let tmpValue = this.lib.domElement.style.marginRight = '2px';

        this.lib.addFolder('COMMAND_LIST');
        
    }
}