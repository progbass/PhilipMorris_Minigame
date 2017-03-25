'use strict';

// DECLARE MODULE
function Boot(){};
Boot.prototype = {

	/*--------------------------------------
	    ON PRELOAD
	---------------------------------------*/
  	preload: function() {},



	/*--------------------------------------
	    ON CREATE
	---------------------------------------*/
	create: function() {
		///////////////////////////
		// SCALE MANAGER
		///////////////////////////
	    this.game.scale.maxWidth = 1024;
	    this.game.scale.maxHeight = 768;
		this.game.scale.forceLandscape = true;
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.refresh();


  		///////////////////////////
		// STAGE PROPERTIES
		///////////////////////////
  		//this.game.stage.backgroundColor = '#6fb989';
	  	this.game.input.maxPointers = 1;


	  	///////////////////////////
		// PLAY NEXT SCENE
		///////////////////////////
	    this.game.state.start('preload');
	}
};

// EXPORT MODULE
module.exports = Boot;

