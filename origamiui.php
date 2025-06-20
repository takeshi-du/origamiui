<?php
/**
 * Plugin Name:       OrigamiUI
 * Description:       Provides custom blocks for building layouts within the WordPress editor.
 * Requires at least: 6.4
 * Requires PHP:      7.2
 * Version:           1.0.0
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

add_action( 'enqueue_block_editor_assets', function () {
    wp_enqueue_code_editor( [ 'type' => 'text/css' ] );
} );


/**
 * CSS ミニファイ
 */
function origamiui_minify_css( $css ) {
	$css = preg_replace( '#/\*[^*]*\*+([^/][^*]*\*+)*/#', '', $css );
	$css = preg_replace( '/\s*([{:;,}])\s+/', '$1', $css );
	$css = preg_replace( '/\s\s+/', ' ', $css );
	$css = str_replace( ';}', '}', $css );
	return trim( $css );
}
/**
 * inlinecssを出力
 */
function origamiui_collect_block_css( $block_content, $block ) {
	$target_blocks = array(
		'origamiui/custom-group',
		'origamiui/custom-container',
		'origamiui/custom-grid',
		'origamiui/custom-column',
		'origamiui/custom-offcanvas',
		'origamiui/custom-toggle',
	);

	if ( in_array( $block['blockName'], $target_blocks, true ) ) {
		$css  = $block['attrs']['compiledCSS'] ?? '';
		$slug = $block['attrs']['className']   ?? '';

		if ( $css && $slug ) {
			global $origamiui_inline_styles;
			// 同じクラスの CSS が既にあれば上書き（後勝ち）
			$origamiui_inline_styles[ $slug ] = $css;
		}

		// ブロック直下の <style> タグを 1 つだけ取り除く
		$block_content = preg_replace( '#<style[^>]*>.*?</style>#is', '', $block_content, 1 );
	}

	return $block_content;
}
add_filter( 'render_block', 'origamiui_collect_block_css', 10, 2 );

/**
 * css 出力
 */
function origamiui_print_collected_css() {
	global $origamiui_inline_styles;

	if ( empty( $origamiui_inline_styles ) ) {
		return;
	}

	$handle = 'origamiui';
	if ( ! wp_style_is( $handle, 'registered' ) ) {
		wp_register_style( $handle, false, array(), null );
		wp_enqueue_style( $handle );
	}

	$css_raw = implode( "\n", $origamiui_inline_styles );
  $css_min = origamiui_minify_css( $css_raw );
	wp_add_inline_style( $handle, $css_min );
}
// WP がフロント用 CSS を出力した直後に差し込む （20 は少し後ろ寄り）
add_action( 'wp_enqueue_scripts', 'origamiui_print_collected_css', 20 );
