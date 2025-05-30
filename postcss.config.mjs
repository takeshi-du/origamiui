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
        prefix: 'oui_'
      },
      rtlcss: context.env === 'RTL'
    }
  }
}
