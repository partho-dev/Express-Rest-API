## What is this project
- Here we are demonstrating the Front End using React & Backend using Express
- We will perform some CRUD operations with integrated DB as postgres

- Package for Node
    - express
    - nodemon for dev dependancy
    - CORS to access the api on FE(Next)
    - dotenv
    - npm install pg sequelize [pg (Postgres client for Node.js) and sequelize (an ORM for Node.js that supports Postgres).]

- Package for client
    - npm i dotenv
    
- I am using two different DB connections, one for mongoose & other for postgress 
    - install mongoose & pg as a package on the project


## Set Up Testing for Express with Jest
- **For Express** 👍 

- install the packages
- `npm install -D jest supertest`

- Create a Jest Configuration on Express root folder `jest.config.js`
```
module.exports = {
  testEnvironment: 'node',
}
```
- Create a `tests` directory & a file inside this `users.test.js`

```
const request = require('supertest');
const app = require('../server'); // make sure app is exported from the server.js - module.exports = app

describe('GET /api/v1/users', () => {
  it('should return a list of users', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
```

- update the test script on package.json
```
"scripts": {
  "test": "jest"
}
```

- **For NextJs** 👍 
- Set Up the Environment: Install the necessary dependencies like Jest and React Testing Library.
- Install Jest and Related Dependencies
    - `npm install -D jest @testing-library/react @testing-library/jest-dom`
    - `npm install --save-dev jest-environment-jsdom`


- Create Test Files: Write test files for different components, pages, and utilities for Next.js app. 
- Use the __tests__ directory or place test files next to the files they are testing.
- Add a `jest.config.js` file at the root of Next.js project

```
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
};

module.exports = createJestConfig(customJestConfig);
```

- Test Components: Focus on testing the behavior of the React components, such as rendering, state changes, and interactions.
- Set Up Testing Library
- Create a `jest.setup.js` file at the root of Next.js project:
```
import '@testing-library/jest-dom';

```
- Write a Simple Test for a Component
- Inside a __tests__ directory in Next.js project, create a test file like `Home.test.js`:
```
import { render, screen } from '@testing-library/react';
import Home from '../app/page'; // Adjust the import based on the file path

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      name: /List of users from backend/i,
    });
    expect(heading).toBeInTheDocument();
  });
});


```

- Test API Routes: For any API routes in the Next.js app, write unit tests to ensure they return the expected responses.
- Add the test script on package.json
```
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest"
  },
  ```
- Run the Tests: Use the `npm test` or yarn test command.