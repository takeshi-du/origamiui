const mapConfig = {
  inline: false,
  annotation: true,
  sourcesContent: true
}

export default context => {
  return {
    map: context.file.dirname.includes('examples') ? false : mapConfig,
    plugins: {
      autoprefixer: {
        cascade: false
      },
      'postcss-prefixer': {
        prefix: 'oui_',
        ignore: [
          '#wpadminbar',
          '.wp-block-origamiui-custom-group',
          '.wp-block-origamiui-custom-container',
          '.wp-block-origamiui-custom-grid',
          '.wp-block-origamiui-custom-column',
          '.wp-block-origamiui-custom-offcanvas',
          '.wp-block-origamiui-custom-toggle',
        ],
      },
      rtlcss: context.env === 'RTL'
    }
  }
}
