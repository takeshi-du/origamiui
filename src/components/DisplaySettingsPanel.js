// src/components/DisplaySettingsPanel.js
import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl } from '@wordpress/components';

/**
 * 共通「Display Settings」パネル
 *
 * props
 * --------------------------------------------------
 * styles        : styles.base.display オブジェクト
 * updateStyles  : ( path, value ) => void   ← Edit 側の updateStyles をそのまま渡す
 * tagName       : 現在の HTML タグ
 * onTagChange   : ( newTag ) => void
 * basePath      : "base.display" など (省略可・デフォルトは上記)
 */
export default function DisplaySettingsPanel( {
	styles,
	updateStyles,
	tagName,
	onTagChange,
	basePath = 'base.display',
	initialOpen = false,
} ) {
	// ラッパー — 属性名だけ渡せば OK
	const set = ( key, value ) => updateStyles( `${ basePath }.${ key }`, value );

	return (
		<PanelBody
			title={ __( 'Display Settings', 'origamiui' ) }
			initialOpen={ initialOpen }
		>
			<SelectControl
				label={ __( 'Overflow', 'origamiui' ) }
				value={ styles.overflow }
				options={ [
					{ label: '---', value: '---' },
					{ label: 'auto', value: 'auto' },
					{ label: 'hidden', value: 'hidden' },
					{ label: 'visible', value: 'visible' },
					{ label: 'scroll', value: 'scroll' },
				] }
				onChange={ ( v ) => set( 'overflow', v ) }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>

			<SelectControl
				label={ __( 'Opacity', 'origamiui' ) }
				value={ styles.opacity }
				options={ [
					{ label: '---', value: '---' },
					{ label: '100%', value: '100' },
					{ label: '75%', value: '75' },
					{ label: '50%', value: '50' },
					{ label: '25%', value: '25' },
					{ label: '0', value: '0' },
				] }
				onChange={ ( v ) => set( 'opacity', v ) }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>

			<SelectControl
				label={ __( 'z-index', 'origamiui' ) }
				value={ styles.zIndex }
				options={ [
					{ label: '---', value: '---' },
					{ label: '3', value: '3' },
					{ label: '2', value: '2' },
					{ label: '1', value: '1' },
					{ label: '0', value: '0' },
					{ label: '-1', value: 'n1' },
				] }
				onChange={ ( v ) => set( 'zIndex', v ) }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>

			<SelectControl
				label={ __( 'HTML Tag', 'origamiui' ) }
				value={ tagName }
				options={ [
					{ label: 'div', value: 'div' },
					{ label: 'main', value: 'main' },
					{ label: 'header', value: 'header' },
					{ label: 'footer', value: 'footer' },
					{ label: 'article', value: 'article' },
					{ label: 'a', value: 'a' },
				] }
				onChange={ onTagChange }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
		</PanelBody>
	);
}
