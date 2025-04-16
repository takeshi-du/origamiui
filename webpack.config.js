const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        'custom-group/index': './src/custom-group/index.js',
        'custom-container/index': './src/custom-container/index.js',
        'custom-row/index': './src/custom-row/index.js',
        'custom-grid/index': './src/custom-grid/index.js',
        'custom-column/index': './src/custom-column/index.js',
    },
    output: {
        ...defaultConfig.output,
        path: path.resolve(process.cwd(), 'build'),
        filename: '[name].js',
    },
};