document.addEventListener('DOMContentLoaded', function() {

  //------------------------------------------------------
  //	Offcanvas
  //------------------------------------------------------
  const openBtn = document.querySelectorAll('[data-ui-toggle="oui_offcanvas-open"]');
  const closeBtn = document.querySelectorAll('[data-ui-toggle="oui_offcanvas-close"]');

  if (!openBtn || !closeBtn) {
    return;
  }

  openBtn.forEach(button => {
    button.addEventListener('click', function() {
      openNav(this);
    });
  });
  closeBtn.forEach(button => {
    button.addEventListener('click', function() {
      closeNav(this);
    });
  });

  function openNav(clickedButton) {
    const targetId = clickedButton.getAttribute('data-ui-target');
    const offcanvas = document.querySelector(`#${targetId}`);
    
    if (!offcanvas) {
      console.error(`Offcanvasコンテナが見つかりません: #${targetId}`);
      return;
    }
    
    const isLeft = offcanvas.classList.contains('oui_offcanvas_left');
    const isRight = offcanvas.classList.contains('oui_offcanvas_right');
    const offcanvasBg = offcanvas.nextElementSibling;
    
    offcanvas.classList.add('oui_is_active');
    offcanvasBg.classList.add('oui_bg_is_active');
    if (isRight) {
      offcanvas.style.right = '0';
    } else if (isLeft) {
      offcanvas.style.left = '0';
    }

    document.body.style.overflow = "hidden";
    document.body.classList.add("oui_offcanvas_opened");
  }
  function closeNav(clickedButton) {
    const targetId = clickedButton.getAttribute('data-ui-target');
    const offcanvas = document.querySelector(`#${targetId}`);

    if (!offcanvas) {
      console.error(`Offcanvasコンテナが見つかりません: #${targetId}`);
      return;
    }

    const isLeft = offcanvas.classList.contains('oui_offcanvas_left');
    const isRight = offcanvas.classList.contains('oui_offcanvas_right');

    const offcanvasWidth = getOffcanvasWidthInfo().variableValue;
    const negativeOffcanvasWidth = `-${offcanvasWidth}`;
    const offcanvasBg = offcanvas.nextElementSibling;

    offcanvas.classList.remove('oui_is_active');
    offcanvasBg.classList.remove('oui_bg_is_active');
    if (isRight) {
      offcanvas.style.right = negativeOffcanvasWidth;
    } else if (isLeft) {
      offcanvas.style.left = negativeOffcanvasWidth;
    }
    document.body.style.overflow = "";
    document.body.classList.remove("oui_offcanvas_opened");
  }

  const BREAKPOINTS = {
    SM_MAX_WIDTH: '767.98px',
    MD_MAX_WIDTH: '991.98px',
    LG_MAX_WIDTH: '1199.98px'
  };

  const CSS_VARIABLES = {
    SM_WIDTH: '--oui-offcanvas-width-sm',
    MD_WIDTH: '--oui-offcanvas-width-md',
    LG_WIDTH: '--oui-offcanvas-width-lg',
    XL_WIDTH: '--oui-offcanvas-width-xl'
  };

  function getOffcanvasWidthInfo() {
    const element = document.querySelector('.oui_offcanvas');
    if (!element) {
      console.warn('Element with class .oui_offcanvas not found.');
      return null;
    }

    const computedStyle = window.getComputedStyle(element);
    let activeBreakpoint = '';
    let cssVariableName = '';

    if (window.matchMedia(`(max-width: ${BREAKPOINTS.SM_MAX_WIDTH})`).matches) {
      activeBreakpoint = 'sm';
      cssVariableName = CSS_VARIABLES.SM_WIDTH;
    } else if (window.matchMedia(`(max-width: ${BREAKPOINTS.MD_MAX_WIDTH})`).matches) {
      activeBreakpoint = 'md';
      cssVariableName = CSS_VARIABLES.MD_WIDTH;
    } else if (window.matchMedia(`(max-width: ${BREAKPOINTS.LG_MAX_WIDTH})`).matches) {
      activeBreakpoint = 'lg';
      cssVariableName = CSS_VARIABLES.LG_WIDTH;
    } else {
      activeBreakpoint = 'xl';
      cssVariableName = CSS_VARIABLES.XL_WIDTH;
    }

    const variableValue = computedStyle.getPropertyValue(cssVariableName).trim();
    const effectiveWidth = computedStyle.width;

    return {
      breakpoint: activeBreakpoint,
      variableName: cssVariableName,
      variableValue: variableValue || null,
      effectiveWidth: effectiveWidth
    };
  }
});