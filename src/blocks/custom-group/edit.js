import { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, ButtonBlockAppender } from '@wordpress/block-editor';
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
import LinkSettingsPanel from '../../components/LinkSettingsPanel';

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
  const hrefValue = link.url;
  // let hrefValue = link.url;
  // if (!link.url && link.mailTo) {
  //   hrefValue = `mailto:${link.mailTo}`;
  // } else if (!link.url && link.tell) {
  //   hrefValue = `tel:${link.tell}`;
  // }
  // TagNameが'a'の場合にhrefとrelを追加
  // if (TagName === 'a') {
  //   blockProps.href = hrefValue;
  //   if (link.rel) {
  //     blockProps.rel = link.rel;
  //   }
  // }
  /**
  * 編集画面では <a> タグに href を付けない
  * - クリックしても遷移しない
  * - 外部サイトが iframe で読み込まれる事故を防ぐ
  * 保存時は save.js 側で正しい href が出力される
  */
  if (TagName === 'a') {
    blockProps.href = undefined;
    blockProps.rel  = undefined;
    /**
     * クリック操作を止める
    */
    blockProps.onClick = (e) => e.preventDefault();
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
        <LinkSettingsPanel
          link={ link }
          setLink={ ( newLink ) => setAttributes( { link: newLink } ) }
          tagName={ tagName }
          setTagName={ ( v ) => setAttributes( { tagName: v } ) }
          initialOpen={ false }
        />
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