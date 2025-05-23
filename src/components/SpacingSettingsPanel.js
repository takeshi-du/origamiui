import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	__experimentalUnitControl as UnitControl,
	SelectControl,
	Flex,
	FlexItem,
	__experimentalHeading as Heading,
} from '@wordpress/components';
import ResponsiveTabs from './ResponsiveTabs';

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
	styles,
	updateStyles,
	basePath = 'base.spacing',
	initialOpen = false,
} ) {
	const set = ( key, v ) => updateStyles( `${ basePath }.${ key }`, v );

	// 値生成ヘルパ
	const makeOptions = ( allowNegative = false ) => {
		const base = parseFloat( styles.space || 1 ) || 1;
		const ops  = [ { label: '---', value: '' } ];
		if ( allowNegative ) {
			for ( let i = 1; i <= 10; i++ ) {
				ops.push( { label: `${ base * -i }`, value: `n${ i }` } );
			}
		}
		ops.push( { label: '0', value: '0' } );
		for ( let i = 1; i <= 10; i++ ) {
			ops.push( { label: `${ base * i }`, value: `${ i }` } );
		}
		return ops;
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
				onChange={ ( v ) => set( 'space', v ) }
				units={ [
					{ value: 'px', label: 'px' },
					{ value: 'em', label: 'em' },
					{ value: 'rem', label: 'rem' },
				] }
				__next40pxDefaultSize
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
										label={ `${ side } (${ tab.name })` }
										value={ styles.margin[ side ][ tab.name ] }
										options={ makeOptions( true ) }
										onChange={ ( v ) =>
											set( `margin.${ side }.${ tab.name }`, v )
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
										options={ makeOptions() }
										onChange={ ( v ) =>
											set( `padding.${ side }.${ tab.name }`, v )
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
