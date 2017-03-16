
  'use strict';
  function Play(){};


  Play.prototype = {
    coins_max: 4,
    coins_total: 0,
    score: 0,

    create: function() {
      this.back = this.game.add.sprite(0, 0, 'back');
      //this.back.anchor.setTo(0.5, 0.5);
      this.back.inputEnabled = true;

      var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
      this.score_display = this.game.add.text(20, 20, 'SCORE: '+this.score, style);

      
      // Start the Arcade physics system
      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.game.physics.p2.setImpactEvents(true);
      this.game.physics.p2.restitution = 0.8;
      this.game.physics.p2.setBounds(0, 0, this.world.width, this.world.height, true, true, false, false);
      


      // Collision Groups
      this.coinsCollisionGroup = this.game.physics.p2.createCollisionGroup();
      this.heroCollisionGroup = this.game.physics.p2.createCollisionGroup();
      this.game.physics.p2.updateBoundsCollisionGroup();



      // Coin Group
      this.coinGroup = this.game.add.group();//new Phaser.Group(this.game);
      this.coinGroup.enableBody = true;
      this.coinGroup.physicsBodyType = Phaser.Physics.P2JS;
      //this.game.add.existing(this.coinGroup);
      //this.game.time.events.loop(this.coins_interval, this.addCoin, this);
      /*for(var j = 0; j<120; j++){
        // add Pipe
        this.addCoin( { x: this.game.world.width+(j * 100) } );
      }*/
      // this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.spawnCoin, this);
      this.game.time.events.repeat(Phaser.Timer.SECOND * 3, 4, this.spawnCoin, this);





      //
      this.hero = this.game.add.sprite(this.world.width/2, this.world.height - 70, 'guy');
      this.hero.anchor.setTo(0.5, 0.5);
      this.game.physics.p2.enable(this.hero, true);
      this.hero.body.static = true;
      // this.hero.body.moves = false;
      this.hero.inputEnabled = true;
      this.hero.input.useHandCursor = true;
      this.hero.input.enableDrag(false, true);
      //this.hero.input.setDragLock(true, false);
      this.hero.input.boundsRect = new Phaser.Rectangle(116, 0, this.world.width-116, this.world.height);
      this.hero.body.setCollisionGroup(this.heroCollisionGroup);
      this.hero.body.collides(this.coinsCollisionGroup, this.gotCoin, this);

      /*this.hero = new Hero(this.game);
      this.hero.events.onDie.add(this.die, this);
      this.hero.body.setCollisionGroup(this.heroCollisionGroup);
      this.hero.body.collides(this.pipesCollisionGroup, this.die, this);
      this.hero.body.collides(this.coinsCollisionGroup, this.gotCoin, this);
      this.game.add.existing(this.hero);*/

      this.hero.events.onDragStart.add(this.startDrag, this);
      this.hero.events.onDragStop.add(this.stopDrag, this);
      console.log(this.hero)

    },


    startDrag: function(){
      //  You can't have a sprite being moved by physics AND input, so we disable the physics while being dragged
      // this.hero.body.moves = false;
    },

    stopDrag: function(){
      //  And re-enable it upon release
      // this.hero.body.moves = true;
      console.log(this.hero)
    },

    update: function() {
      this.hero.body.x = this.game.input.x;
      this.hero.body.y = this.game.input.y;

      if (this.game.input.activePointer.isDown) {
        if (constraint_count == 0) {
          input_constraint = this.game.physics.p2.createRevoluteConstraint(
            flipper.body, [0,0], this.hero, [0,0], 1000
          );
          // mouseConstraint = this.game.physics.p2.createSpring(flipper.body, this.hero, 11, 20, 1);
          constraint_count = 1;
        } else if (constraint_count == 1) {
          // springs = this.game.physics.p2.getSprings();
          // this.game.physics.p2.removeSpring(springs);
          this.game.physics.p2.removeConstraint(input_constraint);
          constraint_count = 0;
        }
      } else {
        if (constraint_count == 1) {
          this.game.physics.p2.removeConstraint(input_constraint);
        }
        constraint_count = 0;
      }


      return;

      console.log( this.hero.body.static );
      /////////////////////////////////////
      /// HERO DRAG
      this.hero.body.setZeroVelocity();
      if( this.hero.input.isDragged ){
        // If body exists, follow pointer
        if( this.hero.body != null ){
          this.hero.body.x = this.game.input.activePointer.worldX;
          this.hero.body.y = this.game.input.activePointer.worldY;
        }
      }


      /////////////////////////////////////
      /// COINS LOCATION
      this.coinGroup.forEach(function(item){
        // if coin is out of bounds, kill sprite
        if(item.body.y > this.game.world.height) item.kill()
      }, this);



      /////////////////////////////////////
      /// COINS SPAWN
      if (this.coinGroup.countLiving() < this.coins_max) {
          // Set the launch point to a random location below the bottom edge
          // of the stage
          // this.spawnCoin();
      }
    },

    
    updateScore: function(){
      this.score_display.text = 'Score: '+this.score;  
    },

    gotCoin: function(_body1, _body2){
      console.log(_body2);
      _body2.sprite.kill()
      this.score += 10;
      this.updateScore();
        
      //_body2.sprite.playFX();
      //_body2.destroy();
    },

    spawnCoin: function(){
      this.coins_total++;
      var offset = 100;

      //if(){

      //}

      //
      var coin = this.coinGroup.create(100 + (Math.random() * (this.world.width-100)), 100 + (Math.random() * (this.world.width-100)), 'kite');
      coin.name = 'coin' + this.coins_total.toString();
      // coin.checkWorldBounds = true;
      coin.body.velocity.y = 100 + Math.random() * 80;

      coin.body.setCollisionGroup(this.coinsCollisionGroup);
      coin.body.collides([this.heroCollisionGroup]);
    },

    coinOut: function(_obj){
      console.log(_obj);
      //_obj.sprite.destroy()
    },


    clickListener: function() {
      // this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;