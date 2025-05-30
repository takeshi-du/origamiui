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

// icon
import { AlignStartRow, AlignEndRow, AlignCenterRow, AlignStretchRow, AlignBaselineRow, AlignStartColumn, AlignEndColumn, AlignCenterColumn, AlignStretchColumn, AlignBaselineColumn } from '../components/LayoutFlexIcons';
import { trash } from '@wordpress/icons';

const gapSides = [ 'row', 'column' ];

/**
 * 共通「Layout & Grid Settings」パネル
 *
 * props
 * --------------------------------------------------
 * styles        : styles.base.flex オブジェクト
 * updateStyles  : ( path, value ) => void
 * basePath      : 既定 'base.flex' （変更可）
 * initialOpen   : PanelBody 初期 open 状態
 */
export default function LayoutGridSettingsPanel( {
	styles,
	updateStyles,
	basePath = 'base.flex',
	initialOpen = false,
} ) {
	const set = ( key, v ) => updateStyles( `${ basePath }.${ key }`, v );

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
		// 1) gapSpace を空欄
		updateStyles( `${ basePath }.gapSpace`, '' );

		// 2) row / column × sm,md,lg すべて空欄
		[ 'row', 'column' ].forEach( axis => {
			[ 'sm', 'md', 'lg' ].forEach( bp => {
				updateStyles( `${ basePath }.gap.${ axis }.${ bp }`, '' );
			} );
		} );
	};

	return (
		<PanelBody
			title={ __( 'Layout Settings', 'origamiui' ) }
			initialOpen={ initialOpen }
		>
			{/* Display & Flex – ブレイクポイント別 */}
			<ResponsiveTabs>
				{ ( tab ) => (
					<>
						{/* Flex */}
						<Heading style={ { marginTop: '1.5em' } }>
							{ __( 'Layout Settings', 'origamiui' ) }
						</Heading>
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
