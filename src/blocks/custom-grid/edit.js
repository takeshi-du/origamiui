import { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, ButtonBlockAppender } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Flex, FlexItem, Button, RangeControl, __experimentalHeading as Heading, __experimentalUnitControl as UnitControl, __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon } from '@wordpress/components';
// icon
import { AlignStartRow, AlignEndRow, AlignCenterRow, AlignStretchRow, AlignBaselineRow, AlignStartColumn, AlignEndColumn, AlignCenterColumn, AlignStretchColumn, AlignBaselineColumn } from '../../components/LayoutFlexIcons';
import { trash } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';
import { convertStylesToCSS } from '../../utils/style-converter';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

// 共通コンポーネントのインポート
import ResponsiveTabs from '../../components/ResponsiveTabs';
import DisplaySettingsPanel from '../../components/DisplaySettingsPanel';
import SizeSettingsPanel from '../../components/SizeSettingsPanel';
import SpacingSettingsPanel from '../../components/SpacingSettingsPanel';

import CodeMirrorField from '../../components/CodeMirrorField';
import useCustomCSS from '../../hooks/useCustomCSS';

export default function Edit({ attributes, setAttributes, clientId }){
  const { tagName, styles } = attributes;
  const {
    blockClass, rawCSS, compiledCSS, onChange
  } = useCustomCSS(
    { ...attributes, clientId }, setAttributes,
    { prefix: 'oui_cm-grid', tpl: 'selector {...}' }
  );

  const gapSides = [ 'row', 'column' ];

  const base = parseFloat( styles.base.flex.gapSpace );
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
    const clone = cloneDeep( styles );
    clone.base.flex.gapSpace = '';

    ['row','column'].forEach( axis => {
      ['sm','md','lg'].forEach( bp => {
        clone.base.flex.gap[ axis ][ bp ] = '';
      });
    });

    setAttributes( { styles: clone } );
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
            __nextHasNoMarginBottom
          />
          <RangeControl
            label={ `${ __( 'Grid Columns', 'origamiui' ) } (MD)` }
            value={ styles.base.display.grid.columns.md }
            onChange={ ( v ) => updateStyles( `base.display.grid.columns.md`, v ) }
            min={ 1 }
            max={ 12 }
            step={ 1 }
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />
          <RangeControl
            label={ `${ __( 'Grid Columns', 'origamiui' ) } (LG)` }
            value={ styles.base.display.grid.columns.lg }
            onChange={ ( v ) => updateStyles( `base.display.grid.columns.lg`, v ) }
            min={ 1 }
            max={ 12 }
            step={ 1 }
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />
          <Heading style={ { marginTop: '1.5em' } }>
            { __( 'Layout Settings', 'origamiui' ) }
          </Heading>
          <ResponsiveTabs>
            { ( tab ) => (
              <>
                {/* Flex */}
                <Heading style={ { marginTop: '1.5em' } }>
                  { __( 'Flex Settings', 'origamiui' ) }
                </Heading>
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
                        value={ styles.base.flex[ cfg.key ][ tab.name ] }
                        options={ cfg.options }
                        onChange={ ( v ) =>
                          updateStyles( `base.flex.${ cfg.key }.${ tab.name }`, v )
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
            __nextHasNoMarginBottom
          />
          {/* Reset ボタン */}
          <Button
            icon={ trash }
            variant="secondary"
            text={ __( 'Reset gap', 'origamiui' ) }
            onClick={ resetGap }
            description={ __( 'Reset gapSpace & gap options', 'origamiui' ) }
            __next40pxDefaultSize
          />
          {/* Gap row / column */}
          <ResponsiveTabs>
            { ( tab ) => (
              <>
                <Heading style={ { marginTop: '1.5em' } }>
                  { __( 'Gap Space', 'origamiui' ) }
                </Heading>
                <Flex style={{flexWrap: 'wrap'}}>
                  {gapSides.map((side) => (
                    <FlexItem style={{width: '45%'}}>
                      <SelectControl
                        key={`${side}-${tab.name}`}
                        label={`${side} (${tab.name})`}
                        value={styles.base.flex.gap[side][tab.name]}
                        options={gapOptions}
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
        <SpacingSettingsPanel
          stylesRoot={ styles }
          setStyles={ ( s ) => setAttributes({ styles: s }) }
          styles={ styles.base.spacing }
          updateStyles={ updateStyles }
          initialOpen={ false }
        />
        <SizeSettingsPanel
          stylesRoot={ styles }
          setStyles={ ( s ) => setAttributes({ styles: s }) }
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
        <PanelBody title={__('Custom CSS', 'origamiui')} initialOpen={false}>
          <CodeMirrorField value={ rawCSS } onChange={ onChange } />
          <p
            style={{
              fontSize: 12,
              opacity: 0.7,
              whiteSpace: 'pre-wrap',
            }}
          >
            {__(
              `「selector」を使うとこのブロックだけに適用されます。\n\n例)\nselector {\n  color: red;\n}\nselector:hover {\n  color: blue;\n}`,
              'origamiui'
            )}
          </p>
        </PanelBody>
      </InspectorControls>
      
      <TagName {...innerBlocksProps} />
      { compiledCSS && <style>{ compiledCSS }</style> }
    </>
  );
};