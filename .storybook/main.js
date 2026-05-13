const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  addons: ["storybook-addon-playwright/register", "@storybook/addon-themes"],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.[jt]sx?$/,
      include: path.resolve(__dirname, "../src"),
      use: {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [
            require.resolve("@babel/preset-env"),
            require.resolve("@babel/preset-react"),
          ],
        },
      },
    });

    return config;
  },
};
