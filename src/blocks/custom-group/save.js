import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { convertStylesToCSS } from '../../utils/style-converter';

export default function save({ attributes }) {
  const { tagName, link, styles, compiledCSS } = attributes;

  // スタイルを変換
  const { inlineStyles, blockClasses } = convertStylesToCSS(styles);

  // ブロックのプロパティにインラインスタイルを適用
  const blockProps = useBlockProps.save({
    className: blockClasses,
    style: inlineStyles,
  });

  // ブロックの表示内容
  const TagName = tagName || 'div';

  // aタグの場合はリンク関連属性を付与
  if (TagName === 'a') {
    blockProps.href = link.url || '';

    // target="_blank" 設定に対応
    if (link.target) {
      blockProps.target = '_blank';
      // rel属性にnoopener noreferrerを追加（既存値があれば結合）
      blockProps.rel = link.rel
        ? `${link.rel} noopener noreferrer`
        : 'noopener noreferrer';
    } else if (link.rel) {
      // 通常時はrelだけ
      blockProps.rel = link.rel;
    }
  }

  return (
    <>
      <TagName {...blockProps}>
        <InnerBlocks.Content />
      </TagName>
    </>
  );
}