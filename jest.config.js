export default {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  testEnvironment: "node",

  transform: {
    "^.+\\.js$": "babel-jest"
  },

  transformIgnorePatterns: [
    "/node_modules/"
  ]
};
