/* ---------------------------------
the hive, the source of everything good in the game. 
--------------------------- */
game.HiveEntity = me.ObjectEntity.extend({
    init: function hiveinit(x, y, settings) {
		this.parent(x,y, settings);

		this.collidable = true;
		//this.type = me.game.BASE_OBJECT;

		// show the hive initially.
		me.game.viewport.moveTo(x-3,y-3);

		this.maxTimer = settings.TimeLimit;
		this.maxSpawn = settings.Spawn;
		game.data.hcap = settings.Capacity;
		game.data.timer = this.maxTimer;
		game.data.spawn = this.maxSpawn;
		game.player={};
		game.playerActive=false;
		game.newBee={};
		game.newBee.settings=settings;
		game.hive=this;
    },   		// timer counts down and spawns a bee, which initially is idle.
		game.data.spawn -= dt/1000;
		if(game.data.spawn <= 0 ) {
			game.data.idle++;
			if( game.playerActive==false) {
				game.player=new game.PlayerBeeEntity(this.pos.x,this.pos.y, game.newBee.settings);
				game.player.z=5;
				me.game.world.addChild(game.player);
				game.playerActive=true;
			}
			
			game.data.spawn = this.maxSpawn;
		}
		game.data.timer -= dt;
		if(game.data.timer <= 0 ) {
			// TODO: level failed!
		}
	}
});


/* --------------------------
an enemy Entity
------------------------ */
game.BearEntity = me.ObjectEntity.extend({
	init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "bear_sprite";
           
        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;;
 
        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.spritewidth = settings.width = 64;
        settings.spritewidth = settings.height = 64;
        this.settings=settings;
		this.spawnX=x;
		this.spawnY=y;
		
        // call the parent constructor
        this.parent(x, y , settings);
        
        // set start/end position based on the initial area size
        x = this.pos.x;
        this.startX = x;
        this.endX   = x + width - settings.spritewidth
        this.pos.x  = x + width - settings.spritewidth;
 
        // walking & jumping speed
        this.setVelocity(4, 4);
        
        // make it collidable
        this.collidable = false;
        this.type = me.game.ACTION_OBJECT;
		this.countdown = settings.StartTime;
		this.strength = settings.Strength;
    },
    // manage the enemy movement
    update: function(dt) {
		this.countdown -= dt/1000;
		if(this.countdown<0) {
				var bear=new game.BearEnemy(this.pos.x,this.pos.y, this.settings);
				bear.z=5;
				me.game.world.addChild(bear);
				this.countdown = this.settings.StartTime;
				return true;
		}
	
        return false;
    }

});

game.BearEnemy = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // define this here instead of tiled
        settings.image = "bear_sprite";
           
        // save the area size defined in Tiled
        var width = settings.width;
        var height = settings.height;;
 
        // adjust the size setting information to match the sprite size
        // so that the entity object is created with the right size
        settings.spritewidth = settings.width = 64;
        settings.spritewidth = settings.height = 64;
         
        // call the parent constructor
        this.parent(x, y , settings);
         
        // we are headed to the hive.
		this.endX = game.hive.pos.x;
		this.endY = game.hive.pos.y;
 
        // walking & jumping speed
        this.setVelocity(1, 1);
         
        // make it collidable
        this.collidable = true;
        this.type = me.game.ENEMY_OBJECT;
		
		// eating
		this.eating=false;
		this.eatingMaxTimer=5;
		
		me.audio.play("Bear_Near");
    },
 
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
 
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
//        if (this.alive && (res.y > 0) && obj.falling) {
            //this.renderable.flicker(750);
//        }
		me.audio.play("Bear_Harvest");
		this.vel.x=0;
		this.vel.y=0;
		
		this.eating=true;
		this.eatingTimer=this.eatingMaxTimer;
    },
 
    // manage the enemy movement
    update: function(dt) {
        // do nothing if not in viewport
        if (!this.inViewport)
            return false;
 
        if (this.alive) {
			if( this.pos.x-this.endX>-1 && this.pos.x-this.endX<1) {
				this.pos.x=this.endX;
				this.vel.x=0;
			} else if( this.pos.x<this.endX) {
				this.vel.x=3;
			} else if( this.pos.x>this.endX) {
				this.vel.x=-3;
			}
			if( this.pos.y-this.endY>-1 && this.pos.y-this.endY<1) {
				this.pos.y=this.endY;
				this.vel.y=0;
			} else if( this.pos.y<this.endY) {
				this.vel.y=3;
			} else if( this.pos.y>this.endY) {
				this.vel.y=-3;
			}
            // make it walk
            //this.flipX(this.walkLeft);
            //this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }
         
        // check and update movement
        this.updateMovement();
         
		 
		if(this.eating) {
			this.eatingTimer-=dt/1000;
			if(this.eatingTimer<0) {
				this.eatingTimer=this.eatingMaxTimer;
				game.data.honey--;
				if(game.data.honey <= 0) {
					// TODO: you lose!
					game.data.honey = 0;
				}
			}
		}
		 
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent(dt);
            return true;
        }
        return false;
    }
});


