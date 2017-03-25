'use strict';

// DELCARE MODULE
var Instructions = function (){};
Instructions.prototype = {

  /*--------------------------------------
    ON CREATE
  ---------------------------------------*/
  create: function() {

      ///////////////////////////
      // BACKGROUND
      ///////////////////////////
      this.shop = this.game.add.sprite(0, 0, 'shop');
      this.guide = this.game.add.sprite(0, 0, 'guy_guide');
      this.guide.alignIn(this.shop, Phaser.BOTTOM_CENTER);
      this.guide.y = this.guide.y - 120;


      ///////////////////////////
      // FOOTER
      ///////////////////////////
      this.footer = this.game.add.sprite(0, 0, 'footer');
      this.footer.alignIn(this.shop, Phaser.BOTTOM_CENTER);


      ///////////////////////////
      // INSTRUCTIONS
      ///////////////////////////
      this.instructions_2 = this.game.add.sprite(0, 0, 'instructions_2');
      this.instructions_3 = this.game.add.sprite(0, 0, 'instructions_3');
      this.instructions_4 = new Phaser.Group(this.game);
      this.instructions_4.x = this.game.world.centerX;
      this.instructions_4.y = this.game.world.centerY - 50;



      ///////////////////////////
      // STAR
      ///////////////////////////
      /// Create background
      this.star2 =  new Phaser.Group(this.game);
      var star = this.star2.create(0, 0, 'star');
      star.anchor.setTo(.5, .5);
      this.instructions_4.add(this.star2);

      // Header
      this.star_text = this.game.add.text(-5, 0, '¡A JUGAR!', this.game.font_style, this.instructions_4);
      this.star_text.anchor.setTo(.5, .5);
      this.star_text.fill = '#14a8d3';
      this.star_text.font = 'Neutra Text Bold';
      this.star_text.fontSize = '52pt';
      this.star_text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);



      ///////////////////////////
      // INSTRUCCIONES HEADERS
      ///////////////////////////
      this.text_2 = this.game.add.text(370, 105, 'DESLIZA LA CAJETILLA\nCON EL DEDO Y ATRAPA\nLAS CARACTERÍSTICAS DE:', this.game.font_style);
      this.text_2.alpha = 0;
      this.text_2.fill = "#003ca6";
      this.text_2.fontSize = '30pt';
      this.text_2.anchor.set(0.5);

      this.text_3 = this.game.add.text(370, 105, 'SI TE EQUIVOCAS\nDE CARACTERÍSTICA,\nPIERDES PUNTOS', this.game.font_style);
      this.text_3.alpha = 0;
      this.text_3.fill = "#003ca6";
      this.text_3.anchor.set(0.5);

      //this.instructions_2.alpha = 0;
      this.instructions_3.alpha = 0;
      this.instructions_4.alpha = 0;




      ///////////////////////////
      // INIT ANIMATION
      ///////////////////////////
      this.initAnimation();




      ///////////////////////////
      // PLAY NEXT SCENE
      ///////////////////////////
      this.game.time.events.add(Phaser.Timer.SECOND * 15, function(){
        // State Transition
        var slideIn = Phaser.Plugin.StateTransition.Out.SlideLeft;
        var slideOut = Phaser.Plugin.StateTransition.In.SlideLeft;
        slideIn.duration = 1000;
        slideOut.duration = 1000;
        this.game.state.start('play', slideIn, slideOut);
      }, this); 
  },





  /*--------------------------------------
    INIT ANIMATION
  ---------------------------------------*/
  initAnimation: function(){

    // Animate elements
    this.game.add.tween(this.instructions_2).to( { alpha: 0 }, 10, Phaser.Easing.Quartic.Out, true, 8000);
    this.game.add.tween(this.instructions_3).to( { alpha: 1 }, 600, Phaser.Easing.Quartic.Out, true, 8000);

    this.game.add.tween(this.instructions_3).to( { alpha: 0 }, 10, Phaser.Easing.Quartic.Out, true, 13000);
    this.game.add.tween(this.instructions_4.scale).from( { x: 0, y: 0 }, 600, Phaser.Easing.Back.Out, true, 13000);
    this.game.add.tween(this.instructions_4).to( { alpha: 1 }, 600, Phaser.Easing.Quartic.Out, true, 13000);
    this.game.add.tween(this.text_3).to( { alpha: 0 }, 10, Phaser.Easing.Quartic.Out, true, 13000);


    // Play intro sound FX after a fixed interval
    this.game.time.events.add(Phaser.Timer.SECOND * 13, function(){
      this.game.fx_state.play();
    }, this);
  }

};


// EXPORT MODULE
module.exports = Instructions;
