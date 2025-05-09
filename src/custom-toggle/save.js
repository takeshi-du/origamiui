import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { convertStylesToCSS } from '../utils/style-converter';

export default function save({ attributes }) {
  const { toggleName, toggleTarget, styles } = attributes;

  // スタイルを変換
  const { inlineStyles, blockClasses } = convertStylesToCSS(styles);

  const fixedToggleClass = 'oui_toggle';
  const combinedClasses = `${blockClasses || ''} ${fixedToggleClass}`.trim();

  // ブロックのプロパティにインラインスタイルを適用
  const blockProps = useBlockProps.save({
    className: combinedClasses,
    style: inlineStyles,
    'data-toggle': toggleName,
    'data-target': toggleTarget,
  });

  return (
    <>
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    </>
  );
}