/* --------------------------
collectable flower 
-------------------------- */
game.FlowerEntity = me.CollectableEntity.extend({
	init: function(x,y,settings) {
		settings.image="flower100";
		settings.width=128;
		settings.height=128;

		// call parent constructor
		this.parent(x,y,settings);
		this.energy=5;
		this.delay=0;
	},

	update: function(dx) {
		if(this.delay>0) {
			this.delay-=dx/1000000;
			if(this.delay<0) this.delay=0;
		}
	},

	onCollision: function(res, obj) {
		if(this.delay>0) return;

		if(this.energy>0) {
			this.energy-=1;
			flower[0]="flower0";
			flower[1]="flower20";
			flower[2]="flower40";
			flower[3]="flower60";
			flower[4]="flower80";
			flower[5]="flower100";

			this.image=flower[this.energy];
			this.delay=1;
			game.honey++;
		}
		if(this.energy==0) {
			this.collidable = false;
			me.game.world.removeChild( this);
		}
	}
});

/* ---------------------------
worker bee
--------------------------- */
game.WorkerBeeEntity = me.ObjectEntity.extend({
	init: function(x,y, settings) {
		settings.image="bee_sprite";
		settings.width=16;
		settings.height=16;
		settings.spritewidth=16;
		settings.spriteheight=16;

		this.parent(x, y, settings);
		this.setVelocity( 5, 5);
//		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
	},

	onCollision: function(res, obj) {
		if(obj.type == "Bear") {
			me.audio.play("Bear_Retreat");
			
			obj.collidable = false;
			me.game.world.removeChild(obj);	// TODO: count down.
			game.data.soldier--;
			console.log("Bee attack successful");
			this.collidable = false;
			me.game.world.removeChild( this);
		} else if(obj.type == "Flower") {
			// not done this way.
		} else if(obj.type == "Hive") {
			// put it back in the idle pool
			this.collidable=false;
			me.game.world.removeChild(this);
			
			game.data.idle++;
			game.data.harvest--;
			console.log("Moved bee from gardener to idle");
		}
	},

	update: function(dt) {
        if (this.alive) {
			if( this.pos.x-this.endX>-1 && this.pos.x-this.endX<1) {
				this.pos.x=0;
				this.vel.x=0;
			} else if( this.pos.x<this.endX) {
				this.vel.x=5;
			} else if( this.pos.x>this.endX) {
				this.vel.x=-5;
			}
			if( this.pos.y-this.endY>-1 && this.pos.y-this.endY<1) {
				this.pos.y=0;
				this.vel.y=0;
			} else if( this.pos.y<this.endY) {
				this.vel.y=5;
			} else if( this.pos.y>this.endY) {
				this.vel.y=-5;
			}
            // make it walk
            //this.flipX(this.walkLeft);
            //this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }

		this.updateMovement();

		// target is flower?
		var dx=this.target.x-this.pos.x;
		var dy=this.target.y-this.pos.y;
		var dist=dx*dx+dy*dy;
		if( dist<100) {
			// hit target flower
			console.log("hit target, returning home.");
			this.target.x=game.hive.pos.x;
			this.target.y=game.hive.pos.y;
		}

		if(this.vel.x!=0 || this.vel.y!=0) {
			// update animation
			this.parent(dt);
			return true;
		}
		// no animation update and no movement.
		return false;
	},

});


/* ---------------------------
player bee
--------------------------- */
game.PlayerBeeEntity = me.ObjectEntity.extend({
	init: function(x,y, settings) {
		settings.image="bee_sprite";
		settings.width=16;
		settings.height=16;
		settings.spritewidth=16;
		settings.spriteheight=16;

		this.parent(x, y, settings);
		this.setVelocity( 5, 5);
//		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
	},
	update: function(dt) {
		if(me.input.isKeyPressed('left')) {
			this.flipX(true);
			this.vel.x-=this.accel.x * me.timer.tick;
		} else if( me.input.isKeyPressed('right')) {
			this.flipX(false);
			this.vel.x=this.accel.x *me.timer.tick;
		} else {
			this.vel.x=0;
		}
		if(me.input.isKeyPressed('up')) {
			this.vel.y-=this.accel.y * me.timer.tick;
		} else if( me.input.isKeyPressed('down')) {
			this.vel.y=this.accel.y *me.timer.tick;
		} else {
			this.vel.y=0;
		}
		this.updateMovement();

		if(this.vel.x!=0 || this.vel.y!=0) {
			// update animation
			this.parent(dt);
			return true;
		}
		// no animation update and no movement.
		return false;
	},

});
