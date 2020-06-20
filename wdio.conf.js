require('dotenv').config();

const dynamicConfig = {};

const {
  CI_JOB_NAME,
  PORT_DRIVER_CHROME,
  HOSTNAME_DRIVER_CHROME,
  PORT_DRIVER_FIREFOX,
  HOSTNAME_DRIVER_FIREFOX,
  BASE_URL,
} = process.env;

if (CI_JOB_NAME) {
  if (CI_JOB_NAME === 'e2e:chrome') {
    dynamicConfig.capabilities = [
      {
        browserName: 'chrome',
        port: Number(PORT_DRIVER_CHROME) || 4444,
        hostname: HOSTNAME_DRIVER_CHROME,
      },
    ];
  } else if (CI_JOB_NAME === 'e2e:firefox') {
    dynamicConfig.capabilities = [
      {
        browserName: 'firefox',
        port: Number(PORT_DRIVER_FIREFOX) || 4444,
        hostname: HOSTNAME_DRIVER_FIREFOX,
      },
    ];
  }
} else {
  dynamicConfig.services = ['chromedriver'];
  dynamicConfig.capabilities = [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['window-size=1920,1080', '--headless'],
      },
    },
  ];
}

exports.config = Object.assign(
  {},
  {
    runner: 'local',
    specs: ['./test/specs/**/*.spec.js'],
    exclude: [],
    maxInstances: 10,
    capabilities: [{}],
    logLevel: 'silent',
    bail: 0,
    baseUrl: BASE_URL,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['selenium-standalone'],
    framework: 'mocha',
    reporters: [
      'spec',
      ['json', { outputDir: './reporters/json' }],
      [
        'allure',
        {
          outputDir: './reporters/allure',
          disableMochaHooks: true,
        },
      ],
    ],
    mochaOpts: {
      ui: 'bdd',
      timeout: 60000,
    },
    beforeSession: function (config, capabilities, specs) {
      require('expect-webdriverio');
    },
    before: function (capabilities, specs) {
      const chai = require('chai');
      const chaiWebdriver = require('chai-webdriverio').default;
      chai.use(chaiWebdriver(browser));
      global.expect = chai.expect;
    },
  },
  dynamicConfig
);
