# How to do test during developmennt

During development the developers also can write tests to check if the code has any bug
Two main types of tests
1. Unit Test - When developer creates some function to perform some action, to test that function, they can run the unit test on that function
    - `jest` package is needed
2. Integration Test - When a developer creates an API end point like `Get /api/v1/products` 
    - This test is called integration tests
    - along with `jest` another package called `supertest` is also needed to use req & res to similate the data manupulations


1. install the packages in Dev Dependancies
    - `npm i -D jest supertest`
2. In the package.json file, create a script file for the test
    ```
            "scripts": {
            "start": "nodemon server.js",
            "test": "jest"
        },
    ```
3. Now, create a folder called `tests` on the root directory
    - `mkdir tests`
    - create files to perform test in that folder
        - `sample.test.js` : Make sure the file should have `test` on that

*sample.test.js*
```
describe('Sample Test', () => {
    it('should work', () => {
      expect(true).toBe(true);
    });
});
```

Once the test file is written, its the time to do the test.
- Go to terminal 
- Make sure, its the same project folder
- execute `npm test`
- The result of the test would be shown here.
