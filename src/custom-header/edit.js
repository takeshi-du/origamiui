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
    className: `oui_header ${blockClasses}`,
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
        <PanelBody title="Header Settings">
          <SelectControl
            label={__('Header', 'origamiui')}
            value={styles.base.display.header}
            options={[
              { label: '---', value: '---' },
              { label: 'absolute', value: 'absolute' },
              { label: 'fixed', value: 'fixed' },
              { label: 'sticky', value: 'sticky' },
            ]}
            onChange={(newPlacement) => updateStyles(`base.display.header`, newPlacement)}
          />
        </PanelBody>
        <PanelBody title={__('Sizing Settings', 'origamiui')} initialOpen={false}>
          <UnitControl
            label={__('--size')}
            value={styles.base.sizing.size}
            onChange={(newSize) => updateStyles(`base.sizing.size`, newSize)}
            units={[
              { value: '%', label: '%' },{ value: 'px', label: 'px' },
            ]}
          />
          <TabPanel
            tabs={tabs}
            onSelect={() => {}} // タブ選択時の処理は不要
          >
            {(tab) => (
              <>
                <Heading style={{ marginTop: '1.5em' }}>{__(`Height Settings for ${tab.title}`, 'origamiui')}</Heading>
                <Flex style={{flexWrap: 'wrap'}}>
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
                    />
                  </FlexItem>
                </Flex>
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
          />
          <TabPanel
            tabs={tabs}
            onSelect={() => {}} // タブ選択時の処理は不要
          >
            {(tab) => (
              <>
                <Heading style={{ marginTop: '1.5em' }}>{__(`Margin Settings for ${tab.title}`, 'origamiui')}</Heading>
                <Flex style={{flexWrap: 'wrap'}}>
                  {marginSides.map((side) => (
                    <FlexItem style={{width: '45%'}}>
                      <SelectControl
                        key={`${side}-${tab.name}`}
                        label={`${side} (${tab.title})`}
                        value={styles.base.spacing.margin[side][tab.name]}
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
                        onChange={(newMargin) =>
                          updateStyles(`base.spacing.margin.${side}.${tab.name}`, newMargin)
                        }
                      />
                    </FlexItem>
                  ))}
                </Flex>
                <Heading style={{ marginTop: '1.5em' }}>{__(`Padding Settings for ${tab.title}`, 'origamiui')}</Heading>
                <Flex style={{flexWrap: 'wrap'}}>
                  {marginSides.map((side) => (
                    <FlexItem style={{width: '45%'}}>
                      <SelectControl
                        key={`${side}-${tab.name}`}
                        label={`${side} (${tab.title})`}
                        value={styles.base.spacing.padding[side][tab.name]}
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
                        onChange={(newPadding) =>
                          updateStyles(`base.spacing.padding.${side}.${tab.name}`, newPadding)
                        }
                      />
                    </FlexItem>
                  ))}
                </Flex>
                <Heading style={{ marginTop: '1.5em' }}>{__(`Gap Settings for ${tab.title}`, 'origamiui')}</Heading>
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
                      />
                    </FlexItem>
                  ))}
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
          />
          <TabPanel
            tabs={tabs}
            onSelect={() => {}} // タブ選択時の処理は不要
          >
            {(tab) => (
              <>
                <Heading style={{ marginTop: '1.5em', marginBottom: '5px' }}>{__(`Display (${tab.title})`, 'origamiui')}</Heading>
                <SelectControl
                  value={styles.base.display.visible[tab.name]}
                  options={[
                    { label: '---', value: '---' },
                    { label: 'none', value: 'none' },
                    { label: 'inline', value: 'inline' },
                    { label: 'inline-block', value: 'inline-block' },
                    { label: 'block', value: 'block' },
                  ]}
                  onChange={(newDisplay) => updateStyles(`base.display.visible.${tab.name}`, newDisplay)}
                />
              </>
            )}
          </TabPanel>
        </PanelBody>
      </InspectorControls>
      
      <header {...innerBlocksProps} />
    </>
  );
};