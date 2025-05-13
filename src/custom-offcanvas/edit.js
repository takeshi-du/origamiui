import { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, ButtonBlockAppender } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TabPanel, __experimentalUnitControl as UnitControl, __experimentalHeading as Heading, Flex, FlexItem, ColorPicker } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { convertStylesToCSS } from '../utils/style-converter';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

export default function Edit({ attributes, setAttributes, clientId }){
  const {
    offcanvasType,
    offcanvasPosition,
    offcanvasBreakPoint,
    offcanvasBgColor,
    styles
  } = attributes;
  const breakpoints = ['sm', 'md', 'lg'];
  const marginSides = ['top', 'bottom', 'left', 'right']; // marginの方向
  const gapSides = ['row', 'column']; // gapの方向

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
        <PanelBody title={__('Offcanvas Settings', 'origamiui')}>
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
        <PanelBody title={__('Flex&Grid Settings', 'origamiui')} initialOpen={false}>
          <TabPanel
            tabs={tabs}
            onSelect={() => {}} // タブ選択時の処理は不要
          >
            {(tab) => (
              <>
                <Heading style={{ marginTop: '1.5em' }}>{__(`Flex Display Settings for ${tab.title}`, 'origamiui')}</Heading>
                <SelectControl
                  label={__(`Flex Display (${tab.title})`, 'origamiui')}
                  value={styles.base.flex.display[tab.name]}
                  options={[
                    { label: '---', value: '---' },
                    { label: 'flex', value: 'flex' },
                    { label: 'inline-flex', value: 'inline-flex' }
                  ]}
                  onChange={(newDisplay) => updateStyles(`base.flex.display.${tab.name}`, newDisplay)}
                />
                <Flex style={{flexWrap: 'wrap'}}>
                  <FlexItem style={{width: '45%'}}>
                    <SelectControl
                      label={__(`Flex Direction (${tab.title})`, 'origamiui')}
                      value={styles.base.flex.direction[tab.name]}
                      options={[
                        { label: '---', value: '---' },
                        { label: 'row', value: 'row' },
                        { label: 'column', value: 'column' }
                      ]}
                      onChange={(newDirection) => updateStyles(`base.flex.direction.${tab.name}`, newDirection)}
                    />
                  </FlexItem>
                  <FlexItem style={{width: '45%'}}>
                    <SelectControl
                      label={__(`Flex Wrap (${tab.title})`, 'origamiui')}
                      value={styles.base.flex.wrap[tab.name]}
                      options={[
                        { label: '---', value: '---' },
                        { label: 'no wrap', value: 'nowrap' },
                        { label: 'wrap', value: 'wrap' }
                      ]}
                      onChange={(newWrap) => updateStyles(`base.flex.wrap.${tab.name}`, newWrap)}
                    />
                  </FlexItem>
                </Flex>
                <Flex style={{flexWrap: 'wrap'}}>
                  <FlexItem style={{width: '45%'}}>
                    <SelectControl
                      label={__(`Align Items (${tab.title})`, 'origamiui')}
                      value={styles.base.flex.align[tab.name]}
                      options={[
                        { label: '---', value: '---' },
                        { label: 'start', value: 'start' },
                        { label: 'end', value: 'end' },
                        { label: 'center', value: 'center' },
                        { label: 'baseline', value: 'baseline' },
                        { label: 'stretch', value: 'stretch' }
                      ]}
                      onChange={(newAlign) => updateStyles(`base.flex.align.${tab.name}`, newAlign)}
                    />
                  </FlexItem>
                  <FlexItem style={{width: '45%'}}>
                    <SelectControl
                      label={__(`Justify Content (${tab.title})`, 'origamiui')}
                      value={styles.base.flex.justify[tab.name]}
                      options={[
                        { label: '---', value: '---' },
                        { label: 'start', value: 'start' },
                        { label: 'end', value: 'end' },
                        { label: 'center', value: 'center' },
                        { label: 'between', value: 'between' },
                        { label: 'around', value: 'around' },
                        { label: 'evenry', value: 'evenry' }
                      ]}
                      onChange={(newJustify) => updateStyles(`base.flex.justify.${tab.name}`, newJustify)}
                    />
                  </FlexItem>
                </Flex>
                <Flex style={{flexWrap: 'wrap'}}>
                  <FlexItem style={{width: '45%'}}>
                    <SelectControl
                      label={__(`Flex Grow (${tab.title})`, 'origamiui')}
                      value={styles.base.flex.grow[tab.name]}
                      options={[
                        { label: '---', value: '---' },
                        { label: 'grow', value: 'grow-1' },
                        { label: 'no grow', value: 'grow-0' }
                      ]}
                      onChange={(newGrow) => updateStyles(`base.flex.grow.${tab.name}`, newGrow)}
                    />
                  </FlexItem>
                  <FlexItem style={{width: '45%'}}>
                    <SelectControl
                      label={__(`Flex Shrink (${tab.title})`, 'origamiui')}
                      value={styles.base.flex.shrink[tab.name]}
                      options={[
                        { label: '---', value: '---' },
                        { label: 'shrink', value: 'shrink-1' },
                        { label: 'no shrink', value: 'shrink-0' }
                      ]}
                      onChange={(newShrink) => updateStyles(`base.flex.shrink.${tab.name}`, newShrink)}
                    />
                  </FlexItem>
                </Flex>
                <Flex style={{flexWrap: 'wrap'}}>
                  <FlexItem style={{width: '45%'}}>
                    <SelectControl
                      label={__(`Flex Self (${tab.title})`, 'origamiui')}
                      value={styles.base.flex.self[tab.name]}
                      options={[
                        { label: '---', value: '---' },
                        { label: 'start', value: 'start' },
                        { label: 'end', value: 'end' },
                        { label: 'center', value: 'center' },
                        { label: 'baseline', value: 'baseline' },
                        { label: 'stretch', value: 'stretch' }
                      ]}
                      onChange={(newSelf) => updateStyles(`base.flex.self.${tab.name}`, newSelf)}
                    />
                  </FlexItem>
                  <FlexItem style={{width: '45%'}}>
                    <SelectControl
                      label={__(`Flex Order (${tab.title})`, 'origamiui')}
                      value={styles.base.flex.order[tab.name]}
                      options={[
                        { label: '---', value: '---' },
                        { label: '0', value: '0' },
                        { label: '1', value: '1' },
                        { label: '2', value: '2' },
                        { label: '3', value: '3' },
                        { label: '4', value: '4' },
                        { label: '5', value: '5' }
                      ]}
                      onChange={(newOrder) => updateStyles(`base.flex.order.${tab.name}`, newOrder)}
                    />
                  </FlexItem>
                </Flex>
              </>
            )}
          </TabPanel>
        </PanelBody>
      </InspectorControls>
      
      <div {...innerBlocksProps} />
      <div class="oui_offcanvas_bg"></div>
    </>
  );
};