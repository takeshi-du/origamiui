/* webpack.config.js */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const fs   = require('fs');

const blocksDir  = path.resolve(__dirname, 'src/blocks');
const blockSlugs = fs.readdirSync(blocksDir).filter((name) =>
  fs.statSync(path.join(blocksDir, name)).isDirectory()
);

const entry = {};
blockSlugs.forEach((slug) => {
  entry[`blocks/${slug}/index`] = `./src/blocks/${slug}/index.js`;
});

module.exports = {
  ...defaultConfig,
  entry,
  output: {
    ...defaultConfig.output,
    path: path.resolve(process.cwd(), 'build'),
    filename: '[name].js',
  },
};
