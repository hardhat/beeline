game.PlayScreen = me.ScreenObject.extend({
	init: function() {
		//TODO?
	},

	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// load a level
//		me.game.world.addChild(
//		    new me.SpriteObject (
//		        0,0, 
//		        me.loader.getImage('black_screen')
//		    ),
//		    1
//		);
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP, "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");

		var test = false;
		me.game.world.addChild(new me.SpriteObject(0,0, me.loader.getImage("black_Screen")));
		me.audio.stopTrack();
		me.audio.playTrack("beeline_bgm", 0.5);
		me.levelDirector.loadLevel("orthogonal");

		// reset the score
		game.data.score = 0;
		game.data.honey = 0;
		game.data.idle = 0;
		game.data.harvest = 0;
		game.data.attack = 0;

		// add our HUD to the game world
//		me.game.world.addChild(new me.SpriteObject(0,0, me.loader.getImage("hud")), 2);
		this.HUD = new game.HUD.Container();
//		me.game.world.addChild(new me.SpriteObject(0,0, me.loader.getImage("hud")), Infinity - 1);
		me.game.world.addChild(this.HUD);
		game.data.moveActive=false;

		me.input.registerPointerEvent("pointerdown", me.game.viewport, function (event) {
			var world={};
			world.x=event.gameWorldX;
			world.y=event.gameWorldY;
			game.data.move=world;
			game.data.moveActive=true;
			var layer = me.game.currentLevel.getLayerByName("fog");
			var tile = layer.getTile(world.x,world.y);
			if(tile!=null){
				//TODO:  do something with tile
				console.log("Clicked on tile "+tile.tileId);
				var tx=tile.col;
				var ty=tile.row;
				layer.clearTile(tx,ty);
			}
			return true;
		});
		
		me.input.registerPointerEvent("pointerup", me.game.viewport, function (event) {
			game.data.moveActive=false;
			return true;
		});

		me.input.registerPointerEvent("pointermove", me.game.viewport, function (event) {
			if(game.moveActive) {
				var world={};
				world.x=event.gameWorldX;
				world.y=event.gameWorldY;
				me.viewport.move(game.data.move.x-world.x,game.data.move.y-world.y);
				game.data.move=world;
				return true;
			}
			return false;
		});



//		me.game.HUD.Container.addChild(new me.SpriteObject(0,0, me.loader.getImage("hud")), this.z);
//		if mouse down  <--- no idea how to detect!!!
//			if mouse is moved less then threshold
//				click detected
//			else {
//				drag detected
//			}
//		
//	this.handler2 = me.event.subscribe(me.input.registerPointerEvent("pointerdown", new me.Rect(new me.Vector2d(0,0), 800, 480), function () { test = true;me.audio.play("Click"); }));
//		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
//		me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
//		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
//		    if (action === "enter") {
//		    	moveBox = new me.Rect(new me.Vector2d(me.input.mouse.pos.x - 20, me.input.mouse.pos.y - 20), 40, 40);
//		    	me.audio.play("Click");
//		    	while (test == true) {
//		    	me.audio.play("Bear_Harvest");
//		    		if (!moveBox.containsPoint(me.input.mouse.pos.x, me.input.mouse.pos.y)){
//		    			me.audio.play("Click");
//		    			while (me.input.isKeyPressed("enter")) {
//		    				game.PlayScreen.moveTo(me.input.mouse.pos.x, me.input.mouse.pos.y);
//		    			}
//		    			game.PlayScreen.move(me.input.mouse.pos.x, me.input.mouse.pos.y);
//		        		// play something on tap / enter
//		        		// this will unlock audio on mobile devices
//		       	 		me.audio.play("Click");
//		       		}
//		       		 //else if (creditsBox.containsPoint(me.input.mouse.pos.x, me.input.mouse.pos.y)) {
//		        	me.audio.play("Click");
//		        	me.state.change(me.state.CREDITS);
//		        } else if (instructionsBox.containsPoint(me.input.mouse.pos.x, me.input.mouse.pos.y)) {
//		        	me.audio.play("Click");
//		        	me.state.change(me.state.USER);
//		        	
//		        }
//		    }
//		});
		
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.LEFT);
		me.input.unbindKey(me.input.KEY.RIGHT);
		me.input.unbindKey(me.input.KEY.UP);
		me.input.unbindKey(me.input.KEY.DOWN);

		me.input.releasePointerEvent("pointerdown",me.game.viewport);
		me.input.releasePointerEvent("pointermove",me.game.viewport);

	// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
		me.audio.stopTrack();
	}
});
