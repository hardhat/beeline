game.CreditScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(
		    new me.SpriteObject (
		        0,0, 
		        me.loader.getImage('creds_screen')
		    ),
		    1
		);
		
		me.game.world.addChild(new (me.Renderable.extend ({
			    // constructor
			    init : function() {
			        this.parent(new me.Vector2d(0, 0), me.game.viewport.width, me.game.viewport.height);
			        // font for the scrolling text
			        this.font = new me.Font("beeFont", 12, "#fff");
			    },

			    update : function (dt) {
			        return true;
			    },
			     
			    draw : function (context) {
			        this.font.draw (context, "I MADE THIS MUAHAHAHA", 20, 40);
			        this.font.draw (context, "A FEW OTHER PEOPLE WERE INVOLVED", 20, 140);
			    },
			})), 2);
			
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
		me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
		    if (action === "enter") {
		        // play something on tap / enter
		        // this will unlock audio on mobile devices
		        me.audio.play("cling");
		        me.state.change(me.state.PLAY);
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
