require("./preview.css");
const { withThemeByClassName } = require("@storybook/addon-themes");
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "story-theme-light",
      dark: "story-theme-dark",
    },
    defaultTheme: "dark",
    parentSelector: "body",
  }),
];
