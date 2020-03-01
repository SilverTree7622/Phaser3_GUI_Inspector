
# Phaser3_GUI_inspector

**WARNING)**\
&nbsp;&nbsp;&nbsp;&nbsp;This is only for phaser3 framework

**DESCRIPTION)**\
&nbsp;&nbsp;&nbsp;&nbsp;This is a just custom dat.GUI, which works as Phaser3 inspector of each display list stuffs
	***
**EXAMPLE)**\
&nbsp;&nbsp;&nbsp;&nbsp;**IN_HTML)**\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://cdn.jsdelivr.net/gh/SilverTree7622/Phaser3_GUI_inspector@latest/dist/PGInspector.min.js \
&nbsp;&nbsp;&nbsp;&nbsp;**IN_JS)**\

	function create() {
	    /*
	    * your any codes
	    */
	    // should call this function at the end of Phaser.Scene create function
	    PhaserDatActionWithScene(this);
		// or
		PhaserDatActionWithScene({
			scene: this,
			alpha: 0.6 // 0.0 ~ 1.0 (anyvalue, you can change it in GUI)
		});
	  }
**USAGE)**\
&nbsp;&nbsp;&nbsp;&nbsp;mouse command : *click phaser game object with **mouse middle button***\
&nbsp;&nbsp;&nbsp;&nbsp;(if is not already focused, then focus on it\
&nbsp;&nbsp;&nbsp;&nbsp;else is focus off the object)\
	
**NOTATION)**\
&nbsp;&nbsp;&nbsp;&nbsp;This is kind of side project so if I got feedback,\
&nbsp;&nbsp;&nbsp;&nbsp;then I'll fix it with requests
  
**PLAN)**\
&nbsp;&nbsp;&nbsp;&nbsp;**ADD ANOTHER)**\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add kind of GAME_STATUS_MANAGER stuffs with another dependency JS Lib.
    
