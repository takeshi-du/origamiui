import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	__experimentalHeading as Heading,
	Flex,
	FlexItem,
	Button,
	__experimentalUnitControl as UnitControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import ResponsiveTabs from './ResponsiveTabs';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

// icon
import { arrowRight, arrowDown, trash } from '@wordpress/icons';
// import { ReactComponent as alignStartRow } from '../../assets/images/layout/align-start-row.svg';
// import { ReactComponent as alignEndRow } from '../../assets/images/layout/align-end-row.svg';
import { AlignStartRow, AlignEndRow, AlignCenterRow, AlignStretchRow, AlignBaselineRow, AlignStartColumn, AlignEndColumn, AlignCenterColumn, AlignStretchColumn, AlignBaselineColumn, JustifyStartRow, JustifyEndRow, JustifyCenterRow, JustifyBetweenRow, JustifyAroundRow, JustifyStartColumn, JustifyEndColumn, JustifyCenterColumn, JustifyBetweenColumn, JustifyAroundColumn, SelfStartRow, SelfEndRow, SelfCenterRow, SelfStretchRow, SelfBaselineRow, SelfStartColumn, SelfEndColumn, SelfCenterColumn, SelfStretchColumn, SelfBaselineColumn, } from '../components/LayoutFlexIcons';

const gapSides = [ 'row', 'column' ];

/**
 * 共通「Layout & Flex Settings」パネル
 *
 * props
 * --------------------------------------------------
 * stylesRoot  : styles
 * setStyles   : ( styles ) => void
 * styles    : styles.base.flex オブジェクト
 * updateStyles  : ( path, value ) => void
 * basePath      : 既定 'base.flex' （変更可）
 * initialOpen   : PanelBody 初期 open 状態
 */
