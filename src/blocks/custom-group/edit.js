import { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, ButtonBlockAppender } from '@wordpress/block-editor';
import { PanelBody, TextControl} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { convertStylesToCSS } from '../../utils/style-converter';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

// 追加: 共通コンポーネント
import PositionSettingsPanel from '../../components/PositionSettingsPanel';
import DisplaySettingsPanel from '../../components/DisplaySettingsPanel';
import SizeSettingsPanel from '../../components/SizeSettingsPanel';
import SpacingSettingsPanel from '../../components/SpacingSettingsPanel';
import LayoutFlexSettingsPanel from '../../components/LayoutFlexSettingsPanel';

export default function Edit({ attributes, setAttributes, clientId }){
  const { tagName, link, styles } = attributes;

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
        <SizeSettingsPanel
          styles={ styles.base.sizing }
          updateStyles={ updateStyles }
          initialOpen={ false }
        />
        <LayoutFlexSettingsPanel
          styles={ styles.base.flex }
          updateStyles={ updateStyles }
          initialOpen={ false }
        />
        <SpacingSettingsPanel
          styles={ styles.base.spacing }
          updateStyles={ updateStyles }
          initialOpen={ false }
        />
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