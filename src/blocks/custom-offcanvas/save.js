import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { convertStylesToCSS } from '../../utils/style-converter';

export default function save({ attributes }) {
  const { offcanvasType, offcanvasBreakPoint, offcanvasPosition, styles } = attributes;

  // スタイルを変換
  const { inlineStyles, blockClasses } = convertStylesToCSS(styles);

  const dynamicOffcanvasClasses = `oui_offcanvas ${offcanvasType} ${offcanvasBreakPoint} ${offcanvasPosition}`;
  const combinedClasses = `${blockClasses || ''} ${dynamicOffcanvasClasses}`.trim();

  // ブロックのプロパティにインラインスタイルを適用
  const blockProps = useBlockProps.save({
    className: combinedClasses,
    style: inlineStyles,
  });

  return (
    <>
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
      <div class="oui_offcanvas_bg"></div>
    </>
  );
}