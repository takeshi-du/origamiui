import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { convertStylesToCSS } from '../../utils/style-converter';

export default function save({ attributes }) {
  const { tagName, styles, compiledCSS } = attributes;

  // スタイルを変換
  const { inlineStyles, blockClasses } = convertStylesToCSS(styles);

  // ブロックのプロパティにインラインスタイルを適用
  const blockProps = useBlockProps.save({
    className: [ 'oui_grid', blockClasses ].filter( Boolean ).join( ' ' ),
    style: inlineStyles,
  });

  // ブロックの表示内容
  const TagName = tagName || 'div';

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