export default function LayoutFlexSettingsPanel( {
	stylesRoot,
	setStyles,
	styles,
	updateStyles,
	basePath = 'base.flex',
	initialOpen = false,
} ) {
	const upStyles = ( key, v ) => updateStyles( `${ basePath }.${ key }`, v );

	// gap オプション生成
	const base = parseFloat( styles.gapSpace );
	const hasBase = ! isNaN( base );
	const gapOptions = hasBase
		? [
				{ label: '---', value: '' },
				{ label: '0',   value: '0' },
				...Array.from( { length: 10 }, ( _, i ) => ( {
					label: `${ base * ( i + 1 ) }`,
					value: String( i + 1 ),
				} ) ),
			]
		: [ { label: '---', value: '' } ];
	
	const resetGap = () => {
		const clone = cloneDeep( stylesRoot );

		set( clone, `${ basePath }.gapSpace`, '' );

		[ 'row', 'column' ].forEach( axis => {
			[ 'sm', 'md', 'lg' ].forEach( bp => {
				set( clone, `${ basePath }.gap.${ axis }.${ bp }`, '' );
			} );
		} );

		setStyles( clone );
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
								{ label: '---', value: '' },
								{ label: 'none', value: 'none' },
								{ label: 'inline', value: 'inline' },
								{ label: 'inline-block', value: 'inline-block' },
								{ label: 'block', value: 'block' },
								{ label: 'flex', value: 'flex' },
								{ label: 'inline-flex', value: 'inline-flex' },
							] }
							onChange={ ( v ) => upStyles( `display.${ tab.name }`, v ) }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>

						{/* Flex */}
						<Heading style={ { marginTop: '1.5em' } }>
							{ __( 'Flex Settings', 'origamiui' ) }
						</Heading>
						<ToggleGroupControl
							label={ `${ __( 'Direction', 'origamiui' ) } (${ tab.name })` }
							value={ styles.direction[ tab.name ] || undefined }
							onChange={ ( dir ) =>
								upStyles( `direction.${ tab.name }`, dir ?? '' )
							}
							isDeselectable
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						>
							<ToggleGroupControlOptionIcon
								value="row"
								icon={ arrowRight }
								label="row"
							/>
							<ToggleGroupControlOptionIcon
								value="column"
								icon={ arrowDown }
								label="column"
							/>
						</ToggleGroupControl>

						<ToggleGroupControl
							label={ `${ __( 'Align', 'origamiui' ) } (${ tab.name })` }
							value={ styles.align[ tab.name ] || undefined }
							onChange={ ( dir ) =>
								upStyles( `align.${ tab.name }`, dir ?? '' )
							}
							isDeselectable
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						>
							<ToggleGroupControlOptionIcon
								value="start"
								icon={ styles.direction[ tab.name ] === 'column' ? AlignStartColumn : AlignStartRow  }
								label="start"
							/>
							<ToggleGroupControlOptionIcon
								value="center"
								icon={ styles.direction[ tab.name ] === 'column' ? AlignCenterColumn : AlignCenterRow  }
								label="center"
							/>
							<ToggleGroupControlOptionIcon
								value="end"
								icon={ styles.direction[ tab.name ] === 'column' ? AlignEndColumn : AlignEndRow  }
								label="end"
							/>
							<ToggleGroupControlOptionIcon
								value="stretch"
								icon={ styles.direction[ tab.name ] === 'column' ? AlignStretchColumn : AlignStretchRow  }
								label="stretch"
							/>
							<ToggleGroupControlOptionIcon
								value="baseline"
								icon={ styles.direction[ tab.name ] === 'column' ? AlignBaselineColumn : AlignBaselineRow  }
								label="baseline"
							/>
						</ToggleGroupControl>

						<ToggleGroupControl
							label={ `${ __( 'Justify', 'origamiui' ) } (${ tab.name })` }
							value={ styles.justify[ tab.name ] || undefined }
							onChange={ ( dir ) =>
								upStyles( `justify.${ tab.name }`, dir ?? '' )
							}
							isDeselectable
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						>
							<ToggleGroupControlOptionIcon
								value="start"
								icon={ styles.direction[ tab.name ] === 'column' ? JustifyStartColumn : JustifyStartRow  }
								label="start"
							/>
							<ToggleGroupControlOptionIcon
								value="center"
								icon={ styles.direction[ tab.name ] === 'column' ? JustifyCenterColumn : JustifyCenterRow  }
								label="center"
							/>
							<ToggleGroupControlOptionIcon
								value="end"
								icon={ styles.direction[ tab.name ] === 'column' ? JustifyEndColumn : JustifyEndRow  }
								label="end"
							/>
							<ToggleGroupControlOptionIcon
								value="between"
								icon={ styles.direction[ tab.name ] === 'column' ? JustifyBetweenColumn : JustifyBetweenRow  }
								label="between"
							/>
							<ToggleGroupControlOptionIcon
								value="around"
								icon={ styles.direction[ tab.name ] === 'column' ? JustifyAroundColumn : JustifyAroundRow  }
								label="around"
							/>
						</ToggleGroupControl>

						<ToggleGroupControl
							label={ `${ __( 'AlignSelf', 'origamiui' ) } (${ tab.name })` }
							value={ styles.self[ tab.name ] || undefined }
							onChange={ ( dir ) =>
								upStyles( `self.${ tab.name }`, dir ?? '' )
							}
							isDeselectable
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						>
							<ToggleGroupControlOptionIcon
								value="start"
								icon={ styles.direction[ tab.name ] === 'column' ? SelfStartColumn : SelfStartRow  }
								label="start"
							/>
							<ToggleGroupControlOptionIcon
								value="center"
								icon={ styles.direction[ tab.name ] === 'column' ? SelfCenterColumn : SelfCenterRow  }
								label="center"
							/>
							<ToggleGroupControlOptionIcon
								value="end"
								icon={ styles.direction[ tab.name ] === 'column' ? SelfEndColumn : SelfEndRow  }
								label="end"
							/>
							<ToggleGroupControlOptionIcon
								value="stretch"
								icon={ styles.direction[ tab.name ] === 'column' ? SelfStretchColumn : SelfStretchRow  }
								label="stretch"
							/>
							<ToggleGroupControlOptionIcon
								value="baseline"
								icon={ styles.direction[ tab.name ] === 'column' ? SelfBaselineColumn : SelfBaselineRow  }
								label="baseline"
							/>
						</ToggleGroupControl>

						{/* Grow / Shrink / Self / Order */}
						<Flex wrap>
							{ [
								{
									key: 'grow',
									options: [
										{ label: '---', value: '' },
										{ label: 'grow', value: 'grow-1' },
										{ label: 'no grow', value: 'grow-0' },
									],
								},
								{
									key: 'shrink',
									options: [
										{ label: '---', value: '' },
										{ label: 'shrink', value: 'shrink-1' },
										{ label: 'no shrink', value: 'shrink-0' },
									],
								},
								{
									key: 'wrap',
									options: [
										{ label: '---', value: '' },
										{ label: 'wrap', value: 'wrap' },
										{ label: 'no wrap', value: 'nowrap' },
									],
								},
								{
									key: 'order',
									options: [
										{ label: '---', value: '' },
										{ label: '0', value: '0' },
										{ label: '1', value: '1' },
										{ label: '2', value: '2' },
										{ label: '3', value: '3' },
										{ label: '4', value: '4' },
										{ label: '5', value: '5' },
									],
								},
							].map( ( cfg ) => (
								<FlexItem key={ cfg.key } style={ { width: '45%' } }>
									<SelectControl
										label={ `${ __( cfg.key, 'origamiui' ) } (${ tab.name })` }
										value={ styles[ cfg.key ][ tab.name ] }
										options={ cfg.options }
										onChange={ ( v ) =>
											upStyles( `${ cfg.key }.${ tab.name }`, v )
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
				onChange={ ( v ) => upStyles( 'gapSpace', v ) }
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
				text={ __( 'Reset gap', 'origamiui' ) }
				onClick={ resetGap }
				description={ __( 'Reset gapSpace & gap options', 'origamiui' ) }
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
										options={ gapOptions }
										onChange={ ( v ) =>
											upStyles( `gap.${ axis }.${ tab.name }`, v )
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
