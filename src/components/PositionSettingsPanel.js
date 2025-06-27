import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	Button,
	AlignmentMatrixControl,
	ToggleControl,
	Flex,
	FlexItem,
	__experimentalHeading as Heading,
} from '@wordpress/components';
import ResponsiveTabs from './ResponsiveTabs';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

// icon
import { trash } from '@wordpress/icons';

/**
 * 共通「Position Settings」パネル
 *
 * props
 * --------------------------------------------------
 * styles        : styles.base.position オブジェクト
 * updateStyles  : ( path, value ) => void
 * basePath      : 位置情報が格納されているパス (既定 'base.position')
 * initialOpen   : PanelBody の初期 open 状態 (任意)
 */
export default function PositionSettingsPanel( {
	stylesRoot,
	setStyles,
	styles,
	updateStyles,
	basePath = 'base.position',
	initialOpen = false,
} ) {
	// path 生成のヘルパ
	const upStyle = ( key, value ) => updateStyles( `${ basePath }.${ key }`, value );

	const resetPosition = () => {
		const clone = cloneDeep( stylesRoot );

		set( clone, `${ basePath }.alignment`, '' );

		setStyles( clone );
	};

	return (
		<PanelBody
			title={ __( 'Position Settings', 'origamiui' ) }
			initialOpen={ initialOpen }
		>
			{/* position / sticky / fixed … ブレイクポイント別 */}
			<Flex wrap style={ { marginTop: '1.5em' } }>
				<FlexItem style={ { width: '45%' } }>
					<SelectControl
						label={ `${ __( 'Position', 'origamiui' ) }` }
						value={ styles.className.sm }
						options={ [
							{ label: '---', value: '' },
							{ label: 'static', value: 'static' },
							{ label: 'relative', value: 'relative' },
							{ label: 'absolute', value: 'absolute' },
							{ label: 'fixed', value: 'fixed' },
							{ label: 'sticky', value: 'sticky' },
						] }
						onChange={ ( v ) =>
							upStyle( `className.sm`, v )
						}
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</FlexItem>
			</Flex>

			{/* Alignment */}
      <Heading style={ { marginTop: '1.5em' } }>
				{ __( 'Alignment Settings', 'origamiui' ) }
			</Heading>
			<AlignmentMatrixControl
				label={ __( 'Alignment', 'origamiui' ) }
				value={ styles.alignment }
				onChange={ ( v ) => upStyle( 'alignment', v ) }
			/>
			{/* Reset ボタン */}
			<Button
				icon={ trash }
				variant="secondary"
				text={ __( 'Reset Position', 'origamiui' ) }
				onClick={ resetPosition }
				description={ __( 'Reset Position', 'origamiui' ) }
			/>

			{/* Translate Settings */}
			<Heading style={ { marginTop: '1.5em' } }>
				{ __( 'Translate Settings', 'origamiui' ) }
			</Heading>

			<ToggleControl
				style={ { marginTop: '1.5em' } }
				label={ __( '縦方向に半分外に出す', 'origamiui' ) }
				checked={ styles.isOutsideVertical }
				onChange={ ( v ) => upStyle( 'isOutsideVertical', v ) }
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				style={ { marginTop: '0.5em' } }
				label={ __( '横方向に半分外に出す', 'origamiui' ) }
				checked={ styles.isOutsideHorizontal }
				onChange={ ( v ) => upStyle( 'isOutsideHorizontal', v ) }
				__nextHasNoMarginBottom
			/>
		</PanelBody>
	);
}
