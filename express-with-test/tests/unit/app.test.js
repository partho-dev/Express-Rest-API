// test/unit/app.test.js
const request = require('supertest');
const app = require('../../index');  // Import the express app, not the server

describe('Test the root path', () => {
  it('should respond with a 200 status and correct message', async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: "success",
      message: "Hello users., this is the response with status code 200, I am coming from express"
    });
  });
});
