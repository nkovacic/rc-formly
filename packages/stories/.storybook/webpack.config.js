module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("ts-loader"),
        options: {
          reportFiles: [
            "../**/src/**/*.{ts,tsx}"
          ]
        }
      },
      // Optional
      {
        loader: require.resolve("react-docgen-typescript-loader")
      }
    ]
  });

  //config.entry = config.entry.filter(singleEntry => !singleEntry.includes('/webpack-hot-middleware/'));
  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
