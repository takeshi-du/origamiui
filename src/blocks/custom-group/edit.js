import { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, ButtonBlockAppender } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
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
import CodeMirrorField from '../../components/CodeMirrorField';
import useCustomCSS from '../../hooks/useCustomCSS';
import useHeadStyle  from '../../hooks/useHeadStyle';

export default function Edit({ attributes, setAttributes, clientId }){
  const { tagName, link, styles } = attributes;

  /* Custom CSS 取得 */
  const {
    blockClass, rawCSS, compiledCSS, onChange
  } = useCustomCSS(
    { ...attributes, clientId }, setAttributes,
    { prefix: 'oui_cm-group', tpl: 'selector {...}' }
  );

  /* インライン & クラス変換 */
  const { inlineStyles, blockClasses } = useMemo(() => {
    return convertStylesToCSS(styles);
  }, [styles]);

  /* head へスタイルを注入 */
  const nodeRef = useHeadStyle( compiledCSS, clientId );

  // スタイルの更新
  const updateStyles = (path, value) => {
    const newStyles = cloneDeep(styles);
    set(newStyles, path, value);
    setAttributes({ styles: newStyles });
  };
  
  // ブロックのプロパティにインラインスタイルを適用
  const blockProps = useBlockProps({
    ref: nodeRef, 
    className: blockClasses,
    style: inlineStyles,
  });

  const TagName = tagName || 'div';

  if (TagName === 'a') {
    blockProps.href = undefined;
    blockProps.rel  = undefined;
    // クリック操作を止める
    blockProps.onClick = (e) => e.preventDefault();
  }

  /* インナーブロック設定 */
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
        <LayoutFlexSettingsPanel
          stylesRoot={ styles }
          setStyles={ ( s ) => setAttributes({ styles: s }) }
          styles={ styles.base.flex }
          updateStyles={ updateStyles }
          initialOpen={ true }
        />
        <SpacingSettingsPanel
          stylesRoot={ styles }
          setStyles={ ( s ) => setAttributes({ styles: s }) }
          styles={ styles.base.spacing }
          updateStyles={ updateStyles }
          initialOpen={ false }
        />
        <SizeSettingsPanel
          stylesRoot={ styles }
          setStyles={ ( s ) => setAttributes({ styles: s }) }
          styles={ styles.base.sizing }
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
          updateStyles={ updateStyles }
          tagName={ tagName }
          onTagChange={ (v)=>setAttributes({ tagName: v }) }
        />
        <PanelBody title={__('Custom CSS', 'origamiui')} initialOpen={false}>
          <CodeMirrorField value={ rawCSS } onChange={ onChange } />
          <p
            style={{
              fontSize: 12,
              opacity: 0.7,
              whiteSpace: 'pre-wrap',
            }}
          >
            {__(
              `「selector」を使うとこのブロックだけに適用されます。\n\n例)\nselector {\n  color: red;\n}\nselector:hover {\n  color: blue;\n}`,
              'origamiui'
            )}
          </p>
        </PanelBody>
      </InspectorControls>

      <TagName {...innerBlocksProps} />
      {/* { compiledCSS && <style>{ compiledCSS }</style> } */}
    </>
  );
};