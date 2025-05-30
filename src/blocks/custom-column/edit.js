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
    className: blockClasses,
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
          {/* <ResponsiveTabs>
            { ( tab ) => (
              <Flex style={{flexWrap: 'wrap', marginTop: '1.5em'}}>
                <FlexItem style={{width: '45%'}}>
                  <SelectControl
                    label={__(`Column (${tab.title})`, 'origamiui')}
                    value={styles.base.sizing.column[tab.name]}
                    options={[
                      { label: '---', value: '---' },
                      { label: '1', value: '1' },
                      { label: '2', value: '2' },
                      { label: '3', value: '3' },
                      { label: '4', value: '4' },
                      { label: '5', value: '5' },
                      { label: '6', value: '6' },
                      { label: '7', value: '7' },
                      { label: '8', value: '8' },
                      { label: '9', value: '9' },
                      { label: '10', value: '10' },
                      { label: '11', value: '11' },
                      { label: '12', value: '12' },
                    ]}
                    onChange={(newColumn) => updateStyles(`base.sizing.column.${tab.name}`, newColumn)}
                    __next40pxDefaultSize={ true }
                    __nextHasNoMarginBottom={ true }
                  />
                </FlexItem>
                <FlexItem style={{width: '45%'}}>
                  <SelectControl
                    label={__(`Offset (${tab.title})`, 'origamiui')}
                    value={styles.base.sizing.offset[tab.name]}
                    options={[
                      { label: '---', value: '---' },
                      { label: '1', value: '1' },
                      { label: '2', value: '2' },
                      { label: '3', value: '3' },
                      { label: '4', value: '4' },
                      { label: '5', value: '5' },
                      { label: '6', value: '6' },
                      { label: '7', value: '7' },
                      { label: '8', value: '8' },
                      { label: '9', value: '9' },
                      { label: '10', value: '10' },
                      { label: '11', value: '11' },
                      { label: '12', value: '12' },
                    ]}
                    onChange={(newOffset) => updateStyles(`base.sizing.offset.${tab.name}`, newOffset)}
                    __next40pxDefaultSize={ true }
                    __nextHasNoMarginBottom={ true }
                  />
                </FlexItem>
              </Flex>
            ) }
          </ResponsiveTabs> */}
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