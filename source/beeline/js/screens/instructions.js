game.InstructionsScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
			var menub = "MENU";
			menu = new Object();
			me.game.world.addChild(
			    new me.SpriteObject (
			        0,0, 
			        me.loader.getImage('info_screen')
			    ),
			    1
			);
			
			me.game.world.addChild(new (me.Renderable.extend ({
				    // constructor
				    init : function() {
				        this.parent(new me.Vector2d(0, 0), me.game.viewport.width, me.game.viewport.height);
				        // font for the scrolling text
				        this.font = new me.Font("beeFont", 22, "#fff");
				    },
	
				    update : function (dt) {
				        return true;
				    },
				     
				    draw : function (context) {
				        this.font.draw (context, "Instructions:", 330, 60);
				        this.font.draw (context, "Just play the game, I know you can do it!", 153, 115);
				        menu = this.font.measureText(context, menub);
				        this.font.draw (context, "MENU", 20, 440);
				    },
				})), 2);
				
			me.input.bindKey(me.input.KEY.ENTER, "enter", true);
			me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
			this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
			    if (action === "enter") {
			    menuBox = new me.Rect(new me.Vector2d(20, 440), menu.width, menu.height);
			    if (menuBox.containsPoint(me.input.mouse.pos.x, me.input.mouse.pos.y)){
			    	// play something on tap / enter
			    	// this will unlock audio on mobile devices
			    	me.audio.play("cling");
			    	me.state.change(me.state.MENU);
			    }
			    }
			});
			
			
		},
			
		
		/**	
		 *  action to perform when leaving this screen (state change)
		 */
		onDestroyEvent: function() {
			me.input.unbindKey(me.input.KEY.ENTER);
			me.input.unbindPointer(me.input.mouse.LEFT);
			me.event.unsubscribe(this.handler);
		}
	});
	