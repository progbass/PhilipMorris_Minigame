
  'use strict';
  function Play(){};


  Play.prototype = {
    hero_dragged: false,
    loop_spawner: 0,
    render: function () {
      // Display
      //this.game.debug.bodyInfo(this.hero, 32, 32);
      //this.game.debug.body(this.hero);
    },
    
    create: function() {
      var scope = this;

      // Reset Properties
      this.gameInit = false;
      this.hero_dragged = false;
      this.loop_spawner = 0;
      this.game.level_speed = 1;
      this.game.level = 1;
      this.game.score = 0;
      this.game.coins_total = 0;
      this.game.coins_single = 0;
      this.game.coins_same_time = 2;
      this.grid = {
        cols: 5,
        slots: 10,
        slot_width: 190,
        slot_height: 127,
        slots_available: []
      }


      // Background
      this.back = this.game.add.sprite(0, 0, 'shop');

      // Drag Line Path
      this.guide = this.game.add.sprite(0, 0, 'guy_guide');
      this.guide.alignIn(this.back, Phaser.BOTTOM_CENTER);
      this.guide.y = this.guide.y - 120;



      // Coin Group
      this.coinsGroup = this.game.add.physicsGroup();

      // Reset all position grid slots
      for(var i = 0; i < this.grid.cols; i++){
        this.grid.slots_available[i] =  true;
      }
      
      


      // Hero
      this.hero = this.game.add.sprite(this.world.width/2, 580, 'guy');
      this.hero.anchor.setTo(0.5, 0.5);
      this.hero.scale.setTo(0.9, 0.9);
      this.game.physics.arcade.enable(this.hero);
      this.hero.body.setSize(this.hero.body.width - 17, this.hero.body.height - 160, 8, 10);
      this.hero.body.collideWorldBounds = true;
      this.hero.body.bounce.setTo(1,1);
      //this.hero.body.velocity.x = 400; //this.game.rnd.integerInRange(-250,250);
      this.hero.inputEnabled = true;
      this.hero.input.useHandCursor = true;

      // Hero Events
      this.hero.events.onInputDown.add(this.startDrag, this);
      this.hero.events.onInputUp.add(this.stopDrag, this);





      // Overlay
      this.error_overlay = this.game.add.sprite(0, 0, 'overlay');
      this.error_overlay.alpha = 0;





      // Footer
      this.footer = this.game.add.sprite(0, 0, 'footer');
      this.footer.alignIn(this.back, Phaser.BOTTOM_CENTER);





      // Back Button
      this.back_display = this.game.add.text(this.game.world.width - 285, 45, '< REGRESAR', this.game.font_style);
      this.back_display.fontSize = '23pt';
      this.back_display.fill = '#124f8e';
      this.back_display.inputEnabled = true;
      this.back_display.events.onInputUp.add(function () {
        this.game.endGame = false;

        // Start Game Over State
        var slideIn = Phaser.Plugin.StateTransition.Out.SlideRight;
        var slideOut = Phaser.Plugin.StateTransition.In.SlideRight;
        slideIn.duration = 2e3;
        slideOut.duration = 2e3;
        this.game.state.start('features_intro', slideIn, slideOut);
      }, this);





      // Score Display
      this.score_display = this.game.add.text(110, 45, 'Puntaje: 0', this.game.font_style);
      this.score_display.fontSize = '23pt';




      // Timer Display
      this.timeup_base = this.game.add.sprite(30, 35, 'counter');
      this.timeup_display = this.game.add.text(58, 60, '60', this.game.font_style);
      this.timeup_display.fontSize = '23pt';
      this.timeup_display.anchor.set(0.5);
      this.timeup_display.setTextBounds()
      this.timeup_timer = this.game.time.create();
      this.timeup_event = this.timeup_timer.add(this.game.total_timeup, this.timeupEnd, this);
      this.timeup_tick = this.game.time.create();//Phaser.Timer.SECOND, this.updateTimeup, this);
      this.timeup_tick_event = this.timeup_tick.loop(Phaser.Timer.SECOND, this.updateTimeup, this);
      

      


      // Pause button
      this.pause_label = this.game.add.sprite(this.game.world.width - 95, 35, 'pause');//this.game.add.text(this.game.world.width - 200, 20, 'Pause', this.game.font_style);
      this.pause_label.scale.setTo(.65, .65);
      this.pause_label.inputEnabled = true;
      this.pause_label.events.onInputUp.add(function () {
          this.game.paused = true;
          //this.pause_label.tint = 16711680;
      }, this);

      this.game.input.onDown.add(function() {
          if (this.game.paused) this.game.paused = false;
          this.pause_label.tint = 16777215;
      }, this);





      // Level Display
      this.modalWindow_visible = false;
      this.levelDisplayGroup = new Phaser.Group(this.game);
      var level_overlay = this.game.add.graphics(0,0);
      // create graphic
      level_overlay.beginFill(0x000000, .5);
      level_overlay.boundsPadding = 0;
      level_overlay.drawRect(0, 0, this.game.width, this.game.height);
      // draw graphic to screen
      this.levelDisplayGroup.add(level_overlay);

      //  Create a Rectangle
      this.level_label = new Phaser.Text(this.game, this.game.world.centerX, this.game.world.centerY-40, 'NIVEL '+this.game.level, this.game.font_style);
      this.level_label.font = 'Neutra Text Bold';
      this.level_label.anchor.setTo(.5,.5);
      this.level_label.fontSize = '62pt';
      this.level_label.fill = '#ffffff';
      this.levelDisplayGroup.add(this.level_label);
      this.levelDisplayGroup.alpha = 0;

      this.level_timer_update = this.game.time.create();
      this.level_event_update = this.level_timer_update.loop(Phaser.Timer.SECOND * 15, function(){
        
        // If the main timer has stopped, stop level updates
        if(!this.timeup_timer.running){
          this.level_timer_update.stop();
          return;
        }


        // Update game level
        this.game.level++;

        // Show Overlay
        var level = Math.round(this.timeup_event.delay - this.timeup_timer.ms) / 1000;
        this.updateLevel();
        this.showLevel();

      }, this);


      // Wait some time before initializing the game
      this.initDelayTimer = this.game.time.events.add(Phaser.Timer.SECOND, this.initGame, this);

    },


    initGame: function(){
      // remove init delay timer;
      this.game.time.events.remove(this.initDelayTimer );

      // Show Level
      this.updateLevel();
      this.showLevel();

      // Init Timeeup
      this.timeup_timer.start();
      this.timeup_tick.start();
      this.level_timer_update.start();

      // Game Init Flag (Start to Sawn Enemies)
      this.gameInit = true;
    },


    updateLevel: function(){
      var level = this.game.level;
      this.game.coins_same_time++;
      switch(level){
        case 2:
          break;
      }

      if(this.game.level > 1){
        this.game.level_speed++;
      }

      // Play Sound
      if(this.game.level > 1)
        this.game.fx_state.play();


      if(this.game.coins_same_time >= this.game.coins_max){
        this.game.coins_same_time = this.game.coins_max;
      }
    },
    showLevel: function(){
      // Update Level Text
      this.level_label.text = 'NIVEL '+this.game.level;

      // Update modal window state
      this.modalWindow_visible = true;

      // tween sprite
      var tween = this.game.add.tween(this.levelDisplayGroup).to( { alpha: 1 }, 400, Phaser.Easing.Cubic.Out, true);
      var tween2 = this.game.add.tween(this.levelDisplayGroup).to( { alpha: 0 }, 400, Phaser.Easing.Cubic.Out, false, 1400);
      tween.chain(tween2);
      tween2.onComplete.add(function (){
        // Update modal window state
        this.modalWindow_visible = false;
      }, this);
    },

    updateTimeup: function(){

      var remaining_seconds = Math.ceil( (this.timeup_event.delay - this.timeup_timer.ms) / 1000 )

      if(remaining_seconds < 6){
        this.timeup_display.fill = "#ff0000"; 
        this.timeup_display.fontSize = "28pt"; 
        
        //this.game.fx_seconds.stop();
        this.game.fx_seconds.play();
      }

      this.timeup_display.text = remaining_seconds; 
    },

    timeupEnd: function(){
      this.timeup_tick.stop();
      this.timeup_timer.stop();


      // Wait some time before initializing the game
      this.gameoverDelayTimer = this.game.time.events.add(Phaser.Timer.SECOND * 2.5, this.gameOver, this);
    },

    gameOver: function(){
      // Play state
      this.game.endGame = true;

      // Start Game Over State
      var slideIn = Phaser.Plugin.StateTransition.Out.SlideLeft;
      var slideOut = Phaser.Plugin.StateTransition.In.SlideLeft;
      slideIn.duration = 2e3;
      slideOut.duration = 2e3;
      this.game.state.start('features_end', slideIn, slideOut);
    },


    startDrag: function(){
      this.hero_dragged = true;
    },

    stopDrag: function(){
      this.hero_dragged = false;
    },

    update: function() {


      /////////////////////////////////////
      /// HERO DRAG
      /////////////////////////////////////
      /// Check for collisions
      this.game.physics.arcade.overlap(
        this.hero,
        this.coinsGroup,
        this.getCoin,
        this.processHandler,
        this
      );
           
      // If mouse is being dragged 
      if( this.hero_dragged ){
        // If body exists, follow pointer
        if( this.hero.body != null ){
          var destx = this.game.input.activePointer.worldX - this.hero.body.width/2;
          var distx = (destx - this.hero.body.x) * .2;
          this.hero.body.x += distx;
          // this.hero.body.y = this.game.input.activePointer.worldY;
        }
      }



      /////////////////////////////////////
      /// COINS SPAWN
      //console.log(this.coinsGroup.countLiving(), this.game.coins_same_time)
      if (this.coinsGroup.countLiving() < this.game.coins_same_time-1 && !this.modalWindow_visible && this.gameInit ) {
          // Spawn new Coin
          this.spawnCoin();
      }
    },

    processHandler: function(player, veg){
      return true;
    },

    
    updateScore: function(){
      if(this.game.score <= 0){
        this.game.score = 0;
      }

      this.score_display.text = 'Puntaje: '+this.game.getFormattedScore(); 
    },

    getCoin: function(_body1, _body2){

      // Check Coin Type for calculating score
      var points_content;
      var points_flag = true;
      if(_body2.valid){
        points_content = '+100';
        this.game.score += 100;
        this.updateScore();
        this.game.fx_good.play();

      } else {
        points_content = '-50';
        points_flag = false;
        this.game.score -= 50;
        this.updateScore();
        this.game.fx_bad.play();

        // Show Overlay
        this.showOverlay();
      }

      // Display Points
      this.pointsDisplay(points_content, {x: _body2.x, y: _body2.y}, points_flag);


      // Kill Sprite
      _body2.kill();
    },


    pointsDisplay: function(_content, _location, _flag){
      var points_sprite = new HitDisplay(this.game, _content, this.game.font_style, _flag);
      points_sprite.x =  _location.x;
      points_sprite.y =  _location.y;
      points_sprite.alpha =  0;

      // tween sprite
      var tween = this.game.add.tween(points_sprite).to( { alpha: 1, y: points_sprite.y-100 }, 900, Phaser.Easing.Cubic.Out, true);
      tween.onComplete.add(function (){
        points_sprite.destroy();
      }, this);

    },


    getFreeSlot: function(){
      var free_slots = [];
      for(var i = 0; i < this.grid.cols; i++){
        if(this.grid.slots_available[i]){
          free_slots.push(i);
        }
      }

      if(free_slots.length){
        return free_slots[this.game.rnd.integerInRange(0, free_slots.length - 1)];
      }

      return -1;
    },



    coinOut: function(_target){
      if(_target.valid){

        // Check Coin Type for calculating score
        var points_content = '-20';
        var points_flag = false;
        this.game.score -= 20;
        this.updateScore();

        // Display Points
        this.pointsDisplay(points_content, {x: _target.body.x, y: _target.body.y}, points_flag);
      
        // Show Overlay
        this.showOverlay();

        // Play Sound FX
        this.game.fx_bad.play();
      }
    },


    showOverlay: function(){
      var tweenA = this.game.add.tween(this.error_overlay).to( { alpha: .75 }, 200, Phaser.Easing.Quadratic.Out);
      var tweenB = this.game.add.tween(this.error_overlay).to( { alpha: 0 }, 300, Phaser.Easing.Quadratic.Out);
      tweenA.chain(tweenB);
      tweenA.start();
    },

    spawnCoin: function(){
      var slot_random = this.getFreeSlot()
      var offset = 10;
      var coin;


      //
      if(slot_random == -1)
        return false;

      // Update Slot Status
      this.grid.slots_available[slot_random] = false;

      // Grid Position
      var col = (slot_random % this.grid.cols);
      var row = Math.floor(slot_random / this.grid.cols);
      var xPos =  160 + (this.grid.slot_width * col);
      var yPos =  -100;//this.game.rnd.integerInRange( 200, 500);


      // If we have generated more spirtes than the maximum,
      // start recycling from pool of sprites
      if( this.game.coins_single >= this.game.coins_max ){
        // Revive first dead Coin
        var coin = this.coinsGroup.getFirstDead();
        coin.reset(xPos, yPos);
        coin.randomize(slot_random);
      } else {
        // New Coin
        var coin = new Coin(this.game, slot_random, xPos, yPos);
        coin.events.onLeave.add(this.coinOut, this, 0, coin);
        coin.events.onKilled.add(function(){
          // Free Grid Slot
          this.grid.slots_available[coin.slotIndex] = true;
        }, this); 
        // Add coin to Group
        this.coinsGroup.add(coin);

        //
        this.game.coins_single++
      }


      // Make sure that there´s at leat 1 'valid' coin
      if(this.coinsGroup.checkAll('valid', false)){
        coin.fixFrame(0, 0);
      }

      
      // Update coins count
      this.game.coins_total++;

    },

    onDown: function(_sprite){
      var points_content;
      var points_flag = true;
      if(!_sprite.valid){
        points_content = '-20';
        points_flag = false;
        this.game.score -= 20;
        this.updateScore();

        // Display Points
        this.pointsDisplay(points_content, {x: _sprite.body.x, y: _sprite.body.y}, points_flag);
      }
    },

    shutdown: function() { 
      // this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
      this.hero.destroy();
      this.coinsGroup.destroy();
      this.back.destroy();
      this.score_display.destroy();
    }

  };
  
  module.exports = Play;