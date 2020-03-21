module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', "module:react-native-dotenv"],
    plugins: [
      ["module-resolver", {
        "root": ["./"],
        "alias": {
          "@modules": "./src/modules/",
          "@utils": "./src/utils/",
        }
      }]
    ]
  };
};
