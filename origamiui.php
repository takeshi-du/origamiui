<?php
/**
 * Plugin Name:       OrigamiUI
 * Description:       Provides custom blocks for building layouts within the WordPress editor.
 * Requires at least: 6.4
 * Requires PHP:      7.2
 * Version:           0.3.0
 * Author:            DesignupJP
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       origamiui
 * Domain Path:       /languages
 *
 * @package OrigamiUI
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

function origamiui_register_blocks() {
  $blocks = [
    'custom-group',
    'custom-container',
    'custom-grid',
    'custom-column',
    'custom-offcanvas',
    'custom-toggle',
  ];

  $block_json_base = __DIR__ . '/build/blocks';

  foreach ( $blocks as $block ) {
    register_block_type( "$block_json_base/$block" );
  }
}
add_action( 'init', 'origamiui_register_blocks' );

function origamiui_load_textdomain() {
  load_plugin_textdomain(
    'origamiui',
    false,
    dirname( plugin_basename( __FILE__ ) ) . '/languages/'
  );
}
add_action( 'init', 'origamiui_load_textdomain' );

function origamiui_enqueue_blocks_assets() {
  $blocks = [
    'custom-group',
    'custom-container',
    'custom-grid',
    'custom-column',
    'custom-offcanvas',
    'custom-toggle',
  ];

  foreach ($blocks as $block) {
    $script_handle = "origamiui-$block";
    wp_enqueue_script(
      $script_handle,
      plugins_url( "build/blocks/$block/index.js", __FILE__ ),
      array( 'wp-blocks', 'wp-element', 'wp-i18n', 'wp-editor' ),
      filemtime( plugin_dir_path( __FILE__ ) . "build/blocks/$block/index.js" ),
      true
    );
    wp_set_script_translations(
      $script_handle,
      'origamiui',
      plugin_dir_path( __FILE__ ) . 'languages'
    );
  }
}
add_action( 'init', 'origamiui_enqueue_blocks_assets' );

function origamiui_register_block_category( $categories ) {
  return array_merge(
    $categories,
    array(
      array(
        'slug'  => 'origamiui',
        'title' => __( 'OrigamiUI', 'origamiui' ),
      ),
    )
  );
}
add_filter( 'block_categories_all', 'origamiui_register_block_category', 10, 1 );

function origamiui_custom_block_for_enqueue_css() {
  wp_enqueue_style(
    'oui-css',
    plugins_url('assets/css/oui-grid.min.css', __FILE__),
    array(),
    '1.0.0'
  );
}
add_action('wp_enqueue_scripts', 'origamiui_custom_block_for_enqueue_css');

function origamiui_add_editor_css_to_editor() {
  wp_enqueue_style(
      'oui-editor',
      plugins_url('assets/css/oui-grid.min.css', __FILE__),
      [],
      '1.0.0'
  );
}
add_action('enqueue_block_assets', 'origamiui_add_editor_css_to_editor');
