
'use strict';
function Features() {}

Features.prototype = {
  preload: function() {

  },
  create: function() {
      this.shop = this.game.add.sprite(0, 0, 'shop');

      //this.icon0.scale.setTo(.87, .87);
      this.icon1 = new Coin(this.game, 0, 590, 510);
      this.game.add.existing(this.icon1);
      this.icon1.scale.setTo(1.25, 1.25);
      this.icon1.static = true;
      this.icon1.fixFrame(0, 0);
      this.icon2 =  this.game.add.sprite(860, 340, 'coin');
      this.icon2.frame = 1;
      this.icon2.anchor.setTo(.5, .5);
      //this.icon2.scale.setTo(.87, .87);
      this.icon3 =  this.game.add.sprite(860, 530, 'coin');
      this.icon3.frame = 2;
      this.icon3.anchor.setTo(.5, .5);
      this.icon3.scale.setTo(.8, .8);
      
      this.icon0 = this.game.add.sprite(590, 340, 'coin');
      this.icon0.frame = 4;
      this.icon0.anchor.setTo(.5, .5);
      this.icon0.scale.setTo(1.35, 1.35);
      this.cajetilla =  this.game.add.sprite(250, 355, 'cajetilla');
      this.cajetilla.anchor.setTo(.5, .5);
      this.cajetilla.angle = -11;
      //this.cajetilla.scale.setTo(.9, .9);

      this.instructions_1 = this.game.add.sprite(0, 0, 'features_end');


      this.text_1 = this.game.add.text(370, 105, 'MEMORIZA LAS\nCARACTERÍSTICAS DE:', this.game.font_style);
      this.text_1.fill = "#003ca6";
      this.text_1.alpha = 0;
      this.text_1.anchor.set(0.5);
      this.instructions_1.alpha = 0;
      
      // Position elements
      




      // Animate elements
      this.game.add.tween(this.instructions_1).to( { alpha: 1 }, 600, Phaser.Easing.Quartic.Out, true, 240);
      this.game.add.tween(this.text_1).from( { y: -20 }, 420, Phaser.Easing.Back.Out, true, 240);
      
      // In Icons
      var iconTween0 = this.game.add.tween(this.icon0.scale).from( { x: 0, y: 0 }, 980, Phaser.Easing.Elastic.Out, true, 600, 0);
      var iconTween1 = this.game.add.tween(this.icon1.scale).from( { x: 0, y: 0 }, 980, Phaser.Easing.Elastic.Out, true, 800, 0);
      var iconTween2 = this.game.add.tween(this.icon2.scale).from( { x: 0, y: 0 }, 980, Phaser.Easing.Elastic.Out, true, 1000, 0);
      var iconTween3 = this.game.add.tween(this.icon3.scale).from( { x: 0, y: 0 }, 980, Phaser.Easing.Elastic.Out, true, 1200, 0);
      var cajetillaTween = this.game.add.tween(this.cajetilla).from( { alpha: 0, x: this.cajetilla.x + 40 }, 1200, Phaser.Easing.Quartic.Out, true, 1120);


      // Add Footer
      this.footer = this.game.add.sprite(0, 0, 'footer');
      this.footer.alignIn(this.shop, Phaser.BOTTOM_CENTER);



      this.game.time.events.add(Phaser.Timer.SECOND * 8, function(){
        // State Transition
        var slideIn = Phaser.Plugin.StateTransition.Out.SlideLeft;
        var slideOut = Phaser.Plugin.StateTransition.In.SlideLeft;
        slideIn.duration = 1000;
        slideOut.duration = 1000;

        this.game.state.start('gameover', slideIn, slideOut);
      }, this); 
  },


  update: function() {
    //this.star1.angle += .3;
    //this.star2.angle  += .22; 
  }

};

module.exports = Features;
