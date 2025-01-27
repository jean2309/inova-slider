<?php
/**
 * Plugin Name:       Inova Slider
 * Description:       Esse é um plugin de slider
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Jean Andrade
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       inova-slider
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_inova_slider_block_init() {
	register_block_type( __DIR__ . '/build/inova-slider' );
}
add_action( 'init', 'create_block_inova_slider_block_init' );

function inova_slider_enqueue_frontend_assets() {

    if ( has_block( 'create-block/inova-slider' ) ) {
        wp_enqueue_script(
            'inova-slider-js',
            plugins_url( 'src/inova-slider/slider.js', __FILE__ ),
            array( 'jquery' ),
            '1.0.0',
            true
        );
    }
}
add_action( 'wp_enqueue_scripts', 'inova_slider_enqueue_frontend_assets' );