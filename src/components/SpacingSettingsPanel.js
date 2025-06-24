import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	__experimentalUnitControl as UnitControl,
	SelectControl,
	Button, 
	Flex,
	FlexItem,
	__experimentalHeading as Heading,
} from '@wordpress/components';
import ResponsiveTabs from './ResponsiveTabs';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

// icon
import { trash } from '@wordpress/icons';

const marginSides = [ 'top', 'bottom', 'left', 'right' ];

/**
 * 共通「Spacing Settings」パネル
 *
 * props
 * --------------------------------------------------
 * styles        : styles.base.spacing オブジェクト
 * updateStyles  : ( path, value ) => void
 * basePath      : デフォルト 'base.spacing'
 * initialOpen   : PanelBody の初期 open 状態
 */
export default function SpacingSettingsPanel( {
	stylesRoot,
	setStyles,
	styles,
	updateStyles,
	basePath = 'base.spacing',
	initialOpen = false,
} ) {
	const upStyle = ( key, v ) => updateStyles( `${ basePath }.${ key }`, v );

	// space オプション生成
	const base = parseFloat( styles.space );
	const hasBase = ! isNaN( base );
	const spaceOptionsMargin = hasBase
		? [
				{ label: '---', value: '' },
				{ label: 'auto',   value: 'auto' },
				{ label: '0',   value: '0' },
				...Array.from( { length: 10 }, ( _, i ) => ( {
					label: `${ base * ( i + 1 ) }`,
					value: String( i + 1 ),
				} ) ),
			]
		: [ { label: '---', value: '' }, { label: 'auto',   value: 'auto' } ];
	const spaceOptions = hasBase
		? [
				{ label: '---', value: '' },
				{ label: '0',   value: '0' },
				...Array.from( { length: 10 }, ( _, i ) => ( {
					label: `${ base * ( i + 1 ) }`,
					value: String( i + 1 ),
				} ) ),
			]
		: [ { label: '---', value: '' } ];
	
	const resetSpace = () => {
		const clone = cloneDeep( stylesRoot );

		set( clone, `${ basePath }.space`, '' );

		[ 'margin', 'padding' ].forEach( axis => {
			[ 'top', 'bottom', 'left', 'right' ].forEach( side => {
				[ 'sm', 'md', 'lg' ].forEach( bp => {
					set( clone, `${ basePath }.${ axis }.${side}.${ bp }`, '' );
				} );
			} );
		} );

		setStyles( clone );
	};

	return (
		<PanelBody
			title={ __( 'Spacing Settings', 'origamiui' ) }
			initialOpen={ initialOpen }
		>
			{/* --space 基準 */}
			<UnitControl
				label={ __( '--space', 'origamiui' ) }
				value={ styles.space }
				onChange={ ( v ) => upStyle( 'space', v ) }
				units={ [
					{ value: 'px', label: 'px' },
					{ value: 'em', label: 'em' },
					{ value: 'rem', label: 'rem' },
				] }
				__next40pxDefaultSize
			/>
			{/* Reset ボタン */}
			<Button
				icon={ trash }
				variant="secondary"
				text={ __( 'Reset space', 'origamiui' ) }
				onClick={ resetSpace }
				description={ __( 'Reset space & gap options', 'origamiui' ) }
			/>
			<ResponsiveTabs>
				{ ( tab ) => (
					<>
						{/* Margin */}
						<Heading style={ { marginTop: '1.5em' } }>
							{ __( 'Margin Settings', 'origamiui' ) }
						</Heading>
						<Flex wrap>
							{ marginSides.map( ( side ) => (
								<FlexItem key={ side } style={ { width: '45%' } }>
									<SelectControl
										key={`${side}-${tab.name}`}
										label={ `${ side } (${ tab.name })` }
										value={ styles.margin[ side ][ tab.name ] }
										options={spaceOptionsMargin}
										onChange={ ( v ) =>
											upStyle( `margin.${ side }.${ tab.name }`, v )
										}
										__next40pxDefaultSize
										__nextHasNoMarginBottom
									/>
								</FlexItem>
							) ) }
						</Flex>

						{/* Padding */}
						<Heading style={ { marginTop: '1.5em' } }>
							{ __( 'Padding Settings', 'origamiui' ) }
						</Heading>
						<Flex wrap>
							{ marginSides.map( ( side ) => (
								<FlexItem key={ side } style={ { width: '45%' } }>
									<SelectControl
										label={ `${ side } (${ tab.name })` }
										value={ styles.padding[ side ][ tab.name ] }
										options={spaceOptions}
										onChange={ ( v ) =>
											upStyle( `padding.${ side }.${ tab.name }`, v )
										}
										__next40pxDefaultSize
										__nextHasNoMarginBottom
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
