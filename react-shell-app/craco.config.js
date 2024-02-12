const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const deps = require('./package.json').dependencies;

module.exports = {
  plugins: [
    {
      plugin: {
        overrideCracoConfig: ({ cracoConfig, pluginOptions, context: { env, paths } }) => { return cracoConfig; },
        overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => {
          webpackConfig.plugins = [
            ...webpackConfig.plugins,
            new ModuleFederationPlugin({
              name: "ShellApp",
              remotes: {
                "ReactHeaderApp": "ReactHeaderApp@http://localhost:3001/remoteEntry.js",
                "ReactApp": "ReactApp@http://localhost:3002/remoteEntry.js",
                "angularApp": "angularApp@http://localhost:3200/remoteEntry.js",
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