module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            "@components": "./components",
            "@constants": "./constants",
            "@hooks": "./hooks",
            "@Igql": "./Igql",
            "@navigation": "./navigation",
            "@screens": "./screens",
          }
        }
      ]
    ]
  };
};
