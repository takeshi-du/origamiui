import { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, ButtonBlockAppender } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TabPanel, __experimentalUnitControl as UnitControl, __experimentalHeading as Heading, Flex, FlexItem } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { convertStylesToCSS } from '../utils/style-converter';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

export default function Edit({ attributes, setAttributes, clientId }){
  const { tagName, styles } = attributes;
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

  // ブロックのプロパティにインラインスタイルを適用
  const blockProps = useBlockProps({
    className: blockClasses,
    style: inlineStyles,
  });

  // TabPanel用のタブ定義
  const tabs = breakpoints.map((breakpoint) => ({
    name: breakpoint,
    title: breakpoint.toUpperCase(),
  }));

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
          <SelectControl
            label={__('Grid', 'origamiui')}
            value={styles.base.display.grid}
            options={[
              { label: '---', value: '---' },
              { label: 'grid', value: 'grid' },
            ]}
            onChange={(newGrid) => updateStyles(`base.display.grid`, newGrid)}
            __next40pxDefaultSize={ true }
            __nextHasNoMarginBottom={ true }
          />
        </PanelBody>
        <PanelBody title={__('Sizing Settings', 'origamiui')} initialOpen={false}>
          <UnitControl
            label={__('--size', 'origamiui')}
            value={styles.base.sizing.size}
            onChange={(newSize) => updateStyles(`base.sizing.size`, newSize)}
            units={[
              { value: '%', label: '%' },{ value: 'px', label: 'px' },
            ]}
            __next40pxDefaultSize={ true }
          />
          <TabPanel
            tabs={tabs}
            onSelect={() => {}} // タブ選択時の処理は不要
          >
            {(tab) => (
              <>
                <Heading style={{ marginTop: '1.5em' }}>{__(`Width & Height Settings`, 'origamiui')}</Heading>
                <Flex style={{flexWrap: 'wrap'}}>
                  <FlexItem style={{width: '45%'}}>
                    <SelectControl
                      label={__(`Width (${tab.title})`, 'origamiui')}
                      value={styles.base.sizing.width[tab.name]}
                      options={[
                        { label: '---', value: '---' },
                        { label: `${parseFloat(styles.base.sizing.size)}`, value: '1' },
                        { label: `${parseFloat(styles.base.sizing.size) * 2}`, value: '2' },
                        { label: `${parseFloat(styles.base.sizing.size) * 3}`, value: '3' },
                        { label: `${parseFloat(styles.base.sizing.size) * 4}`, value: '4' },
                        { label: `${parseFloat(styles.base.sizing.size) * 5}`, value: '5' },
                        { label: `${parseFloat(styles.base.sizing.size) * 6}`, value: '6' },
                        { label: `${parseFloat(styles.base.sizing.size) * 7}`, value: '7' },
                        { label: `${parseFloat(styles.base.sizing.size) * 8}`, value: '8' },
                        { label: `${parseFloat(styles.base.sizing.size) * 9}`, value: '9' },
                        { label: `${parseFloat(styles.base.sizing.size) * 10}`, value: '10' },
                      ]}
                      onChange={(newWidth) => updateStyles(`base.sizing.width.${tab.name}`, newWidth)}
                      __next40pxDefaultSize={ true }
                      __nextHasNoMarginBottom={ true }
                    />
                  </FlexItem>
                  <FlexItem style={{width: '45%'}}>
                    <SelectControl
                      label={__(`Height (${tab.title})`, 'origamiui')}
                      value={styles.base.sizing.height[tab.name]}
                      options={[
                        { label: '---', value: '---' },
                        { label: `${parseFloat(styles.base.sizing.size)}`, value: '1' },
                        { label: `${parseFloat(styles.base.sizing.size) * 2}`, value: '2' },
                        { label: `${parseFloat(styles.base.sizing.size) * 3}`, value: '3' },
                        { label: `${parseFloat(styles.base.sizing.size) * 4}`, value: '4' },
                        { label: `${parseFloat(styles.base.sizing.size) * 5}`, value: '5' },
                        { label: `${parseFloat(styles.base.sizing.size) * 6}`, value: '6' },
                        { label: `${parseFloat(styles.base.sizing.size) * 7}`, value: '7' },
                        { label: `${parseFloat(styles.base.sizing.size) * 8}`, value: '8' },
                        { label: `${parseFloat(styles.base.sizing.size) * 9}`, value: '9' },
                        { label: `${parseFloat(styles.base.sizing.size) * 10}`, value: '10' },
                      ]}
                      onChange={(newHeight) => updateStyles(`base.sizing.height.${tab.name}`, newHeight)}
                      __next40pxDefaultSize={ true }
                      __nextHasNoMarginBottom={ true }
                    />
                  </FlexItem>
                </Flex>
              </>
            )}
          </TabPanel>
        </PanelBody>
        <PanelBody title={__('Flex Settings', 'origamiui')} initialOpen={false}>
          <TabPanel
            tabs={tabs}
            onSelect={() => {}} // タブ選択時の処理は不要
          >
            {(tab) => (
              <>
                <Heading style={{ marginTop: '1.5em' }}>{__(`Flex Display Settings`, 'origamiui')}</Heading>
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
                      __next40pxDefaultSize={ true }
                      __nextHasNoMarginBottom={ true }
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
                      __next40pxDefaultSize={ true }
                      __nextHasNoMarginBottom={ true }
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
                      __next40pxDefaultSize={ true }
                      __nextHasNoMarginBottom={ true }
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
                      __next40pxDefaultSize={ true }
                      __nextHasNoMarginBottom={ true }
                    />
                  </FlexItem>
                </Flex>
              </>
            )}
          </TabPanel>
        </PanelBody>
        <PanelBody title={__('Spacing Settings', 'origamiui')} initialOpen={false}>
          <UnitControl
            label={__('--space', 'origamiui')}
            value={styles.base.spacing.space}
            onChange={(newSpace) => updateStyles(`base.spacing.space`, newSpace)}
            units={[
              { value: 'px', label: 'px' },{ value: 'em', label: 'em' },{ value: 'rem', label: 'rem' },
            ]}
            __next40pxDefaultSize={ true }
          />
          <TabPanel
            tabs={tabs}
            onSelect={() => {}} // タブ選択時の処理は不要
          >
            {(tab) => (
              <>
                <Heading style={{ marginTop: '1.5em' }}>{__(`Margin Settings`, 'origamiui')}</Heading>
                <Flex style={{flexWrap: 'wrap'}}>
                  {marginSides.map((side) => (
                    <FlexItem style={{width: '45%'}}>
                      <SelectControl
                        key={`${side}-${tab.name}`}
                        label={`${side} (${tab.title})`}
                        value={styles.base.spacing.margin[side][tab.name]}
                        options={[
                          { label: '---', value: '---' },
                          { label: `${parseFloat(styles.base.spacing.space) * -1}`, value: 'n1' },
                          { label: `${parseFloat(styles.base.spacing.space) * -2}`, value: 'n2' },
                          { label: `${parseFloat(styles.base.spacing.space) * -3}`, value: 'n3' },
                          { label: `${parseFloat(styles.base.spacing.space) * -4}`, value: 'n4' },
                          { label: `${parseFloat(styles.base.spacing.space) * -5}`, value: 'n5' },
                          { label: `${parseFloat(styles.base.spacing.space) * -6}`, value: 'n6' },
                          { label: `${parseFloat(styles.base.spacing.space) * -7}`, value: 'n7' },
                          { label: `${parseFloat(styles.base.spacing.space) * -8}`, value: 'n8' },
                          { label: `${parseFloat(styles.base.spacing.space) * -9}`, value: 'n9' },
                          { label: `${parseFloat(styles.base.spacing.space) * -10}`, value: 'n10' },
                          { label: 0, value: '0' },
                          { label: `${parseFloat(styles.base.spacing.space)}`, value: '1' },
                          { label: `${parseFloat(styles.base.spacing.space) * 2}`, value: '2' },
                          { label: `${parseFloat(styles.base.spacing.space) * 3}`, value: '3' },
                          { label: `${parseFloat(styles.base.spacing.space) * 4}`, value: '4' },
                          { label: `${parseFloat(styles.base.spacing.space) * 5}`, value: '5' },
                          { label: `${parseFloat(styles.base.spacing.space) * 6}`, value: '6' },
                          { label: `${parseFloat(styles.base.spacing.space) * 7}`, value: '7' },
                          { label: `${parseFloat(styles.base.spacing.space) * 8}`, value: '8' },
                          { label: `${parseFloat(styles.base.spacing.space) * 9}`, value: '9' },
                          { label: `${parseFloat(styles.base.spacing.space) * 10}`, value: '10' },
                        ]}
                        onChange={(newMargin) =>
                          updateStyles(`base.spacing.margin.${side}.${tab.name}`, newMargin)
                        }
                        __next40pxDefaultSize={ true }
                        __nextHasNoMarginBottom={ true }
                      />
                    </FlexItem>
                  ))}
                </Flex>
                <Heading style={{ marginTop: '1.5em' }}>{__(`Padding Settings`, 'origamiui')}</Heading>
                <Flex style={{flexWrap: 'wrap'}}>
                  {marginSides.map((side) => (
                    <FlexItem style={{width: '45%'}}>
                      <SelectControl
                        key={`${side}-${tab.name}`}
                        label={`${side} (${tab.title})`}
                        value={styles.base.spacing.padding[side][tab.name]}
                        options={[
                          { label: '---', value: '---' },
                          { label: 0, value: '0' },
                          { label: `${parseFloat(styles.base.spacing.space)}`, value: '1' },
                          { label: `${parseFloat(styles.base.spacing.space) * 2}`, value: '2' },
                          { label: `${parseFloat(styles.base.spacing.space) * 3}`, value: '3' },
                          { label: `${parseFloat(styles.base.spacing.space) * 4}`, value: '4' },
                          { label: `${parseFloat(styles.base.spacing.space) * 5}`, value: '5' },
                          { label: `${parseFloat(styles.base.spacing.space) * 6}`, value: '6' },
                          { label: `${parseFloat(styles.base.spacing.space) * 7}`, value: '7' },
                          { label: `${parseFloat(styles.base.spacing.space) * 8}`, value: '8' },
                          { label: `${parseFloat(styles.base.spacing.space) * 9}`, value: '9' },
                          { label: `${parseFloat(styles.base.spacing.space) * 10}`, value: '10' },
                        ]}
                        onChange={(newPadding) =>
                          updateStyles(`base.spacing.padding.${side}.${tab.name}`, newPadding)
                        }
                        __next40pxDefaultSize={ true }
                        __nextHasNoMarginBottom={ true }
                      />
                    </FlexItem>
                  ))}
                </Flex>
                <Heading style={{ marginTop: '1.5em' }}>{__(`Gap Settings`, 'origamiui')}</Heading>
                <Flex style={{flexWrap: 'wrap'}}>
                  {gapSides.map((side) => (
                    <FlexItem style={{width: '45%'}}>
                      <SelectControl
                        key={`${side}-${tab.name}`}
                        label={`${side} (${tab.title})`}
                        value={styles.base.spacing.gap[side][tab.name]}
                        options={[
                          { label: '---', value: '---' },
                          { label: `${parseFloat(styles.base.spacing.space)}`, value: '1' },
                          { label: `${parseFloat(styles.base.spacing.space) * 2}`, value: '2' },
                          { label: `${parseFloat(styles.base.spacing.space) * 3}`, value: '3' },
                          { label: `${parseFloat(styles.base.spacing.space) * 4}`, value: '4' },
                          { label: `${parseFloat(styles.base.spacing.space) * 5}`, value: '5' },
                          { label: `${parseFloat(styles.base.spacing.space) * 6}`, value: '6' },
                          { label: `${parseFloat(styles.base.spacing.space) * 7}`, value: '7' },
                          { label: `${parseFloat(styles.base.spacing.space) * 8}`, value: '8' },
                          { label: `${parseFloat(styles.base.spacing.space) * 9}`, value: '9' },
                          { label: `${parseFloat(styles.base.spacing.space) * 10}`, value: '10' },
                        ]}
                        onChange={(newGap) =>
                          updateStyles(`base.spacing.gap.${side}.${tab.name}`, newGap)
                        }
                        __next40pxDefaultSize={ true }
                        __nextHasNoMarginBottom={ true }
                      />
                    </FlexItem>
                  ))}
                </Flex>
              </>
            )}
          </TabPanel>
        </PanelBody>
        <PanelBody title={__('Position Settings', 'origamiui')} initialOpen={false}>
          <TabPanel
            tabs={tabs}
            onSelect={() => {}} // タブ選択時の処理は不要
          >
            {(tab) => (
              <>
                <Flex style={{flexWrap: 'wrap', marginTop: '1.5em'}}>
                  <FlexItem style={{width: '45%'}}>
                    <SelectControl
                      label={__(`Position (${tab.title})`, 'origamiui')}
                      value={styles.base.position.className[tab.name]}
                      options={[
                        { label: '---', value: '---' },
                        { label: 'static', value: 'static' },
                        { label: 'relative', value: 'relative' },
                      ]}
                      onChange={(newClass) => updateStyles(`base.position.className.${tab.name}`, newClass)}
                      __next40pxDefaultSize={ true }
                      __nextHasNoMarginBottom={ true }
                    />
                  </FlexItem>
                </Flex>
              </>
            )}
          </TabPanel>
        </PanelBody>
        <PanelBody title={__('Display Settings', 'origamiui')} initialOpen={false}>
          <SelectControl
            label={__('Overflow', 'origamiui')}
            value={styles.base.display.overflow}
            options={[
              { label: '---', value: '---' },
              { label: 'auto', value: 'auto' },
              { label: 'hidden', value: 'hidden' },
              { label: 'visible', value: 'visible' },
              { label: 'scroll', value: 'scroll' },
            ]}
            onChange={(newOverflow) => updateStyles(`base.display.overflow`, newOverflow)}
            __next40pxDefaultSize={ true }
            __nextHasNoMarginBottom={ true }
          />
          <SelectControl
            label={__('Opacity', 'origamiui')}
            value={styles.base.display.opacity}
            options={[
              { label: '---', value: '---' },
              { label: '100%', value: '100' },
              { label: '75%', value: '75' },
              { label: '50%', value: '50' },
              { label: '25%', value: '25' },
              { label: '0', value: '0' },
            ]}
            onChange={(newOpacity) => updateStyles(`base.display.opacity`, newOpacity)}
            __next40pxDefaultSize={ true }
            __nextHasNoMarginBottom={ true }
          />
          <SelectControl
            label={__('z-index', 'origamiui')}
            value={styles.base.display.zIndex}
            options={[
              { label: '---', value: '---' },
              { label: '3', value: '3' },
              { label: '2', value: '2' },
              { label: '1', value: '1' },
              { label: '0', value: '0' },
              { label: '-1', value: 'n1' },
            ]}
            onChange={(newZIndex) => updateStyles(`base.display.zIndex`, newZIndex)}
            __next40pxDefaultSize={ true }
            __nextHasNoMarginBottom={ true }
          />
          <SelectControl
            label={__('HTML Tag', 'origamiui')}
            value={tagName}
            options={[
              { label: 'div', value: 'div' },
              { label: 'main', value: 'main' },
              { label: 'header', value: 'header' },
              { label: 'footer', value: 'footer' },
              { label: 'article', value: 'article' }
            ]}
            onChange={(value) => setAttributes({ tagName: value })}
            __next40pxDefaultSize={ true }
            __nextHasNoMarginBottom={ true }
          />
        </PanelBody>
      </InspectorControls>
      
      <TagName {...innerBlocksProps} />
    </>
  );
};