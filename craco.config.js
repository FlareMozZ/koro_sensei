module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // Override the default output configuration to create a format Chrome extensions accept
        webpackConfig.output.filename = 'static/js/[name].js';
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          splitChunks: {
            cacheGroups: {
              default: false,
            },
          },
        };
        webpackConfig.entry = {
          main: './src/index.js',
        };
        return webpackConfig;
      },
    },
  };
  