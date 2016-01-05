<?php
function gm_map_scripts() {


	wp_enqueue_style( 'style-sheet', plugins_url('assets/style/css/style.css', __FILE__) );

	
	/*if(is_mobile()){
		wp_enqueue_scripts('mobile-script', plugins_url("assets/script/main-mobile.js", __FILE__), array(), '1.0.0', true );
	}
	else{
		
	}*/

	wp_register_script( 'ggMain', plugins_url('assets/script/main.js', __FILE__) , array(), '1.0.0', true );

	
				
}

add_action( 'wp_enqueue_scripts', 'gm_map_scripts' );
