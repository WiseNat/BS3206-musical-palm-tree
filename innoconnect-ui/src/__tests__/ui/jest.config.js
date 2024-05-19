const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});


const config = {
    clearMocks: true,
    testEnvironment: "jsdom",
    testPathIgnorePatterns: ["/node_modules", "jest.config.js", "lib.js", "setupFile.js"],
    setupFilesAfterEnv: [
      "<rootDir>/setupFile.js"
    ],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/../../$1'
    },
};
  
module.exports = createJestConfig(config);
