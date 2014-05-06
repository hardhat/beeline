game.PlayScreen = me.ScreenObject.extend({
	init: function() {
		me.game.onLevelLoaded=this.onLevelLoaded.bind(this);
	},

	onLevelLoaded: function() {
		game.data.honey = 0;
		game.data.idle = 0;
		game.data.harvest = 0;
		game.data.attack = 0;
		game.data.unpollinated = 0;
		var i,j;
		
		console.log("Counting unpolinated flowers.");
		var layer = me.game.currentLevel.getLayerByName("background");
		for(j=0;j<layer.rows;j++) {
			for(i=0;i<layer.cols;i++) {
				var tileId = layer.getTileId(i*layer.tilewidth,j*layer.tileheight);
				if(tileId==31) game.data.unpollinated++;
			}
		}
		console.log("Got "+game.data.unpollinated);
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

		// reset the score
		game.data.score = 0;
		
		me.levelDirector.loadLevel("orthogonal");

		// add our HUD to the game world
//		me.game.world.addChild(new me.SpriteObject(0,0, me.loader.getImage("hud")), 2);
		this.HUD = new game.HUD.Container();
//		me.game.world.addChild(new me.SpriteObject(0,0, me.loader.getImage("hud")), Infinity - 1);
		me.game.world.addChild(this.HUD);
		game.data.moveActive=false;

		me.input.registerPointerEvent("pointerdown", me.game.viewport, function (event) {
			var page={};
			page.x=event.screenX;
			page.y=event.screenY;
			game.data.move=page;
			game.data.moveActive=true;
			game.data.dragActive=false;
			return true;
		});
		
		function gather(layer,fg,tx,ty,tileId) {
			layer.setTile(tx,ty,tileId);
			fg.setTile(tx,ty-1,tileId-6);
			//playSound("gotone");
			game.data.honey++;
			if(tileId!=45) me.audio.play("Click");
		}
		
		me.input.registerPointerEvent("pointerup", me.game.viewport, function (event) {
			if(!game.data.dragActive) {
				var layer = me.game.currentLevel.getLayerByName("fog");
				var tile = layer.getTile(event.gameWorldX,event.gameWorldY);
				if(tile!=null){
					//TODO:  do something with tile
					console.log("Clicked on fog tile "+tile.tileId);
					var tx=tile.col;
					var ty=tile.row;
					layer.clearTile(tx,ty);
					me.game.repaint();
				} else {
					layer=me.game.currentLevel.getLayerByName("background");
					var fg=me.game.currentLevel.getLayerByName("foreground");
					tile=layer.getTile(event.gameWorldX,event.gameWorldY);
					var fgtile=fg.getTile(event.gameWorldX,event.gameWorldY);
					if(fgtile!=null) { // Get the sticking up part, if applicable.
						tile=layer.getTile(event.gameWorldX,event.gameWorldY+fgtile.height);
					}
					if(tile!=null) {
						var tx=tile.col;
						var ty=tile.row;
						var redraw=true;
						console.log("Clicked on tileId "+tile.tileId+" @ "+tile.col+", "+tile.row);
						if(tile.tileId==31) gather(layer,fg,tx,ty,32);
						else if(tile.tileId==32) gather(layer,fg,tx,ty,33);
						else if(tile.tileId==33) gather(layer,fg,tx,ty,43);
						else if(tile.tileId==43) gather(layer,fg,tx,ty,44);
						else if(tile.tileId==44) {
							gather(layer,fg,tx,ty,45);
							console.log("There are "+game.data.unpollinated+" flowers left.");
							game.data.unpollinated--;
							if(game.data.unpollinated>0) {
								me.audio.play("Flourish3");
							} else {
								me.audio.stopTrack();
								me.audio.play("Victory");

								me.levelDirector.nextLevel();
							}
						} else {
							redraw=false;
						}
						if(redraw) me.game.repaint();

					}
				}
			}

			game.data.moveActive=false;
			game.data.dragActive=false;

			
			return false;
		});

		me.input.registerPointerEvent("pointermove", me.game.viewport, function (event) {
			if(game.data.moveActive) {
				var page={};
				page.x=event.screenX;
				page.y=event.screenY;
				var dx=game.data.move.x-page.x;
				var dy=game.data.move.y-page.y;
				var dist=dx*dx+dy*dy;

				if(dist>100 || game.data.dragActive) {
					me.game.viewport.move(game.data.move.x-page.x,game.data.move.y-page.y);
					if(game.data.move.x-page.x!=0 || game.data.move.y-page.y!=0) {
						me.game.repaint();
					}
					game.data.move=page;
					game.data.dragActive=true;
				}
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
