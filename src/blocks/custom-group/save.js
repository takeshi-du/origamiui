import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { convertStylesToCSS } from '../../utils/style-converter';

export default function save({ attributes }) {
  const { tagName, link, styles, compiledCSS } = attributes;

  // スタイルを変換
  const { inlineStyles, blockClasses } = convertStylesToCSS(styles);

  // const combinedClasses = `${blockClasses || ''} ${className}`.trim();
  // const suffix = clientId.split('-').pop(); 
  // const editorClass = `oui_cm-${ suffix }`; 
  // const combinedClasses = [ blockClasses, className ].filter( Boolean ).join( ' ' );
  // ブロックのプロパティにインラインスタイルを適用
  const blockProps = useBlockProps.save({
    className: blockClasses,
    style: inlineStyles,
  });

  // ブロックの表示内容
  const TagName = tagName || 'div';

  // TagNameが'a'の場合にhrefとrelを追加
  if (TagName === 'a') {
    blockProps.href = link.url;
    if (link.rel) {
      blockProps.rel = link.rel;
    }
  }

  return (
    <>
      <TagName {...blockProps}>
        <InnerBlocks.Content />
      </TagName>
      { compiledCSS && (
				<style dangerouslySetInnerHTML={ { __html: compiledCSS } } />
			) }
    </>
  );
}