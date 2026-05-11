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
    // When running Playwright in a separate container or remote environment,
    // set `storybookEndpoint` to a host/IP that is reachable from the remote browser runtime.
    // `localhost` only works when Storybook and Playwright run on the same machine/network namespace.
    storybookEndpoint: `http://localhost:6006/`,
    getPage: async (browserType, options) => {
      const page = await browser[browserType].newPage(options);
      return page;
    },
    beforeScreenshot: async (page) => {
      // firefox and webkit need some time to load the content before taking the screenshot
      await new Promise((resolve) => setTimeout(() => resolve(), 200));
    },
    afterScreenshot: async (page) => {
      await page.close();
    },
  });
})();

module.exports = middleware;
