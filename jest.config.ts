import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  bail: true,
  clearMocks: true,
  testEnvironment: "node",
  verbose: true
};
export default config;
