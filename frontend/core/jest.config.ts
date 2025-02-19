import type {Config} from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coveragePathIgnorePatterns: [
    '/App.tsx',
    '/bootstrap.ts',
    '/index.ts',
    '/*.d.ts',
    '/node_modules/',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      statements: 90,
    },
    './src/components/': {
      statements: 80,
    },
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transforms TypeScript files
    "^.+\\.(js|jsx|mjs|cjs)$": "babel-jest", // Transforms JavaScript files
  },
};

export default config;
