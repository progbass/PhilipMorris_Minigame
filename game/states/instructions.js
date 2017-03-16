
'use strict';
function Instructions() {}

Instructions.prototype = {
  preload: function() {

  },
  create: function() {
      this.shop = this.game.add.sprite(0, 0, 'shop');
      this.guide = this.game.add.sprite(0, 0, 'guy_guide');

      
      // Add Footer
      this.footer = this.game.add.sprite(0, 0, 'footer');
      this.footer.alignIn(this.shop, Phaser.BOTTOM_CENTER);


      this.instructions_2 = this.game.add.sprite(0, 0, 'instructions_2');
      this.instructions_3 = this.game.add.sprite(0, 0, 'instructions_3');
      this.instructions_4 = new Phaser.Group(this.game);
      this.instructions_4.x = this.game.world.centerX;
      this.instructions_4.y = this.game.world.centerY - 50;


      this.star2 =  new Phaser.Group(this.game);
      //var starShadow = this.star2.create(-10, -10, 'star');
      //starShadow.tint = 0x000000;
      //starShadow.anchor.setTo(.5, .5);
      //starShadow.alpha = .2;
      var star = this.star2.create(0, 0, 'star');
      star.anchor.setTo(.5, .5);
      this.instructions_4.add(this.star2);


      this.star_text = this.game.add.text(-5, 0, '¡A JUGAR!', this.game.font_style, this.instructions_4);
      this.star_text.anchor.setTo(.5, .5);
      this.star_text.font = 'Neutra Text Bold';

      this.star_text.fill = '#14a8d3';
      this.star_text.fontSize = '52pt';
      this.star_text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);



      this.text_2 = this.game.add.text(370, 105, 'DESLIZA LA CAJETILLA\nCON EL DEDO Y ATRAPA\nLAS CARACTERÍSTICAS DE:', this.game.font_style);
      this.text_3 = this.game.add.text(370, 105, 'SI TE EQUIVOCAS\nDE CARACTERÍSTICA,\nPIERDES PUNTOS', this.game.font_style);

      this.text_2.fill = "#003ca6";
      this.text_3.fill = "#003ca6";
      //this.instructions_2.alpha = 0;
      this.instructions_3.alpha = 0;
      this.instructions_4.alpha = 0;
      //this.guide.alpha = 0;
      this.text_2.alpha = 0;
      this.text_3.alpha = 0;

      this.text_2.fontSize = '30pt';
      //this.text_3.fontSize = '27pt';
      //this.text_1.lineSpacing = -14;
      //this.text_2.lineSpacing = -8;
      //this.text_3.lineSpacing = -8;
      this.text_2.anchor.set(0.5);
      this.text_3.anchor.set(0.5);

      
      // Position elements
      this.guide.alignIn(this.shop, Phaser.BOTTOM_CENTER);
      this.guide.y = this.guide.y - 120;
      




      // Animate elements
      //this.game.add.tween(this.instructions_2).to( { alpha: 1 }, 600, Phaser.Easing.Quartic.Out, true, 200);
      //this.game.add.tween(this.guide).to( { alpha: 1 }, 600, Phaser.Easing.Quartic.Out, true, 200);

      this.game.add.tween(this.instructions_2).to( { alpha: 0 }, 10, Phaser.Easing.Quartic.Out, true, 7000);
      this.game.add.tween(this.instructions_3).to( { alpha: 1 }, 600, Phaser.Easing.Quartic.Out, true, 7000);

      this.game.add.tween(this.instructions_3).to( { alpha: 0 }, 10, Phaser.Easing.Quartic.Out, true, 12000);
      this.game.add.tween(this.instructions_4.scale).from( { x: 0, y: 0 }, 600, Phaser.Easing.Back.Out, true, 12000);
      this.game.add.tween(this.instructions_4).to( { alpha: 1 }, 600, Phaser.Easing.Quartic.Out, true, 12000);
      this.game.add.tween(this.text_3).to( { alpha: 0 }, 10, Phaser.Easing.Quartic.Out, true, 12000);
  

      // Play intro sounf
      this.game.time.events.add(Phaser.Timer.SECOND * 12, function(){
        this.game.fx_state.play();
      }, this);

      // Go To Next Scene
      this.game.time.events.add(Phaser.Timer.SECOND * 14, function(){
        // State Transition
        var slideIn = Phaser.Plugin.StateTransition.Out.SlideLeft;
        var slideOut = Phaser.Plugin.StateTransition.In.SlideLeft;
        slideIn.duration = 1000;
        slideOut.duration = 1000;
        this.game.state.start('play', slideIn, slideOut);
      }, this); 
  },


  update: function() {
    //this.star1.angle += .3;
    //this.star2.angle  += .22; 
  }

};

module.exports = Instructions;
