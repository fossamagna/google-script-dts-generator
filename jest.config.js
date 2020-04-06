module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: "./coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
  roots: ["./src"]
};