  // jest.config.js
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    // This maps CSS imports to a mock module
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // For handling SVG imports
    '\\.svg$': '<rootDir>/src/__mocks__/svgMock.js',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '\\.pnp\\.[^\\/]+$'
  ],
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage/'],
};