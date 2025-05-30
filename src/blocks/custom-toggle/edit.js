import { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls, ButtonBlockAppender } from '@wordpress/block-editor';
import { PanelBody, SelectControl, __experimentalHeading as Heading, TextControl} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { convertStylesToCSS } from '../../utils/style-converter';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';

// 追加: 共通コンポーネント
import ResponsiveTabs from '../../components/ResponsiveTabs';

export default function Edit({ attributes, setAttributes, clientId }){
  const { toggleName, toggleTarget, styles } = attributes;

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

  const buildDataAttrs = ({ toggleName, toggleTarget }) => ({
    ...(toggleName   ? { 'data-ui-toggle' : toggleName   } : {}),
    ...(toggleTarget ? { 'data-ui-target': toggleTarget } : {}),
  });

  const { innerBlockCount } = useSelect(select => ({
    innerBlockCount: select('core/block-editor').getBlockCount(clientId),
  }), [clientId]);

  const fixedToggleClass = 'oui_toggle';
  const combinedClasses = `${blockClasses || ''} ${fixedToggleClass}`.trim();

  // ブロックのプロパティにインラインスタイルを適用
  const blockProps = useBlockProps({
    className: combinedClasses,
    style: inlineStyles,
    ...buildDataAttrs({ toggleName, toggleTarget }),
  });

  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    renderAppender: innerBlockCount > 0
      ? undefined
      : () => <ButtonBlockAppender rootClientId={clientId} />
  });

  // ブロックの表示内容
  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Toggle Settings', 'origamiui')}>
          <SelectControl
            label={__('Toggle Type', 'origamiui')}
            value={toggleName}
            options={[
              { label: '---', value: '' },
              { label: 'offcanvas open', value: 'oui_offcanvas-open' },
              { label: 'offcanvas close', value: 'oui_offcanvas-close' }
            ]}
            onChange={(value) => setAttributes({ toggleName: value })}
            __next40pxDefaultSize={ true }
            __nextHasNoMarginBottom={ true }
          />
          <TextControl
            label={__('Toggle Target', 'origamiui')}
            value={toggleTarget}
            onChange={(value) => setAttributes({ toggleTarget: value })}
            __next40pxDefaultSize={ true }
            __nextHasNoMarginBottom={ true }
          />
          <ResponsiveTabs>
            { ( tab ) => (
              <>
                <Heading style={{ marginTop: '1.5em', marginBottom: '5px' }}>{__(`Display (${tab.name})`, 'origamiui')}</Heading>
                <SelectControl
                  value={styles.base.display.visible[tab.name]}
                  options={[
                    { label: '---', value: '' },
                    { label: 'none', value: 'none' },
                    { label: 'block', value: 'block' },
                  ]}
                  onChange={(newDisplay) => updateStyles(`base.display.visible.${tab.name}`, newDisplay)}
                  __next40pxDefaultSize={ true }
                  __nextHasNoMarginBottom={ true }
                />
              </>
            ) }
          </ResponsiveTabs>
        </PanelBody>
        <PanelBody title={__('Display Settings', 'origamiui')} initialOpen={false}>
          <SelectControl
            label={__('Overflow', 'origamiui')}
            value={styles.base.display.overflow}
            options={[
              { label: '---', value: '' },
              { label: 'auto', value: 'auto' },
              { label: 'hidden', value: 'hidden' },
              { label: 'visible', value: 'visible' },
              { label: 'scroll', value: 'scroll' },
            ]}
            onChange={(newOverflow) => updateStyles(`base.display.overflow`, newOverflow)}
            __next40pxDefaultSize={ true }
            __nextHasNoMarginBottom={ true }
          />
          <SelectControl
            label={__('Opacity', 'origamiui')}
            value={styles.base.display.opacity}
            options={[
              { label: '---', value: '' },
              { label: '100%', value: '100' },
              { label: '75%', value: '75' },
              { label: '50%', value: '50' },
              { label: '25%', value: '25' },
              { label: '0', value: '0' },
            ]}
            onChange={(newOpacity) => updateStyles(`base.display.opacity`, newOpacity)}
            __next40pxDefaultSize={ true }
            __nextHasNoMarginBottom={ true }
          />
          <SelectControl
            label={__('z-index', 'origamiui')}
            value={styles.base.display.zIndex}
            options={[
              { label: '---', value: '' },
              { label: '3', value: '3' },
              { label: '2', value: '2' },
              { label: '1', value: '1' },
              { label: '0', value: '0' },
              { label: '-1', value: 'n1' },
            ]}
            onChange={(newZIndex) => updateStyles(`base.display.zIndex`, newZIndex)}
            __next40pxDefaultSize={ true }
            __nextHasNoMarginBottom={ true }
          />
        </PanelBody>
      </InspectorControls>
      
      <div {...innerBlocksProps} />
    </>
  );
};