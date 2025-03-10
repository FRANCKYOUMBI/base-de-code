module.exports = {
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx, js, jsx}'],
  coverageReporters: ['text', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 64,
      lines: 78,
      statements: 78,
    },
  },
  collectCoverage: true,
  rootDir: './',
  testRegex: '.*.spec.ts',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
