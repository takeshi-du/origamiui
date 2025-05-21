import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	__experimentalUnitControl as UnitControl,
	Flex,
	FlexItem,
	__experimentalHeading as Heading,
} from '@wordpress/components';
import ResponsiveTabs from './ResponsiveTabs';

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
	styles,
	updateStyles,
	basePath = 'base.sizing',
	initialOpen = false,
} ) {
	const set = ( key, v ) => updateStyles( `${ basePath }.${ key }`, v );

	// width / height のオプションを生成（--size の整数倍）
	const makeDimOptions = () => {
		const base = parseFloat( styles.size || 1 ) || 1;
		const options = [
			{ label: '---', value: '---' },
			{ label: 'auto', value: 'auto' },
		];
		for ( let i = 1; i <= 10; i++ ) {
			options.push( { label: `${ base * i }`, value: `${ i }` } );
		}
		return options;
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
				onChange={ ( v ) => set( 'size', v ) }
				units={ [
					{ value: '%', label: '%' },
					{ value: 'px', label: 'px' },
				] }
				__next40pxDefaultSize
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
										options={ makeDimOptions() }
										onChange={ ( v ) =>
											set( `${ dim }.${ tab.name }`, v )
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
