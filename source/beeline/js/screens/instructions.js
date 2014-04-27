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
				        return false;
				    },
				     
				    draw : function (context) {
				    	this.font = new me.Font("beeFont", 22, "#fff");
				        this.font.draw (context, "Instructions:", 330, 60);
				        this.font.draw (context, "MENU", 20, 440);
				        menu = this.font.measureText(context, menub);
				        this.font = new me.Font("Chalkboard SE", 16, "#fff");
				        this.font.draw (context, "	Your mission is to pollinate all of the flowers on the level. The bears \nare after you! So defend your honey and keep the bears from spoiling \neverything. \n\n	Tap on the map to assign an idle bee to explore and reveal the map. \nTap on flowers to assign a bee to pollinate. Flowers require 5 trips or \n5 bees to fully pollinate. Tap on the bear to sacrifice a bee on defense, \nand trying to fill his annoyed meter and scare him away. \n\n	Across the top there is the number of available bees, hive capacity, \nnumber of idle, exploring, harvesting and attacking bees. Also the \namount of honey that you have.", 153, 115);
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
			    	me.audio.play("Click");
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
	