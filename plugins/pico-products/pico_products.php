<?php

/**
 * Pico plugin for Metria products
 *
 * @author Torbjörn Nordström
 * @link http://metria.se
 */



class Pico_Products {

	private $plugin_path;
	private $image_path = 'content/products';
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

		include_once($this->image_path . '/' . 'products.php');

		$i = 0;
		foreach ($products as &$p) {

			$temp_array = array();
			// lazy link to the image
			$p['url'] = $twig_vars['base_url'] . '/content/products/' . $p['title'] . $this->image_ext;
			$twig_vars['products'][$i] = $p;
			$i++;
		}

		return;
	}
	
}

?>
