
import { JOINT_SI } from '../utils/GlobalJoint.js';

export default class SideGUIClass {
    constructor(_main) {
        JOINT_SI.setSide(this);
        this.main = _main;
        this.lib = this.main.sideGUI;
        if (!this.lib) return;
        this.manager = this.main.manager;
        this.modeFolder;
        this.textList = [
            'M____ / S____ / A____ / None ',
            'Moves / S____ / A____ / N___ ',
            'M____ / Scale / A____ / N___ ',
            'M____ / S____ / Angle / N___ ',
        ];
        this.modeFolderDesc;
        this.modeFolderChild;
        this.cmdListFolder;
        this.cmdFolder = [];
        this.cmdList = this.initCmdList();
    }
    create(_scene) {
        if (!this.lib) return;
        this.createSetConfig();
        this.createModeList(_scene);
        this.createCmdFolder();
    }

    initCmdList() {
        let tmpCL = [];
        tmpCL.push({ name: 'SHIFT + F', description: 'focus on/off GameObj' });
        tmpCL.push({ name: 'SHIFT + LEFT_CLICK', description: 'focus on/off GameObj but difference in Pointer Mode' });
        tmpCL.push({ name: 'MOUSE_MIDDLE_BTN', description: 'focus on/off GameObj' });
        tmpCL.push({ name: 'SHIFT + V', description: 'on/off Focused GameObj visible' });
        tmpCL.push({ name: 'SHIFT + A', description: 'aim the Focused GameObj for toggling follow' });
        tmpCL.push({ name: 'SHIFT + D', description: 'on/off go 2 the Focused GameObj detail folder' });
        tmpCL.push({ name: 'SHIFT + C', description: 'console log out the Focused GameObj' });
        tmpCL.push({ name: 'SHIFT + RIGHT_CLCIK', description: 'moving main camera via scroll' });
        tmpCL.push({ name: 'SHIFT + WHEEL', description: 'zoom in/out the main camera' });
        tmpCL.push({ name: 'SHIFT + S', description: 'set main camera zoom & scroll values to the default' });
        tmpCL.push({ name: 'SHIFT + Q, W, E, R', description: 'set Pointer Mode(Q, W, E), set to normal(R) / control with SHIFT + LEFT CLICK' });
        return tmpCL;
    }

    createSetConfig() {
        // set width & margin px from main GUI
        this.setSideWidthInit();
        this.lib.domElement.style.marginRight = '2px';
    }
    createModeList(_scene) {
        this.modeFolder = this.lib.addFolder('POINTER_MODE');
        this.modeFolder.open();
        this.modeFolderDesc = this.modeFolder.addFolder(this.textList[0]);
        this.modeFolderChild = this.modeFolderDesc.domElement.lastChild.lastChild;
        this.modeFolderChild.style.backgroundColor = 'grey';
        this.modeFolderChild.style.color = 'black';
        this.modeFolderChild.style.webkitTextStrokeWidth = '1px';
    }
    // Command List Info
    createCmdFolder() {
        this.cmdListFolder = this.lib.addFolder('COMMAND_LIST');
        // add pointer over and out for description (open or close folder)
        for (let i of this.cmdList) {
            let tmpIdx = this.cmdFolder.push(this.cmdListFolder.addFolder(i.name)) - 1;
            let tmpDesc = this.cmdFolder[tmpIdx].addFolder(i.description);
            let tmpChild = tmpDesc.domElement.lastChild.lastChild;
            // set description folder title background color grey
            tmpChild.style.backgroundColor = 'grey';
            tmpChild.style.color = 'black';
            tmpChild.style.webkitTextStrokeWidth = '1px';
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
        this.lib.width = 176;
    }
    setSideWidthExpand() {
        this.lib.width = 400;
    }
    signalFromInput(_idx) {
        if (this.lib) {
            this.setPointerModeText(_idx);
        }
    }
    setPointerModeText(_idx) {
        this.modeFolderChild.innerText = this.textList[_idx];
    }
}