import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

/**
 * 共通「Link Settings」パネル
 *
 * props
 * --------------------------------------------------
 * link        : { url, rel, target }      // url に http/https/mailto/tel すべて入力
 * setLink     : ( newLink ) => void
 * tagName     : 現在のタグ名 (string)
 * setTagName  : ( 'a' | 'div' ) => void
 * initialOpen : PanelBody 初期 open 状態 (bool, 任意)
 */
export default function LinkSettingsPanel( {
	link,
	setLink,
	tagName,
	setTagName,
	initialOpen = false,
} ) {
	const onChange = ( key ) => ( value ) =>
		setLink( { ...link, [ key ]: value } );

	return (
		<PanelBody
			title={ __( 'Link Setting', 'origamiui' ) }
			initialOpen={ initialOpen }
		>
			<ToggleControl
				label={ __( 'リンクを有効にする', 'origamiui' ) }
				checked={ tagName === 'a' }
				onChange={ ( v ) => setTagName( v ? 'a' : 'div' ) }
				__nextHasNoMarginBottom
			/>

			<TextControl
				label={ __( 'URL / mailto: / tel:', 'origamiui' ) }
				placeholder="https://example.com  または  mailto:info@example.com"
				value={ link.url }
				onChange={ onChange( 'url' ) }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>

			<TextControl
				label={ __( 'Rel', 'origamiui' ) }
				value={ link.rel }
				onChange={ onChange( 'rel' ) }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>

			<ToggleControl
				label={__('リンクを別タブで開く', 'origamiui')}
				checked={!!link.target}
				onChange={(v) => onChange('target')(v)}
				help={__(
					'ON にするとリンクが新しいタブで開きます。',
					'origamiui'
				)}
				__nextHasNoMarginBottom
			/>
		</PanelBody>
	);
}
