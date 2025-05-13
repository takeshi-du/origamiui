import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { convertStylesToCSS } from '../utils/style-converter';

export default function save({ attributes }) {
  const { toggleName, toggleTarget, styles } = attributes;

  // スタイルを変換
  const { inlineStyles, blockClasses } = convertStylesToCSS(styles);

  const fixedToggleClass = 'oui_toggle';
  const combinedClasses = `${blockClasses || ''} ${fixedToggleClass}`.trim();

  const buildDataAttrs = ({ toggleName, toggleTarget }) => ({
    ...(toggleName   ? { 'data-ui-toggle' : toggleName   } : {}),
    ...(toggleTarget ? { 'data-ui-target': toggleTarget } : {}),
  });

  // ブロックのプロパティにインラインスタイルを適用
  const blockProps = useBlockProps.save({
    className: combinedClasses,
    style: inlineStyles,
    ...buildDataAttrs({ toggleName, toggleTarget }),
  });

  return (
    <>
      <div {...blockProps}>
        <InnerBlocks.Content />
      </div>
    </>
  );
}