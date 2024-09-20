# <mark> Setting up Unit Test for Express using Jest </mark> 
---

## Install the required packages

```
npm install --save-dev jest supertest @babel/preset-env @babel/preset-react babel-jest
```

### What are these packages do
- jest: Test runner.
- supertest: HTTP assertion library to test Express routes.
- babel-jest: Allows Jest to transform JavaScript using Babel.
- @babel/preset-env: Preset for modern JavaScript features

### Create babel.config.js in the root project folder

```
module.exports = {
  presets: ['@babel/preset-env']
};
```

### Create jest.config.js on the root folder

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

### Create jest.setup.js file on the root folder
```
// jest.setup.js
// Add global mocks or configurations if necessary.
```

### consider this is the app/server.js file with api endpoint
```
// app.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

module.exports = app;

```

### Create a test file on root

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

### Add test script on package.json

```
{
  "scripts": {
    "test": "jest"
  }
}
```

### Run the test
``npm test``


---

## Special consideration

- If error happens with respect to app 
try to export that from index.js file


- & in the test file, try to use expect`(response.body)` instead of expect`(response.text)`