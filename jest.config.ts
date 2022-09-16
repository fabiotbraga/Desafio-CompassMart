import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  bail: true,
  clearMocks: true,
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "__tests__/coverage",
  collectCoverageFrom: [
    "src/**",
    "!src/server.ts",
    "!src/app/utils/**",
    "!src/config/**",
    "!src/app/mapper/**",
    "!src/logger/**",
    "!src/infra/**"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "__tests__/coverage/",
    "src/setup.ts"
  ]
};

export default config;
