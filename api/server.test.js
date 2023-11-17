
// const request = require("supertest");
// const server = require("./server");
// const db = require("../data/dbConfig");

// // Define the sample data
// const validUser = {username: 'testuser', password: 'testpass'};
// const invalidUser = {username: 'wronguser', password: 'wrongpass'};
// const incompleteUser = {username: '', password: ''};

// test('sanity', () => {
//   expect(true).toBe(true)
// })

// describe("POST /register", () => {
//   beforeEach(async () => {
//     await db("users").truncate();
//   });

//   afterAll(async () => {
//     await db.destroy();
//   });

//   // Test the positive case
//   it("should return 201 and the new user when registering with valid credentials", async () => {
//     const res = await request (server).post("/api/auth/register").send(validUser);
//     expect(res.status).toBe(201);
//     expect(res.body).toHaveProperty("id");
//     expect(res.body).toHaveProperty("username");
//     expect(res.body.username).toBe(validUser.username);
//   });

// it("should return 400 and an error message when registering with incomplete or invalid credentials", async () => {
//   // Test with incomplete credentials
//   let res = await request (server).post("/api/auth/register").send(incompleteUser);
//   expect(res.status).toBe(400);
//   expect(res.body).toHaveProperty("message");
//   expect(res.body.message).toBe("username and password required");

//   // Test with invalid credentials
//   await request (server).post("/api/auth/register").send(validUser); // Register a valid user first

//   const conflictUser = {username: validUser.username, password: 'anotherpass'}; // Create a new user with the same username but different password
//   res = await request (server).post("/api/auth/register").send(conflictUser); // Try to register the new user
//   expect(res.status).toBe(400);
//   expect(res.body).toHaveProperty("message");
//   expect(res.body.message).toBe("username taken");
// });
// });

// // Write a test suite for the login endpoint
// describe("POST /login", () => {
//   // Register a valid user before each test
//   beforeEach(async () => {
//     await request (server).post("/api/auth/register").send(validUser);
//   });

//   // Test the positive case
//   it("should return 200 and a welcome message and a token when logging in with valid credentials", async () => {
//     const res = await request (server).post("/api/auth/login").send(validUser);
//     expect(res.status).toBe(200);
//     expect(res.body).toHaveProperty("message");
//     expect(res.body.message).toBe(`welcome, ${validUser.username}`);
//     expect(res.body).toHaveProperty("token");
//   });

//   // Test the negative case
//   it("should return 401 and an error message when logging in with invalid credentials", async () => {
//     // Test with wrong password
//     let res = await request (server).post("/api/auth/login").send({username: validUser.username, password: invalidUser.password});
//     expect(res.status).toBe(401);
//     expect(res.body).toHaveProperty("message");
//     expect(res.body.message).toBe("invalid credentials");

//     // Test with wrong username
//     res = await request (server).post("/api/auth/login").send(invalidUser);
//     expect(res.status).toBe(401);
//     expect(res.body).toHaveProperty("message");
//     expect(res.body.message).toBe("invalid credentials");
//   });
// });


