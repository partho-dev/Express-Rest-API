module.exports = {
    testEnvironment: 'node',  // For Node.js environment
    transform: {
      '^.+\\.js$': 'babel-jest',  // Use babel-jest for transforming JS files
    },
    moduleFileExtensions: ['js', 'json'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  };
  