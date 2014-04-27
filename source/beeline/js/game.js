
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		// hive cap
		hcap : 5,
		// idle bees
		idle : 5,
		// exploring bees
		explore : 0,
		// attacking bees
		attack : 0
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen", 800, 480, true, 'auto')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}
	

	// Initialize the audio.
	me.audio.init("wav, mp3, ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
	
		me.pool.register("HiveEntity", game.HiveEntity);
		me.pool.register("BearEntity", game.BearEntity);
	
	
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
		me.state.set(me.state.CREDITS, new game.CreditScreen());
		me.state.set(me.state.USER, new game.InstructionsScreen());
		// Go to title screen.
		me.audio.playTrack("Beeline_Menu", 0.5);
		me.state.change(me.state.MENU);
	}
};
