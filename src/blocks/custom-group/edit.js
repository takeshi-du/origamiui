import { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, ButtonBlockAppender } from '@wordpress/block-editor';
import { PanelBody, SelectControl, __experimentalUnitControl as UnitControl, __experimentalHeading as Heading, Flex, FlexItem, AlignmentMatrixControl, ToggleControl, TextControl} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { convertStylesToCSS } from '../../utils/style-converter';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

// 追加: 共通コンポーネント
import ResponsiveTabs from '../../components/ResponsiveTabs';
import PositionSettingsPanel from '../../components/PositionSettingsPanel';
import DisplaySettingsPanel from '../../components/DisplaySettingsPanel';

export default function Edit({ attributes, setAttributes, clientId }){
  const { tagName, link, styles } = attributes;
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

  const TagName = tagName || 'div';
  // hrefの値を決定
  let hrefValue = link.url;
  if (!link.url && link.mailTo) {
    hrefValue = `mailto:${link.mailTo}`;
  } else if (!link.url && link.tell) {
    hrefValue = `tel:${link.tell}`;
  }
  // TagNameが'a'の場合にhrefとrelを追加
  if (TagName === 'a') {
    blockProps.href = hrefValue;
    if (link.rel) {
      blockProps.rel = link.rel;
    }
  }

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
          <ResponsiveTabs>
            {(tab) => (
            <>
              <Heading style={{ marginTop: '1.5em' }}>{__(`Width & Height Settings`, 'origamiui')}</Heading>
              <Flex style={{flexWrap: 'wrap'}}>
                <FlexItem style={{width: '45%'}}>
                  <SelectControl
                    label={__(`Width (${tab.name})`, 'origamiui')}
                    value={styles.base.sizing.width[tab.name]}
                    options={[
                      { label: '---', value: '---' },
                      { label: 'auto', value: 'auto' },
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
                  />
                </FlexItem>
                <FlexItem style={{width: '45%'}}>
                  <SelectControl
                    label={__(`Height (${tab.name})`, 'origamiui')}
                    value={styles.base.sizing.height[tab.name]}
                    options={[
                      { label: '---', value: '---' },
                      { label: 'auto', value: 'auto' },
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
          </ResponsiveTabs>
        </PanelBody>
        <PanelBody title={__('Layout&Flex Settings', 'origamiui')} initialOpen={false}>
          <ResponsiveTabs>
            {(tab) => (
              <>
                <Heading style={{ marginTop: '1.5em' }}>{__(`Display Settings`, 'origamiui')}</Heading>
                <SelectControl
                  label={__(`Display (${tab.name})`, 'origamiui')}
                  value={styles.base.flex.display[tab.name]}
                  options={[
                    { label: '---', value: '---' },
                    { label: 'none', value: 'none' },
                    { label: 'inline', value: 'inline' },
                    { label: 'inline-block', value: 'inline-block' },
                    { label: 'block', value: 'block' },
                    { label: 'flex', value: 'flex' },
                    { label: 'inline-flex', value: 'inline-flex' }
                  ]}
                  onChange={(newDisplay) => updateStyles(`base.flex.display.${tab.name}`, newDisplay)}
                  __next40pxDefaultSize={ true }
                  __nextHasNoMarginBottom={ true }
                />
                <Heading style={{ marginTop: '1.5em' }}>{__(`Flex Settings`, 'origamiui')}</Heading>
                <Flex style={{flexWrap: 'wrap'}}>
                  <FlexItem style={{width: '45%'}}>
                    <SelectControl
                      label={__(`Flex Direction (${tab.name})`, 'origamiui')}
                      value={styles.base.flex.direction[tab.name]}
                      options={[
                        { label: '---', value: '---' },
                        { label: 'row', value: 'row' },
                        { label: 'column', value: 'column' }
                      ]}
                      onChange={(newDirection) => updateStyles(`base.flex.direction.${tab.name}`, newDirection)}
                      __next40pxDefaultSize={ true }
                      __nextHasNoMarginBottom={ true }
                    />
                  </FlexItem>
                  <FlexItem style={{width: '45%'}}>
                    <SelectControl
                      label={__(`Flex Wrap (${tab.name})`, 'origamiui')}
                      value={styles.base.flex.wrap[tab.name]}
                      options={[
                        { label: '---', value: '---' },
                        { label: 'no wrap', value: 'nowrap' },
                        { label: 'wrap', value: 'wrap' }
                      ]}
                      onChange={(newWrap) => updateStyles(`base.flex.wrap.${tab.name}`, newWrap)}
                      __next40pxDefaultSize={ true }
                      __nextHasNoMarginBottom={ true }
                    />
                  </FlexItem>
                </Flex>
                <Flex style={{flexWrap: 'wrap'}}>
                  <FlexItem style={{width: '45%'}}>
                    <SelectControl
                      label={__(`Align Items (${tab.name})`, 'origamiui')}
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
                      __next40pxDefaultSize={ true }
                      __nextHasNoMarginBottom={ true }
                    />
                  </FlexItem>
                  <FlexItem style={{width: '45%'}}>
                    <SelectControl
                      label={__(`Justify Content (${tab.name})`, 'origamiui')}
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
                      __next40pxDefaultSize={ true }
                      __nextHasNoMarginBottom={ true }
                    />
                  </FlexItem>
                </Flex>

                <Flex style={{flexWrap: 'wrap'}}>
                  <FlexItem style={{width: '45%'}}>
                    <SelectControl
                      label={__(`Flex Grow (${tab.name})`, 'origamiui')}
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
                      label={__(`Flex Shrink (${tab.name})`, 'origamiui')}
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
                      label={__(`Flex Self (${tab.name})`, 'origamiui')}
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
                      label={__(`Flex Order (${tab.name})`, 'origamiui')}
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
          </ResponsiveTabs>
          <Heading style={{ marginTop: '1.5em' }}>{__(`Gap Settings`, 'origamiui')}</Heading>
          <UnitControl
            label={__('--gapSpace', 'origamiui')}
            value={styles.base.spacing.gapSpace}
            onChange={(newGapSpace) => updateStyles(`base.spacing.gapSpace`, newGapSpace)}
            units={[
              { value: 'px', label: 'px' },{ value: 'em', label: 'em' },{ value: 'rem', label: 'rem' },
            ]}
            __next40pxDefaultSize={ true }
          />
          <ResponsiveTabs>
            {(tab) => (
              <>
                <Heading style={{ marginTop: '1.5em' }}>{__(`Gap Space`, 'origamiui')}</Heading>
                <Flex style={{flexWrap: 'wrap'}}>
                  {gapSides.map((side) => (
                    <FlexItem style={{width: '45%'}}>
                      <SelectControl
                        key={`${side}-${tab.name}`}
                        label={__(`${side} (${tab.name})`, 'origamiui')}
                        value={styles.base.spacing.gap[side][tab.name]}
                        options={[
                          { label: '---', value: '---' },
                          { label: 0, value: '0' },
                          { label: `${parseFloat(styles.base.spacing.gapSpace)}`, value: '1' },
                          { label: `${parseFloat(styles.base.spacing.gapSpace) * 2}`, value: '2' },
                          { label: `${parseFloat(styles.base.spacing.gapSpace) * 3}`, value: '3' },
                          { label: `${parseFloat(styles.base.spacing.gapSpace) * 4}`, value: '4' },
                          { label: `${parseFloat(styles.base.spacing.gapSpace) * 5}`, value: '5' },
                          { label: `${parseFloat(styles.base.spacing.gapSpace) * 6}`, value: '6' },
                          { label: `${parseFloat(styles.base.spacing.gapSpace) * 7}`, value: '7' },
                          { label: `${parseFloat(styles.base.spacing.gapSpace) * 8}`, value: '8' },
                          { label: `${parseFloat(styles.base.spacing.gapSpace) * 9}`, value: '9' },
                          { label: `${parseFloat(styles.base.spacing.gapSpace) * 10}`, value: '10' },
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
          </ResponsiveTabs>
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
          <ResponsiveTabs>
            {(tab) => (
              <>
                <Heading style={{ marginTop: '1.5em' }}>{__(`Margin Settings`, 'origamiui')}</Heading>
                <Flex style={{flexWrap: 'wrap'}}>
                  {marginSides.map((side) => (
                    <FlexItem style={{width: '45%'}}>
                      <SelectControl
                        key={`${side}-${tab.name}`}
                        label={__(`${side} (${tab.name})`, 'origamiui')}
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
                        label={__(`${side} (${tab.name})`, 'origamiui')}
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
              </>
            )}
          </ResponsiveTabs>
        </PanelBody>
        <PositionSettingsPanel
          styles={ styles.base.position }
          updateStyles={ updateStyles }
          initialOpen={ false }
        />
        <PanelBody title={__('Link Setting', 'origamiui')} initialOpen={false}>
          <TextControl
            label={__('URL', 'origamiui')}
            value={attributes.link.url}
            onChange={(value) => setAttributes({
              link: { ...attributes.link, url: value }
            })}
            __next40pxDefaultSize={ true }
            __nextHasNoMarginBottom={ true }
          />
          <TextControl
            label={__('Rel', 'origamiui')}
            value={attributes.link.rel}
            onChange={(value) => setAttributes({
              link: { ...attributes.link, rel: value }
            })}
            __next40pxDefaultSize={ true }
            __nextHasNoMarginBottom={ true }
          />
          <TextControl
            label={__('mailTo', 'origamiui')}
            value={attributes.link.mailTo}
            onChange={(value) => setAttributes({
              link: { ...attributes.link, mailTo: value }
            })}
            __next40pxDefaultSize={ true }
            __nextHasNoMarginBottom={ true }
          />
          <TextControl
            label={__('tell', 'origamiui')}
            value={attributes.link.tell}
            onChange={(value) => setAttributes({
              link: { ...attributes.link, tell: value }
            })}
            __next40pxDefaultSize={ true }
            __nextHasNoMarginBottom={ true }
          />
        </PanelBody>
        <DisplaySettingsPanel
          styles={ styles.base.display }
          updateStyles={ updateStyles }      // ← そのまま渡す
          tagName={ tagName }
          onTagChange={ (v)=>setAttributes({ tagName: v }) }
        />
      </InspectorControls>

      <TagName {...innerBlocksProps} />
    </>
  );
};