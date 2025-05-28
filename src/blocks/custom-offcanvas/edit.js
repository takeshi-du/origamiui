import { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, ButtonBlockAppender } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TabPanel, __experimentalUnitControl as UnitControl, __experimentalHeading as Heading, ColorPicker } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { convertStylesToCSS } from '../../utils/style-converter';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

// 追加: 共通コンポーネント
import LayoutFlexSettingsPanel from '../../components/LayoutFlexSettingsPanel';

export default function Edit({ attributes, setAttributes, clientId }){
  const {
    offcanvasType,
    offcanvasPosition,
    offcanvasBreakPoint,
    styles
  } = attributes;
  const breakpoints = ['sm', 'md', 'lg'];

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

  // TabPanel用のタブ定義
  const tabs = breakpoints.map((breakpoint) => ({
    name: breakpoint,
    title: breakpoint.toUpperCase(),
  }));
  
  const { innerBlockCount } = useSelect(select => ({
    innerBlockCount: select('core/block-editor').getBlockCount(clientId),
  }), [clientId]);

  const dynamicOffcanvasClasses = `oui_offcanvas ${offcanvasType} ${offcanvasBreakPoint} ${offcanvasPosition}`;
  const combinedClasses = `${blockClasses || ''} ${dynamicOffcanvasClasses}`.trim();

  // ブロックのプロパティにインラインスタイルを適用
  const blockProps = useBlockProps({
    className: combinedClasses,
    style: inlineStyles,
  });
  
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    renderAppender: innerBlockCount > 0
      ? undefined // デフォルトのInserterを使用
      : () => <ButtonBlockAppender rootClientId={clientId} />
  });

  // ブロックの表示内容
  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Offcanvas Settings', 'origamiui')} initialOpen={true}>
          <SelectControl
            label={__('Offcanvas Type', 'origamiui')}
            value={offcanvasType}
            options={[
              { label: 'slide', value: 'oui_offcanvas_slide' },
              { label: 'fade', value: 'oui_offcanvas_fade' }
            ]}
            onChange={(value) => setAttributes({ offcanvasType: value })}
            __next40pxDefaultSize={ true }
            __nextHasNoMarginBottom={ true }
          />
          <SelectControl
            label={__('Offcanvas Position', 'origamiui')}
            value={offcanvasPosition}
            options={[
              { label: 'left', value: 'oui_offcanvas_left' },
              { label: 'right', value: 'oui_offcanvas_right' }
            ]}
            onChange={(value) => setAttributes({ offcanvasPosition: value })}
            __next40pxDefaultSize={ true }
            __nextHasNoMarginBottom={ true }
          />
          <SelectControl
            label={__('Offcanvas Break Point', 'origamiui')}
            value={offcanvasBreakPoint}
            options={[
              { label: 'mobile', value: 'oui_offcanvas-breakpoint-sm' },
              { label: 'tablet', value: 'oui_offcanvas-breakpoint-md' },
              { label: 'pc', value: 'oui_offcanvas-breakpoint-lg' }
            ]}
            onChange={(value) => setAttributes({ offcanvasBreakPoint: value })}
            __next40pxDefaultSize={ true }
            __nextHasNoMarginBottom={ true }
          />
          <Heading style={{ marginTop: '1.5em', marginBottom: '5px' }}>{__(`Background Color`, 'origamiui')}</Heading>
          <ColorPicker
            label={__(`Offcanvas Background Color`, 'origamiui')}
            color={styles.base.offcanvas.bgColor}
            onChange={ ( value ) => updateStyles(`base.offcanvas.bgColor`, value)}
            enableAlpha
          />
          <TabPanel
            tabs={tabs}
            onSelect={() => {}} // タブ選択時の処理は不要
          >
            {(tab) => (
              <>
                <Heading style={{ marginTop: '1.5em' }}>{__(`Offcanvas Width for ${tab.title}`, 'origamiui')}</Heading>
                <UnitControl
                  label={__(`Offcanvas Width (${tab.title})`, 'origamiui')}
                  value={styles.base.offcanvas.width[tab.name]}
                  onChange={(newWidth) => updateStyles(`base.offcanvas.width.${tab.name}`, newWidth)}
                  units={[
                    { value: '%', label: '%' },
                  ]}
                  __next40pxDefaultSize={ true }
                />
              </>
            )}
          </TabPanel>
        </PanelBody>
        <LayoutFlexSettingsPanel
          styles={ styles.base.flex }
          updateStyles={ updateStyles }
          initialOpen={ false }
        />
      </InspectorControls>
      
      <div {...innerBlocksProps} />
      <div class="oui_offcanvas_bg"></div>
    </>
  );
};