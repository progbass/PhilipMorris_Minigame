'use strict';

//DECLARE MODULE
function Features(){};
Features.prototype = {

  /*--------------------------------------
    ON CREATE
  ---------------------------------------*/
  create: function() {
      ///////////////////////////
      // BACKGROUND
      ///////////////////////////
      this.shop = this.game.add.sprite(0, 0, 'shop');


      ///////////////////////////
      // ICONS
      ///////////////////////////
      this.icon1 = new Coin(this.game, 0, 260, 535, 0);
      this.game.add.existing(this.icon1);
      this.icon1.scale.setTo(1.25, 1.25);
      this.icon1.static = true;
      //this.icon1.fixFrame(0, 0);

      // Icon 2
      this.icon2 =  this.game.add.sprite(530, 360, 'coin');
      this.icon2.frame = 1;
      this.icon2.anchor.setTo(.5, .5);

      // Icon 3
      this.icon3 =  this.game.add.sprite(530, 550, 'coin');
      this.icon3.frame = 2;
      this.icon3.anchor.setTo(.5, .5);
      this.icon3.scale.setTo(.8, .8);
      
      // Icon 4
      this.icon0 = this.game.add.sprite(260, 360, 'coin');
      this.icon0.frame = 4;
      this.icon0.anchor.setTo(.5, .5);
      this.icon0.scale.setTo(1.35, 1.35);

      // Cajetilla
      this.cajetilla =  this.game.add.sprite(850, 355, 'cajetilla');
      this.cajetilla.anchor.setTo(.5, .5);

      // Instrucciones
      this.instructions_1 = this.game.add.sprite(0, 0, 'instructions_1');

      // Header
      this.text_1 = this.game.add.text(370, 105, 'MEMORIZA LAS\nCARACTERÍSTICAS DE:', this.game.font_style);
      this.text_1.fill = "#003ca6";
      this.text_1.alpha = 0;
      this.text_1.anchor.set(0.5);
      this.instructions_1.alpha = 0;

      // Add Footer
      this.footer = this.game.add.sprite(0, 0, 'footer');
      this.footer.alignIn(this.shop, Phaser.BOTTOM_CENTER);


      ///////////////////////////
      // INIT ANIMATION
      ///////////////////////////
      this.initAnimation();


      ///////////////////////////
      // PLAY NEXT SCENE
      ///////////////////////////
      // Go To Next Scene
      this.nextScene = 'instructions';
      this.delay = Phaser.Timer.SECOND * 6;

      // Play scene after a fixed time interval
      this.game.time.events.add(this.delay, function(){
        // State Transition
        var slideIn = Phaser.Plugin.StateTransition.Out.SlideLeft;
        var slideOut = Phaser.Plugin.StateTransition.In.SlideLeft;
        slideIn.duration = 1000;
        slideOut.duration = 1000;

        this.game.state.start(this.nextScene, slideIn, slideOut);
      }, this); 
  },





  /*--------------------------------------
    INIT ANIMATION
  ---------------------------------------*/
  initAnimation: function(){

    // Animate elements
    this.game.add.tween(this.instructions_1).to( { alpha: 1 }, 600, Phaser.Easing.Quartic.Out, true, 240);
    this.game.add.tween(this.text_1).from( { y: -20 }, 420, Phaser.Easing.Back.Out, true, 240);
    
    // In Icons
    var iconTween0 = this.game.add.tween(this.icon0.scale).from( { x: 0, y: 0 }, 980, Phaser.Easing.Elastic.Out, true, 600, 0);
    var iconTween1 = this.game.add.tween(this.icon1.scale).from( { x: 0, y: 0 }, 980, Phaser.Easing.Elastic.Out, true, 800, 0);
    var iconTween2 = this.game.add.tween(this.icon2.scale).from( { x: 0, y: 0 }, 980, Phaser.Easing.Elastic.Out, true, 1000, 0);
    var iconTween3 = this.game.add.tween(this.icon3.scale).from( { x: 0, y: 0 }, 980, Phaser.Easing.Elastic.Out, true, 1200, 0);
    var cajetillaTween = this.game.add.tween(this.cajetilla).from( { alpha: 0, x: this.cajetilla.x + 40 }, 1200, Phaser.Easing.Quartic.Out, true, 1120);

  }

};

//EXPORT MODULE
module.exports = Features;
