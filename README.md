
# Phaser3_GUI_inspector

**WARNING)**\
   This is only for phaser3 framework

**DESCRIPTION)**\
	This is a just custom dat.GUI, which works as Phaser3 inspector of each display list stuffs
	***
**EXAMPLE)**\
**IN_HTML)**\
https://cdn.jsdelivr.net/gh/SilverTree7622/Phaser3_GUI_inspector@1.0.5/dist/main.js
**IN_JS)**\

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
mouse command : *click phaser game object with **mouse middle button***\
(if is not already focused, then focus on it\
else is focus off the object)\
	
**NOTATION)**\
	  This is kind of side project so if I got feedback,\
	  then I'll fix it with requests
  
**PLAN)**\
	**ADD ANOTHER)**\
		Add kind of GAME_STATUS_MANAGER stuffs with another dependency JS Lib
    
