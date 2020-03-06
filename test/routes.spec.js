process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHTTP = require('chai-http');

const server = require('../server');
const knex = require('../db/knex');

chai.use(chaiHTTP);

describe('Client Routes', () => {

  it('should return the homepage with html elements', (done) => {
    chai.request(server)
      .get('/')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.html;
        done();
      });
  });

  it('should return a 404 for a route that doesn\'t exist', (done) => {
    chai.request(server)
      .get('/sad')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });

});

describe('API routes', () => {
  beforeEach(done => {
    knex.migrate.rollback()
      .then(() => {
        knex.migrate.latest()
          .then(() => {
            return knex.seed.run()
              .then(() => {
                done();
              });
          });
      });
  });


  describe('GET /api/v1/chat', () => {
    it('should return all messages', (done) => {
      chai.request(server)
        .get('/api/v1/chat')
        .end((err, response) => {
          const sortedBody = response.body.sort((a, b) => a.id - b.id);

          response.should.have.status(200);
          response.should.be.json;
          sortedBody[0].should.have.property('id');
          sortedBody[0].should.have.property('user');
          sortedBody[0].should.have.property('message')
          sortedBody[0].user.should.equal('Test Bob');
          sortedBody[0].message.should.equal('Hello there.');
          sortedBody[0].id.should.equal(1);
          done();
        });
    });

    it('should return a 404 if directed to a non existent endpoint', (done) => {
      chai.request(server)
        .get('/api/v1/nope')
        .end((error, response) => {

          response.should.have.status(404)
          done()
        });
    });
  });

  describe('POST /api/v1/chat', () => {
    it('should add a new message', (done) => {
      chai.request(server)
        .post('/api/v1/chat')
        .send({
          user: 'New Guy',
          message: 'Hope this works.'
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(3);
          chai.request(server)
            .get('/api/v1/chat')
            .end((err, response) => {
              const sortedBody = response.body.sort((a, b) => a.id - b.id);

              response.should.have.status(200);
              response.should.be.json;
              sortedBody[2].should.have.property('id');
              sortedBody[2].should.have.property('user');
              sortedBody[2].should.have.property('message');
              sortedBody.length.should.equal(3);
              sortedBody[2].user.should.equal('New Guy');
              sortedBody[2].id.should.equal(3);
              done();
            })
        });
    });

    it('should not create a topic record with missing data', (done) => {
      chai.request(server)
        .post('/api/v1/chat')
        .send({ user: 'gonna fail' })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.equal('Expected format: { user: <String>, message: <String> }. You are missing the message property.')
          done()
        });
    });
  });

});
