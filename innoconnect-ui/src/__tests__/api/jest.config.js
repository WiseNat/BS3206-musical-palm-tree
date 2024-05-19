const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  clearMocks: true,
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "/node_modules",
    "jest.config.js",
    "/mongodb-memory-server",
    "lib.js",
  ],
  globalSetup: "<rootDir>/mongodb-memory-server/globalSetup.js",
  globalTeardown: "<rootDir>/mongodb-memory-server/globalTeardown.js",
  setupFilesAfterEnv: ["<rootDir>/mongodb-memory-server/setupFile.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/../../$1",
  },
};

module.exports = createJestConfig(config);
