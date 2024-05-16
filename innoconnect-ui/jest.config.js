const nextJest = require('next/jest')
 
const createJestConfig = nextJest({
  dir: './',
})

const config = {
  clearMocks: true,
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "/node_modules",
    "lib\.js"
  ]
};

module.exports = createJestConfig(config)
