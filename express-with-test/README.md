- Clone the repo
- Go inside the project folder -    `cd erg-pattern-app-expressjs `
- Check if the npm is set to which Repository - `npm config ls -l | grep registry` [# try changing the terminal to git bash mode to execute this command]
    - If it comes like this `https://registry.npmjs.org`
    - It needs to set internal Nexus repo 
    - `npm set registry http://<your-nexus-ip>:8081/repository/npm-repo/`
- by default, there would be a hidden file called .npmrc and this would have the registry setup already. 


========================

## Test setup 
- Jest for unit test (Its just an example, set the test accordingly)

## Setting up Unit Test for Express using Jest 
1. Install the required packages
- npm install --save-dev jest supertest @babel/preset-env @babel/preset-react babel-jest

```
jest: Test runner.
supertest: HTTP assertion library to test Express routes.
babel-jest: Allows Jest to transform JavaScript using Babel.
@babel/preset-env: Preset for modern JavaScript features
```

2. Create babel.config.js in the root project folder
```
module.exports = {
  presets: ['@babel/preset-env']
};
```

3. Create jest.config.js on the root folder
```
module.exports = {
  testEnvironment: 'node',  // For Node.js environment
  transform: {
    '^.+\\.js$': 'babel-jest',  // Use babel-jest for transforming JS files
  },
  moduleFileExtensions: ['js', 'json'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
```

4. Create jest.setup.js file on the root folder
```
// jest.setup.js
// Add global mocks or configurations if necessary.
```
5.  consider this is the app/server.js file with api endpoint
```
// app.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

module.exports = app;

```

6. Create a test file on root
- root/test/unit/app.test.js
```
// test/unit/app.test.js
const request = require('supertest');
const app = require('../../app');  // Import the express app

describe('Test the root path', () => {
  it('should respond with a 200 status and "Hello World!" message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});
```
7. Add test script on package.json
```
{
  "scripts": {
    "test": "jest"
  }
}
```

8. Run the test
- npm test
