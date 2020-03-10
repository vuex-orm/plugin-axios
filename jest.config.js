module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text-summary', 'clover'],
  collectCoverageFrom: ['src/**/*.ts', '!src/index.cjs.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1'
  },
  rootDir: __dirname,
  testMatch: ['<rootDir>/test/**/*.spec.ts?(x)'],
  testPathIgnorePatterns: ['/node_modules/']
}
