module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/src/**/*.js"
  ],
  coverageDirectory: "coverage",
  coverageReporters: [
    "html",
    "text-summary"
  ],
  moduleFileExtensions: [
    "js",
    "json"
  ],
  // testEnvironment: "node",
  transform: {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  }
};
