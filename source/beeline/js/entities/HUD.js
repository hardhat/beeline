

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
		this.font = new me.Font("beefont", 32, "white", "right");
		
		// local copy of the global info
		this.score = -1;
		this.cap = 4;
		this.idle = -1;
		this.explore = -1;
		this.attack = -1;

		// make sure we use screen coordinates
		this.floating = true;
	},

	/**
	 * update function
	 */
	update : function () {
		// we don't do anything fancy here, so just
		// return true if the score has been updated
		if (this.score !== game.data.score) {	
			this.score = game.data.score;
			return true;
		} else if (this.cap !== game.data.cap) {
			this.cap = game.data.cap;
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
		this.font.draw (context, "Score: " + game.data.score, this.pos.x, this.pos.y);
	}

});
