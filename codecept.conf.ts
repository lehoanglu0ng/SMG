import {
  setHeadlessWhen,
  setCommonPlugins
} from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './tests/*_test.ts',
  output: './output',
  helpers: {
    REST: {
      endpoint: 'https://en.wikipedia.org/w/api.php',
      prettyPrintJson: true,
    },
    JSONResponse: {},
    Mochawesome: {
      uniqueScreenshotNames: true
    },
    Playwright: {
      url: "https://en.wikipedia.org/wiki/Main_Page",
      show: false,
      browser: 'chromium'
    },
    ChaiWrapper: {
      require: "codeceptjs-chai"
    }
  },
  include: {
    I: './steps_file',
    mainPage: "./pages/main.ts",
    searchResultsPage: "./pages/searchResults.ts",
  },
  name: 'SMG',
  mocha: {
    reporterOptions: {
      reportDir: "output"
    }
  }
}