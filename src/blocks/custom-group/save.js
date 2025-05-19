import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { convertStylesToCSS } from '../../utils/style-converter';

export default function save({ attributes }) {
  const { tagName, link, styles } = attributes;

  // スタイルを変換
  const { inlineStyles, blockClasses } = convertStylesToCSS(styles);

  // ブロックのプロパティにインラインスタイルを適用
  const blockProps = useBlockProps.save({
    className: blockClasses,
    style: inlineStyles,
  });

  // ブロックの表示内容
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


  return (
    <>
      <TagName {...blockProps}>
        <InnerBlocks.Content />
      </TagName>
    </>
  );
}