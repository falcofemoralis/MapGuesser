//https://reactnative.dev/docs/typescript#using-custom-path-aliases-with-typescript

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['transform-html-import-require-to-string', [
    'module-resolver',
    {
      root: ['./src'],
      extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      alias: {
        "@": "./src",
      }
    }
  ]],
};
