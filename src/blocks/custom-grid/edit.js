import { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, ButtonBlockAppender } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Flex, FlexItem, RangeControl, __experimentalHeading as Heading, __experimentalUnitControl as UnitControl, __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon } from '@wordpress/components';
// icon
import { AlignStartRow, AlignEndRow, AlignCenterRow, AlignStretchRow, AlignBaselineRow, AlignStartColumn, AlignEndColumn, AlignCenterColumn, AlignStretchColumn, AlignBaselineColumn } from '../../components/LayoutFlexIcons';
import { useSelect } from '@wordpress/data';
import { convertStylesToCSS } from '../../utils/style-converter';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

// 共通コンポーネントのインポート
import ResponsiveTabs from '../../components/ResponsiveTabs';
import DisplaySettingsPanel from '../../components/DisplaySettingsPanel';
import SizeSettingsPanel from '../../components/SizeSettingsPanel';
import SpacingSettingsPanel from '../../components/SpacingSettingsPanel';

export default function Edit({ attributes, setAttributes, clientId }){
  const { tagName, styles } = attributes;
  const gapSides = [ 'row', 'column' ];

  const makeGapOptions = () => {
		const base = parseFloat( styles.gapSpace || 1 ) || 1;
		const ops  = [ { label: '---', value: '' }, { label: '0', value: '0' } ];
		for ( let i = 1; i <= 10; i++ ) {
			ops.push( { label: `${ base * i }`, value: `${ i }` } );
		}
		return ops;
	};

  // スタイルを変換（useMemoで最適化）
  const { inlineStyles, blockClasses } = useMemo(() => {
    return convertStylesToCSS(styles);
  }, [styles]);

  // スタイルの更新
  const updateStyles = (path, value) => {
    const newStyles = cloneDeep(styles);
    set(newStyles, path, value);
    setAttributes({ styles: newStyles });
  };

  // ブロックのプロパティにインラインスタイルを適用
  const blockProps = useBlockProps({
    className: [ 'oui_grid', blockClasses ].filter( Boolean ).join( ' ' ),
    style: inlineStyles,
  });

  const TagName = tagName || 'div';

  const { innerBlockCount } = useSelect(select => ({
    innerBlockCount: select('core/block-editor').getBlockCount(clientId),
  }), [clientId]);
  
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    renderAppender: innerBlockCount > 0
      ? undefined // デフォルトのInserterを使用
      : () => <ButtonBlockAppender rootClientId={clientId} />
  });

  // ブロックの表示内容
  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Grid Settings', 'origamiui')}>
          <RangeControl
            label={ `${ __( 'Grid Columns', 'origamiui' ) } (SM)` }
            value={ styles.base.display.grid.columns.sm }
            onChange={ ( v ) => updateStyles( `base.display.grid.columns.sm`, v ) }
            min={ 1 }
            max={ 12 }
            step={ 1 }
            __next40pxDefaultSize
          />
          <RangeControl
            label={ `${ __( 'Grid Columns', 'origamiui' ) } (MD)` }
            value={ styles.base.display.grid.columns.md }
            onChange={ ( v ) => updateStyles( `base.display.grid.columns.md`, v ) }
            min={ 1 }
            max={ 12 }
            step={ 1 }
            __next40pxDefaultSize
          />
          <RangeControl
            label={ `${ __( 'Grid Columns', 'origamiui' ) } (LG)` }
            value={ styles.base.display.grid.columns.lg }
            onChange={ ( v ) => updateStyles( `base.display.grid.columns.lg`, v ) }
            min={ 1 }
            max={ 12 }
            step={ 1 }
            __next40pxDefaultSize
          />
          <Heading style={ { marginTop: '1.5em' } }>
            { __( 'Layout Settings', 'origamiui' ) }
          </Heading>
          <ResponsiveTabs>
            { ( tab ) => (
              <>
                {/* Flex */}
                <ToggleGroupControl
                  label={ `${ __( 'Align', 'origamiui' ) } (${ tab.name })` }
                  value={ styles.base.flex.align[ tab.name ] || undefined }
                  onChange={ ( dir ) =>
                    updateStyles( `base.flex.align.${ tab.name }`, dir ?? '' )
                  }
                  isDeselectable
                  __next40pxDefaultSize
                  __nextHasNoMarginBottom
                >
                  <ToggleGroupControlOptionIcon
                    value="start"
                    icon={ styles.base.flex.direction[ tab.name ] === 'column' ? AlignStartColumn : AlignStartRow  }
                    label="start"
                  />
                  <ToggleGroupControlOptionIcon
                    value="center"
                    icon={ styles.base.flex.direction[ tab.name ] === 'column' ? AlignCenterColumn : AlignCenterRow  }
                    label="center"
                  />
                  <ToggleGroupControlOptionIcon
                    value="end"
                    icon={ styles.base.flex.direction[ tab.name ] === 'column' ? AlignEndColumn : AlignEndRow  }
                    label="end"
                  />
                  <ToggleGroupControlOptionIcon
                    value="stretch"
                    icon={ styles.base.flex.direction[ tab.name ] === 'column' ? AlignStretchColumn : AlignStretchRow  }
                    label="stretch"
                  />
                  <ToggleGroupControlOptionIcon
                    value="baseline"
                    icon={ styles.base.flex.direction[ tab.name ] === 'column' ? AlignBaselineColumn : AlignBaselineRow  }
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
            value={ styles.base.flex.gapSpace }
            onChange={(newGap) =>
              updateStyles(`base.flex.gapSpace`, newGap)
            }
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
                {/* <Flex wrap>
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
                </Flex> */}
                <Flex style={{flexWrap: 'wrap'}}>
                  {gapSides.map((side) => (
                    <FlexItem style={{width: '45%'}}>
                      <SelectControl
                        key={`${side}-${tab.name}`}
                        label={`${side} (${tab.title})`}
                        value={styles.base.flex.gap[side][tab.name]}
                        options={[
                          { label: '---', value: '' },
                          { label: 0, value: '0' },
                          { label: `${parseFloat(styles.base.flex.gapSpace)}`, value: '1' },
                          { label: `${parseFloat(styles.base.flex.gapSpace) * 2}`, value: '2' },
                          { label: `${parseFloat(styles.base.flex.gapSpace) * 3}`, value: '3' },
                          { label: `${parseFloat(styles.base.flex.gapSpace) * 4}`, value: '4' },
                          { label: `${parseFloat(styles.base.flex.gapSpace) * 5}`, value: '5' },
                          { label: `${parseFloat(styles.base.flex.gapSpace) * 6}`, value: '6' },
                          { label: `${parseFloat(styles.base.flex.gapSpace) * 7}`, value: '7' },
                          { label: `${parseFloat(styles.base.flex.gapSpace) * 8}`, value: '8' },
                          { label: `${parseFloat(styles.base.flex.gapSpace) * 9}`, value: '9' },
                          { label: `${parseFloat(styles.base.flex.gapSpace) * 10}`, value: '10' },
                        ]}
                        onChange={(newGap) =>
                          updateStyles(`base.flex.gap.${side}.${tab.name}`, newGap)
                        }
                        __next40pxDefaultSize={ true }
                        __nextHasNoMarginBottom={ true }
                      />
                    </FlexItem>
                  ))}
                </Flex>
              </>
            ) }
          </ResponsiveTabs>
        </PanelBody>
        {/* <LayoutGridSettingsPanel
          styles={ styles.base.flex }
          updateStyles={ updateStyles }
          initialOpen={ false }
          showDisplaySetting={ false }
        /> */}
        <SpacingSettingsPanel
          styles={ styles.base.spacing }
          updateStyles={ updateStyles }
          initialOpen={ false }
        />
        <SizeSettingsPanel
          styles={ styles.base.sizing }
          updateStyles={ updateStyles }
          initialOpen={ false }
        />
        <PanelBody title={__('Position Settings', 'origamiui')} initialOpen={false}>
          <ResponsiveTabs>
            { ( tab ) => (
              <Flex wrap style={ { marginTop: '1.5em' } }>
                <FlexItem style={ { width: '45%' } }>
                  <SelectControl
                    label={ `${ __( 'Position', 'origamiui' ) } (${ tab.name })` }
                    value={ styles.base.position.className[ tab.name ] }
                    options={ [
                      { label: '---', value: '' },
                      { label: 'static', value: 'static' },
                      { label: 'relative', value: 'relative' },
                      { label: 'absolute', value: 'absolute' },
                      { label: 'fixed', value: 'fixed' },
                      { label: 'sticky', value: 'sticky' },
                    ] }
                    onChange={(v) => updateStyles(`base.position.className.${tab.name}`, v)}
                    __next40pxDefaultSize
                    __nextHasNoMarginBottom
                  />
                </FlexItem>
              </Flex>
            ) }
          </ResponsiveTabs>
        </PanelBody>
        <DisplaySettingsPanel
          styles={ styles.base.display }
          updateStyles={ updateStyles }
          tagName={ tagName }
          onTagChange={ (v)=>setAttributes({ tagName: v }) }
        />
      </InspectorControls>
      
      <TagName {...innerBlocksProps} />
    </>
  );
};