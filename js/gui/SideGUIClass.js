
export default class SideGUIClass {
    constructor(_main) {
        this.main = _main;
        this.lib = this.main.sideGUI;
        // if init config noSide = true, then return
        if (!this.main.sideGUI) return;
        this.manager = this.main.manager;
        this.cmdListFolder;
        this.cmdFolder = [];
        this.cmdList = this.initCmdList();
    }
    create(_scene) {
        if (!this.main.sideGUI) return;
        this.createSetConfig();
        this.createModeList(_scene);
        this.createCmdFolder();
    }

    initCmdList() {
        let tmpCL = [];
        tmpCL.push({ name: 'SHIFT + F', description: 'focus on/off GameObj' });
        tmpCL.push({ name: 'SHIFT + LEFT_CLICK', description: 'focus on/off GameObj' });
        tmpCL.push({ name: 'MOUSE_MIDDLE_BTN', description: 'focus on/off GameObj' });
        tmpCL.push({ name: 'SHIFT + V', description: 'on/off Focused GameObj visible' });
        tmpCL.push({ name: 'SHIFT + A', description: 'aim the Focused GameObj for toggling follow' });
        tmpCL.push({ name: 'SHIFT + D', description: 'on/off go 2 the Focused GameObj detail folder' });
        tmpCL.push({ name: 'SHIFT + C', description: 'console log out the Focused GameObj' });
        tmpCL.push({ name: 'SHIFT + RIGHT_CLCIK', description: 'moving main camera via scroll' });
        tmpCL.push({ name: 'SHIFT + WHEEL', description: 'zoom in/out the main camera' });
        tmpCL.push({ name: 'SHIFT + S', description: 'set main camera zoom & scroll values to the default' });
        return tmpCL;
    }

    createSetConfig() {
        // set width & margin px from main GUI
        this.setSideWidthInit();
        this.lib.domElement.style.marginRight = '2px';
    }
    createModeList(_scene) {
        this.lib.addFolder('POINTER_MODE');
        // + SHIFT + Q MOVE MODE
        

        // + SHIFT + W SCALE MODE


        // + SHIFT + E ROTATE MODE
        
    }
    createCmdFolder() {
        this.cmdListFolder = this.lib.addFolder('COMMAND_LIST');
        // add pointer over and out for description (open or close folder)
        for (let i of this.cmdList) {
            let tmpIdx = this.cmdFolder.push(this.cmdListFolder.addFolder(i.name)) - 1;
            let tmpDesc = this.cmdFolder[tmpIdx].addFolder(i.description);
            // set description folder title background color grey
            tmpDesc.domElement.lastChild.lastChild.style.backgroundColor = 'grey';
            tmpDesc.domElement.lastChild.lastChild.style.color = 'black';
            tmpDesc.domElement.lastChild.lastChild.style.webkitTextStrokeWidth = '1px';
            this.cmdFolder[tmpIdx].domElement.addEventListener('pointerover', (_event) => {
                this.setSideWidthExpand();
                this.cmdFolder[tmpIdx].open();
            });
            this.cmdFolder[tmpIdx].domElement.addEventListener('pointerout', (_event) => {
                this.setSideWidthInit();
                this.cmdFolder[tmpIdx].close();
            });
        }
    }


    setSideWidthInit() {
        this.lib.width = 140;
    }
    setSideWidthExpand() {
        this.lib.width = 400;
    }
}