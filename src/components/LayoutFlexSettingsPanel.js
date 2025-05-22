import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	__experimentalHeading as Heading,
	Flex,
	FlexItem,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import ResponsiveTabs from './ResponsiveTabs';

const gapSides = [ 'row', 'column' ];

/**
 * 共通「Layout & Flex Settings」パネル
 *
 * props
 * --------------------------------------------------
 * styles        : styles.base.flex オブジェクト
 * updateStyles  : ( path, value ) => void
 * basePath      : 既定 'base.flex' （変更可）
 * initialOpen   : PanelBody 初期 open 状態
 */
export default function LayoutFlexSettingsPanel( {
	styles,
	updateStyles,
	basePath = 'base.flex',
	initialOpen = false,
} ) {
	const set = ( key, v ) => updateStyles( `${ basePath }.${ key }`, v );

	// gap オプション生成
	const makeGapOptions = () => {
		const base = parseFloat( styles.gapSpace || 1 ) || 1;
		const ops  = [ { label: '---', value: '---' }, { label: '0', value: '0' } ];
		for ( let i = 1; i <= 10; i++ ) {
			ops.push( { label: `${ base * i }`, value: `${ i }` } );
		}
		return ops;
	};

	return (
		<PanelBody
			title={ __( 'Layout & Flex Settings', 'origamiui' ) }
			initialOpen={ initialOpen }
		>
			{/* Display & Flex – ブレイクポイント別 */}
			<ResponsiveTabs>
				{ ( tab ) => (
					<>
						{/* Display */}
						<Heading style={ { marginTop: '1.5em' } }>
							{ __( 'Display Settings', 'origamiui' ) }
						</Heading>
						<SelectControl
							label={ `${ __( 'Display', 'origamiui' ) } (${ tab.name })` }
							value={ styles.display[ tab.name ] }
							options={ [
								{ label: '---', value: '---' },
								{ label: 'none', value: 'none' },
								{ label: 'inline', value: 'inline' },
								{ label: 'inline-block', value: 'inline-block' },
								{ label: 'block', value: 'block' },
								{ label: 'flex', value: 'flex' },
								{ label: 'inline-flex', value: 'inline-flex' },
							] }
							onChange={ ( v ) => set( `display.${ tab.name }`, v ) }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>

						{/* Flex */}
						<Heading style={ { marginTop: '1.5em' } }>
							{ __( 'Flex Settings', 'origamiui' ) }
						</Heading>
						<Flex wrap>
							{/* Direction / Wrap */}
							{ [
								{
									key: 'direction',
									options: [
										{ label: '---', value: '---' },
										{ label: 'row', value: 'row' },
										{ label: 'column', value: 'column' },
									],
								},
								{
									key: 'wrap',
									options: [
										{ label: '---', value: '---' },
										{ label: 'nowrap', value: 'nowrap' },
										{ label: 'wrap', value: 'wrap' },
									],
								},
							].map( ( cfg ) => (
								<FlexItem key={ cfg.key } style={ { width: '45%' } }>
									<SelectControl
										label={ `${ __( cfg.key, 'origamiui' ) } (${ tab.name })` }
										value={ styles[ cfg.key ][ tab.name ] }
										options={ cfg.options }
										onChange={ ( v ) =>
											set( `${ cfg.key }.${ tab.name }`, v )
										}
										__next40pxDefaultSize
										__nextHasNoMarginBottom
									/>
								</FlexItem>
							) ) }
						</Flex>

						{/* Align / Justify */}
						<Flex wrap>
							{ [
								{
									key: 'align',
									options: [
										'start',
										'end',
										'center',
										'baseline',
										'stretch',
									],
								},
								{
									key: 'justify',
									options: [
										'start',
										'end',
										'center',
										'between',
										'around',
										'evenry',
									],
								},
							].map( ( cfg ) => (
								<FlexItem key={ cfg.key } style={ { width: '45%' } }>
									<SelectControl
										label={ `${ __( cfg.key, 'origamiui' ) } (${ tab.name })` }
										value={ styles[ cfg.key ][ tab.name ] }
										options={ [
											{ label: '---', value: '---' },
											...cfg.options.map( ( o ) => ( {
												label: o,
												value: o,
											} ) ),
										] }
										onChange={ ( v ) =>
											set( `${ cfg.key }.${ tab.name }`, v )
										}
										__next40pxDefaultSize
										__nextHasNoMarginBottom
									/>
								</FlexItem>
							) ) }
						</Flex>

						{/* Grow / Shrink / Self / Order */}
						<Flex wrap>
							{ [
								{
									key: 'grow',
									options: [
										{ label: '---', value: '---' },
										{ label: 'grow', value: 'grow-1' },
										{ label: 'no grow', value: 'grow-0' },
									],
								},
								{
									key: 'shrink',
									options: [
										{ label: '---', value: '---' },
										{ label: 'shrink', value: 'shrink-1' },
										{ label: 'no shrink', value: 'shrink-0' },
									],
								},
								{
									key: 'self',
									options: [
                    '---',
										'start',
										'end',
										'center',
										'baseline',
										'stretch',
									],
								},
								{
									key: 'order',
									options: [ '---', '0', '1', '2', '3', '4', '5' ],
								},
							].map( ( cfg ) => (
								<FlexItem key={ cfg.key } style={ { width: '45%' } }>
									<SelectControl
										label={ `${ __( cfg.key, 'origamiui' ) } (${ tab.name })` }
										value={ styles[ cfg.key ][ tab.name ] }
										options={ Array.isArray( cfg.options )
											? cfg.options.map( ( o ) =>
													typeof o === 'string'
														? { label: o, value: o }
														: o
											  )
											: cfg.options }
										onChange={ ( v ) =>
											set( `${ cfg.key }.${ tab.name }`, v )
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

			{/* Gap 基準値 */}
			<Heading style={ { marginTop: '1.5em' } }>
				{ __( 'Gap Settings', 'origamiui' ) }
			</Heading>
			<UnitControl
				label={ __( '--gapSpace', 'origamiui' ) }
				value={ styles.gapSpace }
				onChange={ ( v ) => set( 'gapSpace', v ) }
				units={ [
					{ value: 'px', label: 'px' },
					{ value: 'em', label: 'em' },
					{ value: 'rem', label: 'rem' },
				] }
				__next40pxDefaultSize
			/>

			{/* Gap row / column */}
			<ResponsiveTabs>
				{ ( tab ) => (
					<>
						<Heading style={ { marginTop: '1.5em' } }>
							{ __( 'Gap Space', 'origamiui' ) }
						</Heading>
						<Flex wrap>
							{ gapSides.map( ( axis ) => (
								<FlexItem key={ axis } style={ { width: '45%' } }>
									<SelectControl
										label={ `${ axis } (${ tab.name })` }
										value={ styles.gap[ axis ][ tab.name ] }
										options={ makeGapOptions() }
										onChange={ ( v ) =>
											set( `gap.${ axis }.${ tab.name }`, v )
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
