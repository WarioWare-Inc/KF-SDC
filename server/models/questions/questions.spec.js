const request = require('supertest');
const server = require('../../index.js');

describe('Q & A Tests', () => {
  test('GET /qa/questions', async (done) => {
    request(server)
      .get('/qa/questions')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  })

  afterAll((done) => {
    server.close();
    done();
  });
});