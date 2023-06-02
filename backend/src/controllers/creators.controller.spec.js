const supertest = require('supertest');
const app = require("../../app.js");
const database = require('../../utils/database');
const logger = require("../../utils/logger");
const assert = require("assert");

const endpoint = "/api/v1/creators";

describe(`GET ${endpoint}`, function () {

    before(async () =>  {
        logger.info("Running before");
        await database(false);
    });

    it('should respond with json', function (done) {
        supertest(app)
            .get(endpoint)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should respond with OK', function (done) {
        supertest(app)
            .get(endpoint)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {

                assert(res.body.code, 200);
                assert(res.body.message, "OK");
                assert(res.body.data, []);

                if (err) return done(err);
                return done();
            });
    });
});