import { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, ButtonBlockAppender } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TabPanel, Flex, FlexItem, RangeControl, __experimentalHeading as Heading } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { convertStylesToCSS } from '../../utils/style-converter';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

// 追加: 共通コンポーネント
import ResponsiveTabs from '../../components/ResponsiveTabs';
import DisplaySettingsPanel from '../../components/DisplaySettingsPanel';
import SizeSettingsPanel from '../../components/SizeSettingsPanel';
import SpacingSettingsPanel from '../../components/SpacingSettingsPanel';
import LayoutFlexSettingsPanel from '../../components/LayoutFlexSettingsPanel';

import CodeMirrorField from '../../components/CodeMirrorField';
import useCustomCSS from '../../hooks/useCustomCSS';
import useHeadStyle from '../../hooks/useHeadStyle';

export default function Edit({ attributes, setAttributes, clientId }){
  const { tagName, styles } = attributes;
  const {
    blockClass, rawCSS, compiledCSS, onChange
  } = useCustomCSS(
    { ...attributes, clientId }, setAttributes,
    { prefix: 'oui_cm-column', tpl: 'selector {...}' }
  );

  // スタイルを変換（useMemoで最適化）
  const { inlineStyles, blockClasses } = useMemo(() => {
    return convertStylesToCSS(styles);
  }, [styles]);

  const nodeRef = useHeadStyle( compiledCSS, clientId );

  // スタイルの更新
  const updateStyles = (path, value) => {
    const newStyles = cloneDeep(styles);
    set(newStyles, path, value);
    setAttributes({ styles: newStyles });
  };

  // ブロックのプロパティにインラインスタイルを適用
  const blockProps = useBlockProps({
    className: blockClasses,
    style: inlineStyles,
    ref: nodeRef, 
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

  // 親ブロックのIDを取得
  const parentBlock = useSelect((select) => {
    const blockEditor = select('core/block-editor');
    const parents = blockEditor.getBlockParents(clientId);
    const parentClientId = parents.length > 0 ? parents[parents.length - 1] : null;
    return parentClientId ? blockEditor.getBlock(parentClientId).name : null;
  }, [clientId]);

  useEffect(() => {
    if (parentBlock) {
      updateStyles('base.sizing.parentBlockName', parentBlock);
    }
  }, [parentBlock]);

  // ブロックの表示内容
  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Column Settings', 'origamiui')}>
          <Heading style={ { marginTop: '1.5em' } }>{ __( 'Column Settings', 'origamiui' ) }</Heading>
          <RangeControl
            label={ `${ __( 'Column', 'origamiui' ) } (SM)` }
            value={ styles.base.sizing.column.sm ?? undefined }
            onChange={ ( v ) => updateStyles( `base.sizing.column.sm`, v ) }
            min={ 1 }
            max={ 12 }
            step={ 1 }
            allowReset
	          resetFallbackValue=""
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />
          <RangeControl
            label={ `${ __( 'Column', 'origamiui' ) } (MD)` }
            value={ styles.base.sizing.column.md ?? undefined }
            onChange={ ( v ) => updateStyles( `base.sizing.column.md`, v ) }
            min={ 1 }
            max={ 12 }
            step={ 1 }
            allowReset
	          resetFallbackValue=""
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />
          <RangeControl
            label={ `${ __( 'Column', 'origamiui' ) } (LG)` }
            value={ styles.base.sizing.column.lg ?? undefined }
            onChange={ ( v ) => updateStyles( `base.sizing.column.lg`, v ) }
            min={ 1 }
            max={ 12 }
            step={ 1 }
            allowReset
	          resetFallbackValue=""
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />
          <Heading style={ { marginTop: '1.5em' } }>{ __( 'Offset Settings', 'origamiui' ) }</Heading>
          <RangeControl
            label={ `${ __( 'Offset', 'origamiui' ) } (SM)` }
            value={ styles.base.sizing.offset.sm ?? undefined }
            onChange={ ( v ) => updateStyles( `base.sizing.offset.sm`, v ) }
            min={ 0 }
            max={ 12 }
            step={ 1 }
            allowReset
	          resetFallbackValue=""
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />
          <RangeControl
            label={ `${ __( 'Offset', 'origamiui' ) } (MD)` }
            value={ styles.base.sizing.offset.md ?? undefined }
            onChange={ ( v ) => updateStyles( `base.sizing.offset.md`, v ) }
            min={ 1 }
            max={ 12 }
            step={ 1 }
            allowReset
	          resetFallbackValue=""
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />
          <RangeControl
            label={ `${ __( 'Offset', 'origamiui' ) } (LG)` }
            value={ styles.base.sizing.offset.lg ?? undefined }
            onChange={ ( v ) => updateStyles( `base.sizing.offset.lg`, v ) }
            min={ 1 }
            max={ 12 }
            step={ 1 }
            allowReset
	          resetFallbackValue=""
            __next40pxDefaultSize
            __nextHasNoMarginBottom
          />
        </PanelBody>
        <LayoutFlexSettingsPanel
          stylesRoot={ styles }
          setStyles={ ( s ) => setAttributes({ styles: s }) }
          styles={ styles.base.flex }
          updateStyles={ updateStyles }
          initialOpen={ false }
        />
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
          <Flex wrap style={ { marginTop: '1.5em' } }>
            <FlexItem style={ { width: '45%' } }>
              <SelectControl
                label={ `${ __( 'Position', 'origamiui' ) }` }
                value={ styles.base.position.className.sm }
                options={ [
                  { label: '---', value: '' },
                  { label: 'static', value: 'static' },
                  { label: 'relative', value: 'relative' },
                  { label: 'absolute', value: 'absolute' },
                  { label: 'fixed', value: 'fixed' },
                  { label: 'sticky', value: 'sticky' },
                ] }
                onChange={(v) => updateStyles(`base.position.className.sm`, v)}
                __next40pxDefaultSize
                __nextHasNoMarginBottom
              />
            </FlexItem>
          </Flex>
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