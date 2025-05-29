import { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, ButtonBlockAppender } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Flex, FlexItem, RangeControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { convertStylesToCSS } from '../../utils/style-converter';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

// 共通コンポーネントのインポート
import ResponsiveTabs from '../../components/ResponsiveTabs';
import DisplaySettingsPanel from '../../components/DisplaySettingsPanel';
import SizeSettingsPanel from '../../components/SizeSettingsPanel';
import SpacingSettingsPanel from '../../components/SpacingSettingsPanel';
import LayoutGridSettingsPanel from '../../components/LayoutGridSettingsPanel';

export default function Edit({ attributes, setAttributes, clientId }){
  const { tagName, styles } = attributes;

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
        </PanelBody>
        <LayoutGridSettingsPanel
          styles={ styles.base.flex }
          updateStyles={ updateStyles }
          initialOpen={ false }
          showDisplaySetting={ false }
        />
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