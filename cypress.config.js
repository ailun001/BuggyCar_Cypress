const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1200,
    viewportWidth: 1000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:"https://buggy.justtestit.org",
    supportFile:"cypress/support/commands.js",
  },
});
