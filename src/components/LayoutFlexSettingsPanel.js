import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	__experimentalHeading as Heading,
	Flex,
	FlexItem,
	__experimentalUnitControl as UnitControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';
import ResponsiveTabs from './ResponsiveTabs';

// icon
import { arrowRight, arrowDown } from '@wordpress/icons';
// import { ReactComponent as alignStartRow } from '../../assets/images/layout/align-start-row.svg';
// import { ReactComponent as alignEndRow } from '../../assets/images/layout/align-end-row.svg';
import { AlignStartRow, AlignEndRow, AlignCenterRow, AlignStretchRow, AlignBaselineRow, AlignStartColumn, AlignEndColumn, AlignCenterColumn, AlignStretchColumn, AlignBaselineColumn, JustifyStartRow, JustifyEndRow, JustifyCenterRow, JustifyBetweenRow, JustifyAroundRow, JustifyStartColumn, JustifyEndColumn, JustifyCenterColumn, JustifyBetweenColumn, JustifyAroundColumn, SelfStartRow, SelfEndRow, SelfCenterRow, SelfStretchRow, SelfBaselineRow, SelfStartColumn, SelfEndColumn, SelfCenterColumn, SelfStretchColumn, SelfBaselineColumn, } from '../components/LayoutFlexIcons';

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
		const ops  = [ { label: '---', value: '' }, { label: '0', value: '0' } ];
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
								{ label: '---', value: '' },
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
						<ToggleGroupControl
							label={ `${ __( 'Direction', 'origamiui' ) } (${ tab.name })` }
							value={ styles.direction[ tab.name ] || undefined }
							onChange={ ( dir ) =>
								set( `direction.${ tab.name }`, dir ?? '' )
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
								set( `align.${ tab.name }`, dir ?? '' )
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
								set( `justify.${ tab.name }`, dir ?? '' )
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
								set( `self.${ tab.name }`, dir ?? '' )
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

						{/* <SelectControl
							label={ `${ __( 'Wrap', 'origamiui' ) } (${ tab.name })` }
							value={styles.wrap[tab.name]}
							options={[
								{ label: '---', value: '' },
								{ label: 'nowrap', value: 'nowrap' },
								{ label: 'wrap', value: 'wrap' },
							]}
							onChange={(v) => set(`wrap.${tab.name}`, v)}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/> */}

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
