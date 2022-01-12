const request = require('supertest');
const { createConn } = require('../../db')

const toBeType = require('jest-tobetype');
expect.extend(toBeType);

const COLLECTION_NAME = 'documents'

describe('Document API', () => {
  const server = request('http://localhost:5055');
  const sampleData = [
    {
      number: 1,
      age: 18,
    },
    {
      number: 2,
      age: 20
    }
  ]

  afterEach(async () => {
    const db = await createConn();
    await db.collection(COLLECTION_NAME).deleteMany({});
  });

  it('create api', (done) => {
    const payload = {
      documents: sampleData
    }
    server.post('/test/documents')
      .send({})
      .expect(200)
      .send(payload)
      .end(async (error, result) => {
        const { body } = result;
        expect(body.success).toBe(true);

        const db = await createConn();

        for (const doc of payload.documents) {
          const insertedRecord = await db.collection(COLLECTION_NAME).findOne({
            number: doc.number,
            age: doc.age
          });

          expect(insertedRecord).not.toBe(undefined)
        }

        return done();
      });
  });

  describe('existing records context', () => {
    beforeEach(async () => {
      const db = await createConn();
      await db.collection(COLLECTION_NAME).insertMany(sampleData)
    });

    describe('get all api', () => {
      it('return all documents', (done) => {
        server.get('/test/documents')
          .expect(200)
          .end((error, result) => {
            const { body } = result;

            expect(body.success).toBe(true);
            expect(body.data).toBeType('array');
            expect(body.data.length).toBe(sampleData.length);

            return done();
          });
      });
    });

    describe('update api', () => {
      let firstRecord;

      beforeEach(async () => {
        const db = await createConn();
        const allRecords = await db.collection(COLLECTION_NAME).find({}).toArray();
        firstRecord = allRecords[0]
      })

      it('update the documents', (done) => {
        server.put(`/test/documents/${firstRecord._id}`)
          .expect(200)
          .send({ age: 50 })
          .end(async (error, result) => {
            const { body } = result;

            expect(body.success).toBe(true);

            const db = await createConn();
            const updatedRecord = await db.collection(COLLECTION_NAME).findOne({ _id: firstRecord._id });

            expect(updatedRecord.age).toBe(50)

            return done();
          });
      });
    });

    describe('delete api', () => {
      let firstRecord;

      beforeEach(async () => {
        const db = await createConn();
        const allRecords = await db.collection(COLLECTION_NAME).find({}).toArray();
        firstRecord = allRecords[0]
      })

      it('delete the document', (done) => {
        server.delete(`/test/documents/${firstRecord._id}`)
          .expect(200)
          .end(async (error, result) => {
            const { body } = result;

            expect(body.success).toBe(true);

            const db = await createConn();
            const deletedRecord = await db.collection(COLLECTION_NAME).findOne({ _id: firstRecord._id });

            expect(deletedRecord).toBe(null)

            return done();
          });
      });
    });

    describe('delete all api', () => {
      it('delete all documents', (done) => {
        server.delete('/test/documents')
          .expect(200)
          .end(async (error, result) => {
            const { body } = result;

            expect(body.success).toBe(true);

            const db = await createConn();
            const deletedRecords = await db.collection(COLLECTION_NAME).find({}).toArray();

            expect(deletedRecords.length).toBe(0)

            return done();
          });
      });
    });

  });

});
