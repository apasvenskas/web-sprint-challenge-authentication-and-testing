const request = require('supertest');
const server = require('./server.js');
// const users = require('./auth/auth-router.js');

const validUser = {username: 'testuser', password: 'testpass'};
const invalidUser = {username: 'wronguser', password: 'wrongpass'};
const incompleteUser = {username: '', password: ''};


// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

describe("Post register test", () => {
  it('should register a new user and return 201 status', async () => {
    const res = await request(server).post('/api/auth/register').send(validUser);
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toHaveProperty('username')
    expect(res.body).toHaveProperty('password')
    })
  it('should log in a valid user and return 200 status, welcome message and token',
   async () => {
    const res = await request(server).post('/api/auth/register').send(incompleteUser)
    expect(res.status).toBe(400)
    expect(res.body).toBe('username and password required')
   })
})

describe('Post login test', () => {
  it('should log in a valid user and return 200 status, welcome message and token', async () => {
    await request(server).post('/register').send(validUser);
    const res = await request(server).post('/api/auth/login').send(validUser);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe(`welcome, ${validUser.username}`);
    expect(res.body).toHaveProperty('token');
  });
  it('should return 401 status and error message if invalid credentials are provided', async () => {
    const res = await request(server).post('/api/auth/login').send(invalidUser);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('invalid credentials');
  });
})
