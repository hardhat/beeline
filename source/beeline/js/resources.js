game.resources = [

	// game font
    {name: "32x32_font",          type:"image", src: "data/img/font/32x32_font.png"},
    
    // Title Screen
    {name: "title_screen",          type:"image", src: "data/img/gui/title_screen.jpg"},
    
    // Credits Screen
    {name: "creds_screen",          type:"image", src: "data/img/gui/Douglas_Adams.jpg"},

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
	{name: "isometricmap", type:"image", src: "data/img/isometric.png"},


	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
	{name: "isometric", type: "tmx", src: "data/map/isometric.tmx"},

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
	{name: "Click", type: "audio", src: "data/sfx/"}

];
