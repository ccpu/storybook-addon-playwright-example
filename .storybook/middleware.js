const { setConfig } = require("storybook-addon-playwright/configs");
const playwright = require("playwright");
const middleware = require("storybook-addon-playwright/middleware");

(async () => {
  const browser = {
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

module.exports = middleware;
