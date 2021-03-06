

/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.ObjectContainer.extend({

	init: function() {
		// call the constructor
		this.parent();
		
		// persistent across level change
		this.isPersistent = true;
		
		// non collidable
		this.collidable = false;
		
		// make sure our object is always draw first
		this.z = Infinity;

		// give a name
		this.name = "HUD";
		
		hudHoney = new me.SpriteObject(0,0, me.loader.getImage("hud_honey"));
		hudHoney.floating=true;

		this.addChild(hudHoney);
		hudComb = new me.SpriteObject(100,0, me.loader.getImage("hud_comb"));
		hudComb.floating = true;
		this.addChild(hudComb);
		hudTypes = new me.SpriteObject(16,90, me.loader.getImage("hud_types"));
		hudTypes.floating = true;
		this.addChild(hudTypes);
		// add our child score object at the top left corner
		this.addChild(new game.HUD.InfoItem(5, 5));
	}
});


/** 
 * a basic HUD item to display score, hive cap, idle bees, exploring bees, attacking bees
 */
game.HUD.InfoItem = me.Renderable.extend({	
	/** 
	 * constructor
	 */
	init: function(x, y) {
		
		// call the parent constructor 
		// (size does not matter here)
		this.parent(new me.Vector2d(x, y), 10, 10); 
		
		// create a font
		this.font = new me.Font("Chalkboard SE", 32, "white");
		// local copy of the global info
		this.score = -1;
		this.hcap = 4;
		this.idle = 4;
		this.explore = -1;
		this.attack = -1;

		// make sure we use screen coordinates
		this.floating = true;

		this.z = 1;

	},

	/**
	 * update function
	 */
	update : function () {
		// we don't do anything fancy here, so just
		// return true if the score has been updated
		if(me.input.isKeyPressed('esc')) {
			me.state.change(me.state.MENU);
		}
		if (this.score !== game.data.score) {	
			this.score = game.data.score;
			return true;
		} else if (this.cap !== game.data.cap) {
			this.cap = game.data.hcap;
			return true;
		} else if (this.idle !== game.data.idle) {
			this.idle = game.data.idle;
			return true;
		} else if (this.explore !== game.data.explore) {
			this.explore = game.data.explore;
			return true;
		} else if (this.attack !== game.data.attack) {
			this.attack = game.data.attack;
			return true;
		}
		return false;
	},

	/**
	 * draw the score
	 */
	draw : function (context) {
		this.font.draw (context, "H: " + game.data.honey, this.pos.x, this.pos.y);
		this.font.draw (context, "I: " + game.data.idle, this.pos.x, this.pos.y + 40);
		this.font.draw (context, "E: " + game.data.explore, this.pos.x, this.pos.y + 80);
		this.font.draw (context, "A: " + game.data.attack, this.pos.x, this.pos.y + 120);
		this.font.draw (context, "Pollen Left: " + game.data.unpollinated, this.pos.x + 120, this.pos.y);
		this.font.draw (context, "T: " + (game.data.idle + game.data.explore + game.data.attack) + "/20", this.pos.x, this.pos.y + 160);
		this.font.draw (context, "Bee in " + Math.ceil(game.data.spawn) + " seconds", this.pos.x + 120, this.pos.y+40);
	}

});
