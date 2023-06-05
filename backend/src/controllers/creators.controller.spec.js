const app = require("../../app.js");
const database = require('../../utils/database');
const request = require('supertest');
const expect = require('chai').expect;
const logger = require("../../utils/logger");

describe("Restful Creators API Tests", () => {

    const endpoint = "/api/v1/creators/";
    const creator01 = { name: "Test Creator 01 Name", imagePath: "Test Creator 01 ImagePath", link: "Test Creator 01 Link" };
    const creator02 = { name: "Test Creator 02 Name" };
    const creator01Update = { name: "Test Creator 01 NewName" };
    var creator01Id;
    var creator02Id;

    // setup database
    before(async () =>  {
        logger.info("Running before");
        await database(false);
    });

    it('should not create a new creator without a name', function (done) {
        request(app)
            .post(endpoint)
            .send({})
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).to.be.equal(400);
                expect(res.body.code).to.be.equal(400);
                expect(res.body.message).to.be.equal("Creator name is required");

                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('should successfully create a new creator', function (done) {
        request(app)
            .post(endpoint)
            .send(creator01)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err,res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.code).to.be.equal(200);
                expect(res.body.message).to.be.equal("OK");
                expect(res.body.data.id).not.to.be.null;
                expect(res.body.data.name).to.be.equal(creator01.name);
                creator01Id = res.body.data.id;

                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('should successfully create the second creator', function (done) {
        request(app)
            .post(endpoint)
            .send(creator02)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err,res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.code).to.be.equal(200);
                expect(res.body.message).to.be.equal("OK");
                expect(res.body.data.id).not.to.be.null;
                expect(res.body.data.name).to.be.equal(creator02.name);
                creator02Id = res.body.data.id;

                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('should fetch the creator of the provided id', function (done) {
        request(app)
            .get(endpoint + creator01Id)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.code).to.be.equal(200);
                expect(res.body.message).to.be.equal("OK");
                expect(res.body.data.id).not.to.be.null;
                expect(res.body.data.name).to.be.equal(creator01.name);

                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('should fetch all creators', function (done) {
        request(app)
            .get(endpoint)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.code).to.be.equal(200);
                expect(res.body.message).to.be.equal("OK");
                expect(res.body.data).not.to.be.null;
                expect(res.body.data).to.have.lengthOf(2)

                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('should not update the creator without a name', function (done) {
        request(app)
            .put(endpoint + creator01Id)
            .send({})
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).to.be.equal(400);
                expect(res.body.code).to.be.equal(400);
                expect(res.body.message).to.be.equal("Creator name is required");

                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('should update the name of the creator', function (done) {
        request(app)
            .put(endpoint + creator01Id)
            .send(creator01Update)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.code).to.be.equal(200);
                expect(res.body.message).to.be.equal("OK");
                expect(res.body.data.id).not.to.be.null;
                expect(res.body.data.name).to.be.equal(creator01Update.name);

                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('should not update a non-existing creator', function (done) {
        request(app)
            .put(endpoint + "Test12345")
            .send(creator01Update)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).to.be.equal(400);
                expect(res.body.code).to.be.equal(400);
                expect(res.body.message).to.be.equal("Creator not found");

                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('should delete the creator', function (done) {
        request(app)
            .delete(endpoint + creator01Id)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.code).to.be.equal(200);
                expect(res.body.message).to.be.equal("OK");
                expect(res.body.data).to.be.undefined;

                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('should not be able to delete a non-existing creator', function (done) {
        request(app)
            .delete(endpoint + creator01Id)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).to.be.equal(400);
                expect(res.body.code).to.be.equal(400);
                expect(res.body.message).to.be.equal("Creator does not exist");
                expect(res.body.data).to.be.undefined;

                if (err) {
                    throw err;
                }
                done();
            });
    });

    it('should not a creator anymore', function (done) {
        request(app)
            .get(endpoint + creator01Id)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .end(function (err, res) {
                expect(res.statusCode).to.be.equal(400);
                expect(res.body.code).to.be.equal(400);
                expect(res.body.message).to.be.equal("Creator not found");
                expect(res.body.data).to.be.undefined;

                if (err) {
                    throw err;
                }
                done();
            });
    });
});