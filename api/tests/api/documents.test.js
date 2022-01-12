const request = require('supertest');

const toBeType = require('jest-tobetype');
expect.extend(toBeType);

describe('Document API', () => {
  const server = request('http://localhost:5050');

  it('get all api', (done) => {
    server.get('/dev/documents')
      .expect(200)
      .end((error, result) => {
        const { body } = result;
        expect(body).toBeType('array');

        return done();
      });
   });

   it('get by id', (done) => {
    server.get('/dev/documents/1')
      .expect(200)
      .end((error, result) => {
        const { body } = result;
        expect(body).toBeType('array');

        return done();
      });
   })
});
