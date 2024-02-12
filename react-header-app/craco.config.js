const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const deps = require('./package.json').dependencies;

module.exports = {
  plugins: [
    {
      plugin: {
        overrideCracoConfig: ({ cracoConfig, pluginOptions, context: { env, paths } }) => { return cracoConfig; },
        overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => {
          webpackConfig.output.publicPath = "auto";

          webpackConfig.plugins = [
            ...webpackConfig.plugins,
            new ModuleFederationPlugin({
              name: "ReactHeaderApp",
              filename: "remoteEntry.js",
              exposes: {
                "./Header": "./src/App",
                "./Footer": "./src/components/Footer",
              },
              shared: {
                ...deps,
                'react-dom': {
                  singleton: true,
                  requiredVersion: deps["react"],
                  eager: true
                },
                react: {
                  singleton: true,
                  requiredVersion: deps["react-dom"],
                  eager: true
                },
              }
            }),
          ]
          return webpackConfig;
        },
        overrideDevServerConfig: ({ devServerConfig, cracoConfig, pluginOptions, context: { env, paths, proxy, allowedHost } }) => { return devServerConfig; },
        overrideJestConfig: ({ jestConfig, cracoConfig, pluginOptions, context: { env, paths, resolve, rootDir } }) => { return jestConfig },
      },
    }
  ]
};