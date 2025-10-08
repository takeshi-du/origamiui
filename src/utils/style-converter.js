export const convertStylesToCSS = (styles) => {
  const inlineStyles = {};
  const classes = [];

  // obj_2
  const processSpacing = (property, spacingValues, prefixes) => {
    if (typeof spacingValues === 'object' && spacingValues !== null) {
      Object.entries(prefixes).forEach(([side, preval]) => {
        const sideValues = spacingValues[side];
        if (sideValues) {
          Object.entries(sideValues).forEach(([breakpoint, value]) => {
            if (value && value !== '---') {
              const prefix = prefixes[side];
              if (breakpoint === 'sm') {
                classes.push(`${prefix}-${value}`);
              } else {
                classes.push(`${prefix}-${breakpoint}-${value}`);
              }
            }
          });
        }
      });
    } else if (spacingValues) {
      inlineStyles[property] = spacingValues;
    }
  };
  // obj_1
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
  // obj_0
  const generateClasses = (prefix, value) => {
    if (typeof value !== null && value !== '---') {
      classes.push(`${prefix}-${value}`);
    }
  };
  // position
  const getPositionClass = (alignment, isOutsideHorizontal, isOutsideVertical) => {
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

  if (styles?.base?.container) {
    const { width } = styles.base.container;

    if (width) {
      Object.entries(width).forEach(([breakpoint, val]) => {
        if (val && val !== '---') {
          inlineStyles[`--oui-container-${breakpoint}`] = val;
        }
      });
    }
  }

  if (styles?.base?.offcanvas) {
    const { bgColor, width } = styles.base.offcanvas;

    if (width) {
      Object.entries(width).forEach(([breakpoint, val]) => {
        if (val && val !== '---') {
          inlineStyles[`--oui-offcanvas-width-${breakpoint}`] = val;
        }
      });
    }

    if (bgColor) {
      inlineStyles['--oui-offcanvas-bgcolor'] = bgColor;
    }
  }
  
  if (styles?.base?.sizing) {
    const { size, width, height, column, offset, parentBlockName } = styles.base.sizing;

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
      if (parentBlockName === 'origamiui/custom-grid') {
        generateBreakpointClasses('oui_g-offset', offset);
      } else {
        generateBreakpointClasses('oui_offset', offset);
      }
    }
  }

  if (styles?.base?.flex) {
    const { display, direction, wrap, align, justify, grow, shrink, self, order, gapSpace, gap } = styles.base.flex;
    const gapPrefixes = { row: 'oui_row-gap', column: 'oui_column-gap' };
    
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

    if (gapSpace !== '' && gapSpace !== undefined && gapSpace !== null) {
      inlineStyles['--oui-gapSpace'] = gapSpace;
    }
    if (gap) {
      processSpacing('oui_gap', gap, gapPrefixes);
    }
  }

  // styles.base.spacing が存在するか確認
  if (styles?.base?.spacing) {
    const { space, margin, padding } = styles.base.spacing;
    const marginPrefixes = { top: 'oui_mt', bottom: 'oui_mb', left: 'oui_ml', right: 'oui_mr' };
    const paddingPrefixes = { top: 'oui_pt', bottom: 'oui_pb', left: 'oui_pl', right: 'oui_pr' };

    if (space) {
      inlineStyles['--oui-space'] = space;
    }
    if (margin) {
      processSpacing('oui_margin', margin, marginPrefixes);
    }
    if (padding) {
      processSpacing('oui_padding', padding, paddingPrefixes);
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

  if (styles?.base?.display) {
    const { header, container, row, grid, overflow, opacity, zIndex, visible } = styles.base.display;

    if (header) {
      generateClasses('oui_header', header);
    }
    if (container) {
      generateBreakpointClasses('oui_', container);
    }
    if (row) {
      generateBreakpointClasses('oui_', row);
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

    if (grid?.columns) {
      ['sm','md','lg','xl'].forEach((bp) => {
        const val = styles.base.display.grid.columns[bp];
        if (val !== undefined && val !== '' && Number(val) !== 12) {
          inlineStyles[`--oui-grid-columns-${bp}`] = String(val);
        }
      });
    }
  }

  return {
    inlineStyles,
    blockClasses: classes.join(' ')
  };
};