const { setConfig } = require("storybook-addon-playwright/configs");
const playwright = require("playwright");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-knobs/register",
    "storybook-addon-playwright/preset",
    "storybook-addon-playwright/register",
  ],
};

(async () => {
  let browser = {
    chromium: await playwright["chromium"].launch(),
    firefox: await playwright["firefox"].launch(),
    webkit: await playwright["webkit"].launch(),
  };
  setConfig({
    storybookEndpoint: `http://localhost:6006/`,
    getPage: async (browserType, options) => {
      const page = await browser[browserType].newPage(options);
      return page;
    },
    afterScreenshot: async (page) => {
      await page.close();
    },
  });
})();
