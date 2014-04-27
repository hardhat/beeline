game.PlayScreen = me.ScreenObject.extend({
	init: function() {
//		me.pool.register("HiveEntity", game.HiveEntity);
//		me.pool.register("BearEntity", game.BearEntity);
	},

	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// load a level
		me.audio.stopTrack();
		me.audio.playTrack("beeline_bgm", 0.5);
		me.levelDirector.loadLevel("isometric");

		// reset the score
		game.data.score = 0;

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);

	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
		me.audio.stopTrack();
	}
});
