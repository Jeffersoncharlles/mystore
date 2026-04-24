import createJestConfig from 'next/jest.js'

const config = createJestConfig({
  dir: './',
})({
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {},
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/src/components/ui/',
    '/src/lib/',
    'index.ts',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
})

export default config
