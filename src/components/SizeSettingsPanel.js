import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	__experimentalUnitControl as UnitControl,
	Flex,
	Button,
	FlexItem,
	__experimentalHeading as Heading,
} from '@wordpress/components';
import ResponsiveTabs from './ResponsiveTabs';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

// icon
import { trash } from '@wordpress/icons';

/**
 * 共通「Sizing Settings」パネル
 *
 * props
 * --------------------------------------------------
 * styles        : styles.base.sizing オブジェクト
 * updateStyles  : ( path, value ) => void
 * basePath      : 既定 'base.sizing' （変更可）
 * initialOpen   : PanelBody 初期 open 状態
 */
export default function SizeSettingsPanel( {
	stylesRoot,
	setStyles,
	styles,
	updateStyles,
	basePath = 'base.sizing',
	initialOpen = false,
} ) {
	const upStyles = ( key, v ) => updateStyles( `${ basePath }.${ key }`, v );

	// size オプション生成
	const base = parseFloat( styles.size );
	const hasBase = ! isNaN( base );
	const sizeOptions = hasBase
		? [
				{ label: '---', value: '' },
				{ label: 'auto',   value: 'auto' },
				...Array.from( { length: 10 }, ( _, i ) => ( {
					label: `${ base * ( i + 1 ) }`,
					value: String( i + 1 ),
				} ) ),
			]
		: [ { label: '---', value: '' }, { label: 'auto',   value: 'auto' } ];
	
	const resetSize = () => {
		const clone = cloneDeep( stylesRoot );

		set( clone, `${ basePath }.size`, '' );

		[ 'width', 'height' ].forEach( axis => {
			[ 'sm', 'md', 'lg' ].forEach( bp => {
				set( clone, `${ basePath }.${ axis }.${ bp }`, '' );
			} );
		} );

		setStyles( clone );
	};

	return (
		<PanelBody
			title={ __( 'Sizing Settings', 'origamiui' ) }
			initialOpen={ initialOpen }
		>
			{/* --size 基準値 */}
			<UnitControl
				label={ __( '--size', 'origamiui' ) }
				value={ styles.size }
				onChange={ ( v ) => upStyles( 'size', v ) }
				units={ [
					{ value: '%', label: '%' },
					{ value: 'px', label: 'px' },
				] }
				__next40pxDefaultSize
			/>
			{/* Reset ボタン */}
			<Button
				icon={ trash }
				variant="secondary"
				text={ __( 'Reset size', 'origamiui' ) }
				onClick={ resetSize }
				description={ __( 'Reset size & size options', 'origamiui' ) }
			/>
			{/* Width / Height – breakpoint 別 */}
			<ResponsiveTabs>
				{ ( tab ) => (
					<>
						<Heading style={ { marginTop: '1.5em' } }>
							{ __( 'Width & Height Settings', 'origamiui' ) }
						</Heading>
						<Flex wrap>
							{ [ 'width', 'height' ].map( ( dim ) => (
								<FlexItem key={ dim } style={ { width: '45%' } }>
									<SelectControl
										label={ `${ __( dim, 'origamiui' ) } (${ tab.name })` }
										value={ styles[ dim ][ tab.name ] }
										options={ sizeOptions }
										onChange={ ( v ) =>
											upStyles( `${ dim }.${ tab.name }`, v )
										}
										__next40pxDefaultSize
										__nextHasNoMarginBottom={ true }
									/>
								</FlexItem>
							) ) }
						</Flex>
					</>
				) }
			</ResponsiveTabs>
		</PanelBody>
	);
}
