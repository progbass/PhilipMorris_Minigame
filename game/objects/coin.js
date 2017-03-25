Coin = function (game, _slot, _x, _y, _frame) {
	Phaser.Sprite.call(this, game, _x, _y, 'coin');
	var scope = this;

	// Properties
    this.game.physics.arcade.enable(this);
	this.static = false;
	this.events.onHit = new Phaser.Signal(); 
	this.events.onLeave = new Phaser.Signal(); 
    this.name = 'coin' + this.game.coins_total.toString();
    this.mass = -100;
    this.inputEnabled = true;
    this.anchor.setTo(.5,.5);
    this.scale.x = this.scale.y = .8;
    this.label = this.addChild( new Phaser.Text(this.game, 0, -10, '', this.game.font_style) );
	this.label.anchor.setTo(.5, .5);
	this.label.fill = '#000000';
	this.label.fontSize = '60pt';
	this.label2 = this.addChild( new Phaser.Text(this.game, -5, 45, '', this.game.font_style) );
	this.label2.anchor.setTo(.5, .5);
	this.label2.fill = '#000000';
	this.label2.fontSize = '10pt';
	this.yvel = 0;
	this.xvel = 0;

    // 
    this.randomize(_slot, _frame);
};

Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin;
Coin.prototype.create = function () {};

Coin.prototype.randomize = function(_slot, _frame){
    this.slotIndex = _slot;
	this.scale.x = this.scale.y = 1;
	this.yvel =  2 + (this.game.rnd.frac() * (this.game.level_speed * 1.85));
	//this.xvel = (this.game.level > 3) ? this.game.rnd.integerInRange(-1, 1) * .2: 0;
	this.yvel =  this.yvel > 4 ? 4 : this.yvel;
	this.body.setSize(this.width, this.height);

	//this.body.velocity.y = 160;
	//this.body.velocity.x = 0;

    //
    this.events.onInputDown.removeAll();
    this.events.onInputDown.add(this.onDown, this);
	
    //
    if(_frame != undefined)
    	this.fixFrame(_frame, 0);
   	else
    	this.randomFrame();
    //this.game.add.tween(this.scale).from( { x: 0, y: 0 }, 980, Phaser.Easing.Elastic.Out, true);
    
    //
    //this.game.time.events.remove( this.liveInterval );
	//this.liveInterval = this.game.time.events.add(Phaser.Timer.SECOND * this.game.rnd.integerInRange(4,8), function(){
	//	this.kill();
	//}, this); 
};
Coin.prototype.onDown = function(){
	this.events.onHit.dispatch(this);
	return;

	//
    this.events.onInputDown.removeAll();

    //
    this.game.add.tween(this.scale).from( { x: .85, y: .85 }, 980, Phaser.Easing.Elastic.Out, true);
	this.game.time.events.remove( this.liveInterval);

	// Out animation
	var tweenA = this.game.add.tween(this).to( { y: this.y - 120 }, 300, Phaser.Easing.Quadratic.Out);
	var tweenB = this.game.add.tween(this).to( { y: this.game.world.height + this.height }, 600, Phaser.Easing.Quartic.In);
	tweenA.chain(tweenB);
	tweenA.start();

	// 
	this.events.onHit.dispatch(this);
};

Coin.prototype.update = function() {
	if(!this.static){
		this.y += this.yvel;
		this.x += this.xvel;
	}


	if(this.x + (this.width / 2) >= this.game.world.width){
		this.xvel = this.xvel * -1;
	}
	if(this.x - (this.width / 2) <= 0){
		this.xvel = this.xvel * -1;
	}

	/////////////////////////////////////
	/// COIN LOCATION
	// if coin is out of bounds, kill sprite
	if(this.y > this.game.world.height && this.alive){
		this.events.onLeave.dispatch(this);
		this.kill();
	}
};


Coin.prototype.setupFrame = function(_label) {
    this.game.physics.arcade.enable(this);
    this.events.onInputDown.removeAll();
    //this.body.anchor.setTo(0.5, 0.5);

	// Sprite Configuration
	this.valid = (this.frame == 3) ? false : true;
	this.label.text = '';
	this.label2.text = '';

	// 
	switch(this.frame){
		case 0:
			var precios = [{tint: 0xff0000, label: '$41*'}, {tint: 0x00ff00, label: '$61*'}, {tint: 0x0000ff, label: '$55*'}, {tint: 0xff00ff, label: '$38*'}];
			var precio_random = _label != undefined ? _label : Math.round(this.game.rnd.integerInRange(0, precios.length-1));
			this.label.text = precios[precio_random].label;
			this.label2.text = '*PRECIO SUGERIDO';
			if(precio_random != 0){
			  this.valid = false;
			}

			//
			this.body.setSize(this.width - 30, this.height - 84, 14, 50);

			break;

		case 1:
			this.body.setSize(170, 118, 5, 35);
			break;

		case 2:
			this.scale.setTo(.9, .9);
			this.body.setSize(170, 170, 5, 5);
			break;

		case 3:
			this.body.setSize(180, 85, 5, 55);
			break;

		case 4:
			this.scale.setTo(1.45, 1.45);
			this.body.setSize(165, 35, 5, 82);
			break;

	}
};


Coin.prototype.randomFrame = function(){
	// Frame Configuration
    this.frame = this.game.rnd.integerInRange(0, 4);
    this.setupFrame();
};



Coin.prototype.fixFrame = function(_frame, _label) {    
	// 
	
    console.log('asdasdasd')
    this.frame = _frame;
    this.setupFrame(_label);
};


module.exports = Coin;
