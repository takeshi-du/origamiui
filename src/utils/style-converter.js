export const convertStylesToCSS = (styles) => {
  const inlineStyles = {};
  const classes = [];

  // margin と padding の処理を共通化する関数
  // 2段ある場合
  const processSpacing = (property, spacingValues, prefixes) => {
    if (typeof spacingValues === 'object' && spacingValues !== null) {
      Object.entries(prefixes).forEach(([side, preval]) => {
        const sideValues = spacingValues[side];
        if (sideValues) {
          Object.entries(sideValues).forEach(([breakpoint, value]) => {
            if (value && value !== '---') {
              const prefix = prefixes[side];
              if (breakpoint === 'sm') {
                classes.push(`${prefix}-${value}`); // smの場合はブレイクポイントなし
              } else {
                classes.push(`${prefix}-${breakpoint}-${value}`); // md, lgなどはブレイクポイント付き
              }
            }
          });
        }
      });
    } else if (spacingValues) {
      // 単一値の場合はインラインスタイルに設定（後方互換性）
      inlineStyles[property] = spacingValues;
    }
  };
  // 1段だけの場合
  const generateBreakpointClasses = (prefix, value) => {
    if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([breakpoint, val]) => {
        if (val && val !== '---') {
          if (breakpoint === 'sm') {
            classes.push(`${prefix}-${val}`);
          } else {
            classes.push(`${prefix}-${breakpoint}-${val}`);
          }
        }
      });
    } else if (value) {
      classes.push(`${prefix}${value}`);
    }
  };
  // 0段の場合
  const generateClasses = (prefix, value) => {
    if (typeof value !== null && value !== '---') {
      classes.push(`${prefix}-${value}`);
    }
  };
  // positionの場合
  const getPositionClass = (alignment, isOutsideHorizontal, isOutsideVertical) => {
    // const classMap = {
    //   'top left': isHalfOutside ? 'oui_top-0 oui_start-0 oui_translate-middle' : 'oui_top-0 oui_start-0',
    //   'top center': isHalfOutside ? 'oui_top-0 oui_start-50 oui_translate-middle' : 'oui_top-0 oui_start-50 oui_translate-middle-x',
    //   'top right': isHalfOutside ? 'oui_top-0 oui_start-100 oui_translate-middle' : 'oui_top-0 oui_end-0',
    //   'center left': isHalfOutside ? 'oui_top-50 oui_start-0 oui_translate-middle' : 'oui_top-50 oui_start-0 oui_translate-middle-y',
    //   'center center': isHalfOutside ? 'oui_top-50 oui_start-50 oui_translate-middle' : 'oui_top-50 oui_start-50 oui_translate-middle',
    //   'center right': isHalfOutside ? 'oui_top-50 oui_start-100 oui_translate-middle' : 'oui_top-50 oui_end-0 oui_translate-middle-y',
    //   'bottom left': isHalfOutside ? 'oui_top-100 oui_start-0 oui_translate-middle' : 'oui_bottom-0 oui_start-0',
    //   'bottom center': isHalfOutside ? 'oui_top-100 oui_start-50 oui_translate-middle' : 'oui_bottom-0 oui_start-50 oui_translate-middle-x',
    //   'bottom right': isHalfOutside ? 'oui_top-100 oui_start-100 oui_translate-middle' : 'oui_bottom-0 oui_end-0',
    // };
    if (alignment === 'top left') {
      if (isOutsideHorizontal && !isOutsideVertical) {
        classes.push('oui_top-0 oui_start-0 oui_translate-middle-x');
      } else if (!isOutsideHorizontal && isOutsideVertical) {
        classes.push('oui_top-0 oui_start-0 oui_translate-middle-y');
      } else if (isOutsideHorizontal && isOutsideVertical) {
        classes.push('oui_top-0 oui_start-0 oui_translate-middle');
      } else {
        classes.push('oui_top-0 oui_start-0');
      }
    }
    if (alignment === 'top center') {
      if (isOutsideHorizontal && !isOutsideVertical) {
        classes.push('oui_top-0 oui_start-50 oui_translate-middle-x');
      } else if (!isOutsideHorizontal && isOutsideVertical) {
        classes.push('oui_top-0 oui_start-50 oui_translate-middle');
      } else if (isOutsideHorizontal && isOutsideVertical) {
        classes.push('oui_top-0 oui_start-50 oui_translate-middle');
      } else {
        classes.push('oui_top-0 oui_start-50 oui_translate-middle-x');
      }
    }
    if (alignment === 'top right') {
      if (isOutsideHorizontal && !isOutsideVertical) {
        classes.push('oui_top-0 oui_start-100 oui_translate-middle-x');
      } else if (!isOutsideHorizontal && isOutsideVertical) {
        classes.push('oui_top-0 oui_end-0 oui_translate-middle-y');
      } else if (isOutsideHorizontal && isOutsideVertical) {
        classes.push('oui_top-0 oui_start-100 oui_translate-middle');
      } else {
        classes.push('oui_top-0 oui_end-0');
      }
    }
    if (alignment === 'center left') {
      if (isOutsideHorizontal && !isOutsideVertical) {
        classes.push('oui_top-50 oui_start-0 oui_translate-middle');
      } else if (!isOutsideHorizontal && isOutsideVertical) {
        classes.push('oui_top-50 oui_start-0 oui_translate-middle-y');
      } else if (isOutsideHorizontal && isOutsideVertical) {
        classes.push('oui_top-50 oui_start-0 oui_translate-middle');
      } else {
        classes.push('oui_top-50 oui_start-0 oui_translate-middle-y');
      }
    }
    if (alignment === 'center center') {
      classes.push('oui_top-50 oui_start-50 oui_translate-middle');
    }
    if (alignment === 'center right') {
      if (isOutsideHorizontal && !isOutsideVertical) {
        classes.push('oui_top-50 oui_start-100 oui_translate-middle');
      } else if (!isOutsideHorizontal && isOutsideVertical) {
        classes.push('oui_top-50 oui_end-0 oui_translate-middle-y');
      } else if (isOutsideHorizontal && isOutsideVertical) {
        classes.push('oui_top-50 oui_start-100 oui_translate-middle');
      } else {
        classes.push('oui_top-50 oui_end-0 oui_translate-middle-y');
      }
    }
    if (alignment === 'bottom left') {
      if (isOutsideHorizontal && !isOutsideVertical) {
        classes.push('oui_bottom-0 oui_start-0 oui_translate-middle-x');
      } else if (!isOutsideHorizontal && isOutsideVertical) {
        classes.push('oui_top-100 oui_start-0 oui_translate-middle-y');
      } else if (isOutsideHorizontal && isOutsideVertical) {
        classes.push('oui_top-100 oui_start-0 oui_translate-middle');
      } else {
        classes.push('oui_bottom-0 oui_start-0');
      }
    }
    if (alignment === 'bottom center') {
      if (isOutsideHorizontal && !isOutsideVertical) {
        classes.push('oui_bottom-0 oui_start-50 oui_translate-middle-x');
      } else if (!isOutsideHorizontal && isOutsideVertical) {
        classes.push('oui_top-100 oui_start-50 oui_translate-middle');
      } else if (isOutsideHorizontal && isOutsideVertical) {
        classes.push('oui_top-100 oui_start-50 oui_translate-middle');
      } else {
        classes.push('oui_bottom-0 oui_start-50 oui_translate-middle-x');
      }
    }
    if (alignment === 'bottom right') {
      if (isOutsideHorizontal && !isOutsideVertical) {
        classes.push('oui_bottom-0 oui_start-100 oui_translate-middle-x');
      } else if (!isOutsideHorizontal && isOutsideVertical) {
        classes.push('oui_top-100 oui_end-0 oui_translate-middle-y');
      } else if (isOutsideHorizontal && isOutsideVertical) {
        classes.push('oui_top-100 oui_start-100 oui_translate-middle');
      } else {
        classes.push('oui_bottom-0 oui_end-0');
      }
    }

    // classes.push(classMap[alignment]);
    // return classMap[alignment] || 'position-absolute oui_top-50 oui_start-50 translate-middle';
  };

  if (styles?.base?.offcanvasBgColor) {
    inlineStyles['--oui-offcanvas-bgcolor'] = styles.base.offcanvasBgColor;
  }

  // styles.base.sizing が存在するか確認
  if (styles?.base?.sizing) {
    const { size, width, height, column, offset, parentBlockName } = styles.base.sizing;

    // そのまま出力するものは直接入れる
    if (size) {
      inlineStyles['--oui-size'] = size;
    }

    if (width) {
      generateBreakpointClasses('oui_w', width);
    }
    if (height) {
      generateBreakpointClasses('oui_h', height);
    }
    if (column) {
      if (parentBlockName === 'origamiui/custom-grid') {
        generateBreakpointClasses('oui_g-col', column);
      } else {
        generateBreakpointClasses('oui_col', column);
      }
    }
    if (offset) {
      generateBreakpointClasses('oui_offset', offset);
    }
  }

  if (styles?.base?.flex) {
    const { display, direction, wrap, align, justify, grow, shrink, self, order } = styles.base.flex;
    
    if (display) {
      generateBreakpointClasses('oui_d', display);
    }
    if (direction) {
      generateBreakpointClasses('oui_flex', direction);
    }
    if (wrap) {
      generateBreakpointClasses('oui_flex', wrap);
    }
    if (align) {
      generateBreakpointClasses('oui_align-items', align);
    }
    if (justify) {
      generateBreakpointClasses('oui_justify-content', justify);
    }
    if (grow) {
      generateBreakpointClasses('oui_flex', grow);
    }
    if (shrink) {
      generateBreakpointClasses('oui_flex', shrink);
    }
    if (self) {
      generateBreakpointClasses('oui_align-self', self);
    }
    if (order) {
      generateBreakpointClasses('oui_order', order);
    }
  }

  // styles.base.spacing が存在するか確認
  if (styles?.base?.spacing) {
    const { space, margin, padding, gap } = styles.base.spacing;
    // margin の接頭辞マップ
    const marginPrefixes = { top: 'oui_mt', bottom: 'oui_mb', left: 'oui_ml', right: 'oui_mr' };
    // padding の接頭辞マップ
    const paddingPrefixes = { top: 'oui_pt', bottom: 'oui_pb', left: 'oui_pl', right: 'oui_pr' };
    // gapの接頭辞
    const gapPrefixes = { row: 'oui_row-gap', column: 'oui_column-gap' };

    // space
    if (space) {
      inlineStyles['--oui-space'] = space;
    }

    // margin の処理
    if (margin) {
      processSpacing('oui_margin', margin, marginPrefixes);
    }
    // padding の処理
    if (padding) {
      processSpacing('oui_padding', padding, paddingPrefixes);
    }
    // gapの処理
    if (gap) {
      processSpacing('oui_gap', gap, gapPrefixes);
    }
  }

  if (styles?.base?.position) {
    const { className, alignment, isOutsideHorizontal, isOutsideVertical } = styles.base.position;

    if (className) {
      generateBreakpointClasses('oui_position', className);
    }
    if (alignment || isOutsideHorizontal || isOutsideVertical) {
      getPositionClass(alignment, isOutsideHorizontal, isOutsideVertical);
    }
  }

  // styles.base.sizing が存在するか確認
  if (styles?.base?.display) {
    const { header, container, row, grid, overflow, opacity, zIndex, visible } = styles.base.display;

    // そのまま出力するものは直接入れる
    if (header) {
      generateClasses('oui_header', header);
    }
    if (container) {
      generateBreakpointClasses('oui_', container);
    }
    if (row) {
      generateBreakpointClasses('oui_', row);
    }
    if (grid) {
      generateBreakpointClasses('oui_', grid);
    }
    if (overflow) {
      generateClasses('oui_overflow', overflow);
    }
    if (opacity) {
      generateClasses('oui_opacity', opacity);
    }
    if (zIndex) {
      generateClasses('oui_z', zIndex);
    }
    if (visible) {
      generateBreakpointClasses('oui_d', visible);
    }
  }

  return {
    inlineStyles,
    blockClasses: classes.join(' ')
  };
};