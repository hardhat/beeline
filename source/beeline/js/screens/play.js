game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// load a level
		me.levelDirector.loadLevel("isometric");

		// reset the score
		me.game.data.score = 0;

		// Look at the centre of the map.
		me.game.viewport.moveTo(10,10);

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);

		me.pool.register("HiveEntity", game.HiveEntity);
		me.pool.register("BearEntity", game.BearEntity);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
