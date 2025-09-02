const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@navigation': path.resolve(__dirname, 'src/navigation'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
