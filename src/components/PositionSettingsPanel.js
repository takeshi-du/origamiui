import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	AlignmentMatrixControl,
	ToggleControl,
	Flex,
	FlexItem,
	__experimentalHeading as Heading,
} from '@wordpress/components';
import ResponsiveTabs from './ResponsiveTabs';

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
	styles,
	updateStyles,
	basePath = 'base.position',
	initialOpen = false,
} ) {
	// path 生成のヘルパ
	const set = ( key, value ) => updateStyles( `${ basePath }.${ key }`, value );

	return (
		<PanelBody
			title={ __( 'Position Settings', 'origamiui' ) }
			initialOpen={ initialOpen }
		>
			{/* position / sticky / fixed … ブレイクポイント別 */}
			<ResponsiveTabs>
				{ ( tab ) => (
					<Flex wrap style={ { marginTop: '1.5em' } }>
						<FlexItem style={ { width: '45%' } }>
							<SelectControl
								label={ `${ __( 'Position', 'origamiui' ) } (${ tab.name })` }
								value={ styles.className[ tab.name ] }
								options={ [
									{ label: '---', value: '' },
									{ label: 'static', value: 'static' },
									{ label: 'relative', value: 'relative' },
									{ label: 'absolute', value: 'absolute' },
									{ label: 'fixed', value: 'fixed' },
									{ label: 'sticky', value: 'sticky' },
								] }
								onChange={ ( v ) =>
									set( `className.${ tab.name }`, v )
								}
								__next40pxDefaultSize
								__nextHasNoMarginBottom
							/>
						</FlexItem>
					</Flex>
				) }
			</ResponsiveTabs>

			{/* Alignment */}
      <Heading style={ { marginTop: '1.5em' } }>
				{ __( 'Alignment Settings', 'origamiui' ) }
			</Heading>
			<AlignmentMatrixControl
				label={ __( 'Alignment', 'origamiui' ) }
				value={ styles.alignment }
				onChange={ ( v ) => set( 'alignment', v ) }
			/>

			{/* Translate Settings */}
			<Heading style={ { marginTop: '1.5em' } }>
				{ __( 'Translate Settings', 'origamiui' ) }
			</Heading>

			<ToggleControl
				style={ { marginTop: '1.5em' } }
				label={ __( '縦方向に半分外に出す', 'origamiui' ) }
				checked={ styles.isOutsideVertical }
				onChange={ ( v ) => set( 'isOutsideVertical', v ) }
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				style={ { marginTop: '0.5em' } }
				label={ __( '横方向に半分外に出す', 'origamiui' ) }
				checked={ styles.isOutsideHorizontal }
				onChange={ ( v ) => set( 'isOutsideHorizontal', v ) }
				__nextHasNoMarginBottom
			/>
		</PanelBody>
	);
}
