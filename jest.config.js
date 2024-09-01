const { resolve} = require('path');
const root = resolve(__dirname);
module.exports = {
  rootDir: root,
  displayName:'root-tests',
  testMatch: ['<rootDir>/__tests__/**/**/.test.ts'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"]
}