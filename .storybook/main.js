export default {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  addons: ["storybook-addon-playwright/register", "@storybook/addon-themes"],
};
