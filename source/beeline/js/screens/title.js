/**
 * A title screen 
 **/
game.TitleScreen = me.ScreenObject.extend({
    /**    
     *  action to perform on state change
     */
    onResetEvent : function() {
         var playb = "PLAY";
         var creditsb = "CREDITS";
         var instructionsb = "INSTRUCTIONS";
         var playY;
         var creditsY;
         var instructionsY;
         play = new Object();
         credits = new Object();
         instructions = new Object();
        // title screen
        me.game.world.addChild(
            new me.SpriteObject (
                0,0, 
                me.loader.getImage('title_screen')
            ),
            1
        );
     
        // add a new renderable component with the scrolling text
        me.game.world.addChild(new (me.Renderable.extend ({
            // constructor
            init : function() {
                this.parent(new me.Vector2d(0, 0), me.game.viewport.width, me.game.viewport.height);
                // font for the scrolling text
                this.font = new me.Font("beeFont", 32, "white");
                 
                 // a tween to animate the arrow
                this.scrollertween = new me.Tween(this).to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
         
                this.scroller = "I HAVE NO IDEA WHAT I'M DOING                  ";
                this.scrollerpos = 600;
            },
             
            // some callback for the tween objects
            scrollover : function() {
                // reset to default value
                this.scrollerpos = 640;
                this.scrollertween.to({scrollerpos: -2200 }, 10000).onComplete(this.scrollover.bind(this)).start();
            },
         
            update : function (dt) {
                return true;
            },
             
            draw : function (context) {
//                this.font.draw (context, playb, 15, 310);
//                this.font.draw (context, creditsb, 15, 360);
                this.font.draw(context, this.scroller, this.scrollerpos, 440);
                play = this.font.measureText(context, playb);
                credits = this.font.measureText(context, creditsb); 
                instructions = this.font.measureText(context, instructionsb); 
                playY = (me.game.viewport.width / 2) - (play.width / 2);
                creditsY = (me.game.viewport.width / 2) - (credits.width / 2);
                instructionsY = (me.game.viewport.width / 2) - (instructions.width / 2);
                this.font.draw (context, playb, Math.abs(playY), 250);
                this.font.draw (context, creditsb, Math.abs(creditsY), 300);
                this.font.draw (context, instructionsb, Math.abs(instructionsY), 350);
            },
            onDestroyEvent : function() {
                //just in case
                this.scrollertween.stop();
            }
        })), 2);  
         
        // change to play state on press Enter or click/tap
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "enter") {
				playBox = new me.Rect(new me.Vector2d(playY, 250), play.width, play.height);
				creditsBox = new me.Rect(new me.Vector2d(creditsY, 300), credits.width, credits.height);
				instructionsBox = new me.Rect(new me.Vector2d(instructionsY, 350), instructions.width, instructions.height);
            	if (playBox.containsPoint(me.input.mouse.pos.x, me.input.mouse.pos.y)){
                	// play something on tap / enter
                	// this will unlock audio on mobile devices
               	 	me.audio.play("cling");
                	me.state.change(me.state.PLAY);
                } else if (creditsBox.containsPoint(me.input.mouse.pos.x, me.input.mouse.pos.y)) {
                	me.audio.play("cling");
                	me.state.change(me.state.CREDITS);
                } else if (instructionsBox.containsPoint(me.input.mouse.pos.x, me.input.mouse.pos.y)) {
                	me.audio.play("cling");
                	me.state.change(me.state.USER);
                	
                }
            }
        });
        
    },
 
    /**    
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent : function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindPointer(me.input.mouse.LEFT);
        me.input.unbindKey(me.input.KEY.C);
        me.input.unbindPointer(me.input.mouse.RIGHT);
        me.event.unsubscribe(this.handler);
   }
});