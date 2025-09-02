module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@data': './src/data',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@navigation': './src/navigation',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@services': './src/services',
          '@assets': './assets',
        },
      },
    ],
  ],
};
