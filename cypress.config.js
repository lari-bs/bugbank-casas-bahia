const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const dayjs = require("dayjs")
const timestamp = dayjs().format("YYYY-MM-DD_HH-mm-ss")

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  const timestamp = dayjs().format("YYYY-MM-DD_HH-mm-ss")
  config.screenshotsFolder = `output/screenshots/${timestamp}`
  config.reporterOptions = {
    reportDir: `output/reports`,
    overwrite: true,
    html: true,
    json: false,
    embeddedScreenshots: true,
    charts: true,
    quiet: true,
  }
  process.env.CUCUMBER_PUBLISH_ENABLED = "false";
  on(
      "file:preprocessor",
      createBundler({
        plugins: [createEsbuildPlugin.default(config)],
      })
  );
  require("cypress-mochawesome-reporter/plugin")(on)
  return config;
}

module.exports = defineConfig({
  chromeWebSecurity: false,
  watchForFileChanges: false,
  defaultCommandTimeout: 30000,
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
  screenshotOnRunFailure: true,
  screenshotsFolder: `output/screenshots/${timestamp}`,
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: "**/*.feature",
    stepDefinitions: "cypress/e2e",
    setupNodeEvents,
  },
});