<?php 
// Override any of the default settings below:

$config['site_title'] = 'Marknadsplats';			    // Site title
$config['base_url'] = 'http://localhost/Torget'; 				    // Override base URL (e.g. http://example.com)
$config['theme'] = 'pico-metria'; 			// Set the theme (defaults to "default")
$config['date_format'] = 'jS M Y';		    // Set the PHP date format
$config['twig_config'] = array(			    // Twig settings
	'cache' => false,					    // To enable Twig caching change this to CACHE_DIR
	'autoescape' => false,				    // Autoescape Twig vars
	'debug' => false					    // Enable Twig debug
);
$config['pages_order_by'] = 'alpha';	    // Order pages by "alpha" or "date"
$config['pages_order'] = 'asc';			    // Order pages "asc" or "desc"
$config['excerpt_length'] = 50;			    // The pages excerpt length (in words)
$config['content_dir'] = 'content/';        // Content directory.

//Placing
$config['pages_order_by'] = 'placing';
// Specify timezone if required

date_default_timezone_set('UTC');

// To add a custom config setting:

$config['custom_setting'] = 'Hello'; 	// Can be accessed by {{ config.custom_setting }} in a theme

// Leaflet
//$config['leaflet']['local'] = true;
$config['leaflet']['geocoding'] = true;
$config['leaflet']['providers_enabled'] = array(
    'thland' => 'Thunderforest.Landscape',  // Landscape variant of the Thunderforest provider
    'stato' => 'Stamen.Toner',              // Toner variant of Stamen provider
    'stawa' => 'Stamen.Watercolor',         // Watercolor variant of Stamen provider
    'hydda' => 'Hydda'                      // Hydda provider
);

