<?php

/**
 * Pico plugin for Metria products
 *
 * @author Torbjörn Nordström
 * @link http://metria.se
 */



define(TITLE, 'title');
define(DESCRIPTION, 'description');

class Pico_Categories {

	private $plugin_path;
	private $image_path = 'content/categories';
	private $image_ext = '.png';
	public function __construct()
	{
		$this->plugin_path = dirname(__FILE__);
	}
	// get_files function stolen from the pico.php lib
	private function get_files($directory, $ext = '')
	{
		$array_items = array();
		if($handle = opendir($directory)){
			while(false !== ($file = readdir($handle))){
				if($file != "." && $file != ".."){
					if(is_dir($directory. "/" . $file)){
						$array_items = array_merge($array_items, $this->get_files($directory. "/" . $file, $ext));
					} else {
						$file = $directory . "/" . $file;
						if(!$ext || strstr($file, $ext)) $array_items[] = preg_replace("/\/\//si", "/", $file);
					}
				}
			}
			closedir($handle);
		}
		return $array_items;
	}

	public function before_render(&$twig_vars, &$twig)
	{
		// assign the images to the twig_vars

		include_once($this->image_path . '/' . 'categories.php');

		$twig_vars['categories'] = $this->get_files($this->image_path, $this->image_ext);
		foreach ($twig_vars['categories'] as &$p) {

			$temp_array = array();
			// lazy link to the image
			$temp_array['url'] = $twig_vars['base_url'].'/'.$p;
			// read the image info and assign the width and height
			$image_info = getimagesize($p);
			$temp_array['width'] = $image_info[0];
			$temp_array['height'] = $image_info[1];
			// strip the folder names and just leave the end piece without the extension
			$temp_array['name'] = preg_replace('/\.(jpg|jpeg|png|gif|webp)/', '', str_replace($this->image_path.'/', '', $p));


			$category = $categories[$temp_array['name']];
			$temp_array['title'] = $category[TITLE];
			$temp_array['description'] = $category[DESCRIPTION];

			$p = $temp_array;
		}
		return;
	}
	
}

?>
