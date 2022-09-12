import { faker } from '@faker-js/faker'
import app from '../../src/app'
import request from "supertest";
jest.setTimeout(1000000);


const ErrorExampleResponse = {
  Error: expect.objectContaining({
      message: expect.any(String),
      statusCode: expect.any(Number),
    })
}

const JoiErrorExampleResponse = {
      message: expect.any(String),
      description: expect.any(Array),
}

const  UserExampleResponse = {
  email: expect.any(String),
  id: expect.any(String),
}

describe("User Routes", () => {
  describe("Create User Route Tests", () => {
    test("(POST) => Should be able to create a new user", async () => {
       const response = await request(app).post('/api/v1/user').send({
        email: faker.internet.email(),
        password: faker.internet.password()
      })
       expect(response.statusCode).toBe(201);
       expect(response.body).toEqual(expect.objectContaining(UserExampleResponse))
    });

    test("(POST) => Should not be able to register a user if any field is empty", async () => {
      const response = await request(app).post('/api/v1/user').send({
        email: 'fabiotest@test.com',
      });
     expect(response.statusCode).toBe(400);
     expect(response.body).toEqual(expect.objectContaining(JoiErrorExampleResponse))
   });

   test("(POST) => Should not be able to register a user if email already exists", async () => {
    const response = await request(app).post('/api/v1/user').send({
      email: 'emailtest@test.com',
      password: faker.internet.password(),
      });
   expect(response.statusCode).toBe(400);
   expect(response.body).toEqual(expect.objectContaining(ErrorExampleResponse))
   });
  });

  describe("Authenticate Route Tests", () => {
    test("(POST) =>Should be able to realize user login", async () => {
      const response = await request(app).post('/api/v1/user/authenticate').send({
        email: 'emailtest@test.com',
        password: 'password'
      });
      expect(response.statusCode).toBe(200);
    });

    test("(POST) =>Should not login if your password is incorrect", async () => {
      const response = await request(app).post('/api/v1/user/authenticate').send({
        email: 'emailtest@test.com',
        password: '00'
      });
      expect(response.statusCode).toBe(401);
    });

    test("(POST) => Should not authenticate with user not exists", async () => {
      const response = await request(app).post('/api/v1/user/authenticate').send({
        email: 'test@test.com',
        password: '00'
      });
      expect(response.statusCode).toBe(404);
    });
  });

  describe("Find All users Route Tests", () => {
    test("(GET) => Should be able to search all users", async () => {
      const response = await request(app).get("/api/v1/user");
      expect(response.statusCode).toBe(200);
    });
  });
});