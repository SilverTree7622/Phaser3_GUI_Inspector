
export default class CameraManager {
    constructor() {
        this.scene;
        this.size = { w: 0, h: 0 };
        this.cursorKey;
        this.mainCamera;
        // wheel one const tick gap value
        this.wheelValue = 150;
        // previous follow config
        this.followConfig = { x: 0, y: 0, zoom: 1 };
        this.isFollowing = false;
        // drag values
        this.dragConfig = { x: 0, y: 0, scrollX: 0, scrollY: 0 };
        this.isDraggable = false;
        this.isDebugCamBound = false;
    }
    create(_scene, _debugBox) {
        this.scene = _scene;
        this.createSize(_scene);
        this.createCursorKey(_scene);
        this.createMainCamera(_scene);
        this.createCameraEvent(_scene);
        this.createFollowEvent(_scene, _debugBox);

    }
    update() {
        this.updateDrag();
    }

    getSize() {
        return this.size;
    }
    getCursorKey() {
        return this.cursorKey;
    }
    setFollowConfig() {
        this.followConfig.x = this.mainCamera.midPoint.x;
        this.followConfig.y = this.mainCamera.midPoint.y;
        this.followConfig.zoom = this.mainCamera.zoom;
    }
    getPrevFollowConfig() {
        return this.followConfig;
    }
    setIsFollowing(_bool) {
        this.isFollowing = _bool;
    }
    getIsFollowing() {
        return this.isFollowing;
    }
    setDragStartConfig() {
        this.mainCamera.scrollX = this.dragConfig.scrollX;
        this.mainCamera.scrollY = this.dragConfig.scrollY;
        this.dragConfig.x = this.scene.input.x;
        this.dragConfig.y = this.scene.input.y;
    }
    setDragEndConfig() {
        this.dragConfig.scrollX = this.mainCamera.scrollX;
        this.dragConfig.scrollY = this.mainCamera.scrollY;
    }
    getIsDraggable() {
        return this.isDraggable;
    }
    setIsDraggable(_bool) {
        this.isDraggable = _bool;
    }
    getIsDebugCamBound() {
        return this.isDebugCamBound;
    }
    setIsDebugCamBound(_bool) {
        this.isDebugCamBound = _bool;
    }


    createSize(_scene) {
        this.size.w = _scene.game.config.width;
        this.size.h = _scene.game.config.height;
    }
    createCursorKey(_scene) {
        this.cursorKey = _scene.input.keyboard.createCursorKeys(); // cursor key
    }
    createMainCamera(_scene) {
        this.mainCamera = _scene.cameras.main;
    }
    createCameraEvent(_scene) {
        // when press command SHIFT + SCROLL UP&DOWN, Main Camera zoom changes
        _scene.input.on('wheel', (_pointer, _gameObj, _deltaX, _deltaY, _deltaZ) => {
            if (this.chckCmdShiftKeyDown()) {
                let tmpZoom = this.mainCamera.zoom;
                let tmpGap = (-1) * (_deltaY / (this.wheelValue * 10));
                let tmpCal = tmpZoom + tmpGap;
                // if zoom size under 0.1 & Gap value is minus, no reason to smaller i think
                if (tmpCal <= 0.1 && tmpGap < 0) {}
                else {
                    this.mainCamera.zoomTo(tmpCal, 100);
                }
                // set wheel debug cam bound
                this.setIsDebugCamBound(true);
                // wheel end
                setTimeout(() => {
                    if (tmpCal == this.mainCamera.zoom) {
                        this.setIsDebugCamBound(false);
                    }
                }, 300);
            }
        });

        // SHIFT + RIGTH CLICK to dragging camera scroll position
        _scene.input.on('pointerdown', (_pointer, _gameObj, _dragX, _dragY) => {
            if (this.chckCmdShiftKeyDown() && _pointer.rightButtonDown()) {
                this.setDragStartConfig();
                this.setIsDraggable(true);
            }
        });
        _scene.input.on('pointerup', (_pointer, _gameObj, _dragX, _dragY) => {
            this.setIsDraggable(false);
            if (this.chckCmdShiftKeyDown() && _pointer.rightButtonReleased()) {
                this.setDragEndConfig();
            }
        });
        
        // SHIFT + S get back to default zoom value
        _scene.input.keyboard.on('keyup-S', (_pointer, _gameObj) => {
            if (this.chckCmdShiftKeyDown()) {
                this.set2defaultZoom();
            }
        });
    }
    set2defaultZoom() {
        this.mainCamera.pan(this.size.w/2, this.size.h/2, 250, 'Elastic');
        this.mainCamera.zoomTo(1, 0);
        this.mainCamera.scrollX = 0;
        this.mainCamera.scrollY = 0;
        this.dragConfig.scrollX = 0;
        this.dragConfig.scrollY = 0;
    }
    createFollowEvent(_scene, _debugBox) {
        // main camera just follows focus game obj
        _scene.input.keyboard.on('keyup-A', (_pointer, _gameObj) => {
            let tmpFocusGameObj = _debugBox.getFocusGameObj();
            if (this.chckCmdShiftKeyDown() && tmpFocusGameObj) {
                if (!this.mainCamera._follow) {
                    this.setIsFollowing(true);
                    this.setFollowConfig();
                    this.mainCamera.startFollow(
                        tmpFocusGameObj, true, 0.3, 0.3, 0.5, 0.5
                    );
                }
                else {
                    this.setFollowStop();
                }
                this.setIsDebugCamBound(this.getIsFollowing());
            }
        });
    }
    setFollowStop() {
        if (this.mainCamera._follow) {
            this.setIsFollowing(false);
            let tmpP = this.getPrevFollowConfig();
            this.mainCamera.stopFollow();
            this.mainCamera.pan(tmpP.x, tmpP.y, 250, 'Power2');
            this.mainCamera.zoomTo(tmpP.zoom, 0);
            this.setIsDebugCamBound(this.getIsFollowing());
        }
    }

    updateDrag() {
        if (this.getIsDraggable()) {
            let tmpX = this.dragConfig.scrollX + this.dragConfig.x - this.scene.input.x;
            let tmpY = this.dragConfig.scrollY + this.dragConfig.y - this.scene.input.y;
            this.mainCamera.scrollX = tmpX;
            this.mainCamera.scrollY = tmpY;
        }
    }

    chckCmdShiftKeyDown() {
        let tmpBool = (this.getCursorKey().shift.isDown) ? true : false; // is shift down?
        return tmpBool;
    }
}