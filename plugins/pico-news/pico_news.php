<?php

/**
 * Pico plugin for Metria products
 *
 * @author Torbjörn Nordström
 * @link http://metria.se
 */



class Pico_News {

    private $plugin_path;
    private $image_path = 'content/news';
    private $image_ext = '.png';
    public function __construct()
    {
        $this->plugin_path = dirname(__FILE__);
    }
    public function before_render(&$twig_vars, &$twig)
    {
        include_once($this->image_path . '/' . 'news.php');

        $i = 0;
        foreach ($news as &$p) {
            $p['url'] = $twig_vars['base_url'] . '/content/news/' . $p['image'] . $this->image_ext;
            $twig_vars['news'][$i] = $p;
            $i++;
        }

        return;
    }

}

?>
