const supertest = require('supertest');
const request = supertest('wishlist_api:3000');

let token;
let customerId;
const emailCustomer = 'teste_' + Math.random() + '@testes.com.br';

beforeAll((done) => {
  request.post('/auth/token').set('Content-Type', 'application/json').send({
    user: 'testes',
    role: 'App',
  }).expect(200).end((err, response) => {
    token = response.body.token; // save the token!
    done();
  });
});

describe('customerController Test', () => {
  it('customerController: list all customers (without register)',
      function(done) {
        request.get('/customers').
            set('Content-Type', 'application/json').
            set('Authorization', `Bearer ${token}`).
            expect(200).
            end(function(err, res) {
              if (err) return done(err);
              done();
            });
      });

  it('customerController: should require authorization (create new customer)',
      function(done) {
        request.post('/customer').
            set('Content-Type', 'application/json').
            expect(401).
            end(function(err, res) {
              if (err) return done(err);
              done();
            });
      });

  it('customerController: should require valid fields (create new customer)',
      function(done) {
        request.post('/customer').
            set('Authorization', `Bearer ${token}`).
            set('Content-Type', 'application/json').
            send({
              name: 'testes',
            }).
            expect(422).
            end(function(err, res) {
              if (err) return done(err);
              done();
            });
      });

  it('customerController: should require valid email (create new customer)',
      function(done) {
        request.post('/customer').
            set('Authorization', `Bearer ${token}`).
            set('Content-Type', 'application/json').
            send({
              name: 'testes',
              email: 'teste',
            }).
            expect(422).
            end(function(err, res) {
              if (err) return done(err);
              done();
            });
      });

  it('customerController: create new customer', function(done) {
    request.post('/customer').
        set('Authorization', `Bearer ${token}`).
        set('Content-Type', 'application/json').
        send({
          name: 'testes',
          email: emailCustomer,
        }).
        expect(201).
        end(function(err, res) {
          if (err) return done(err);
          done();
        });
  });

  it('customerController: Email already (create new customer)', function(done) {
    request.post('/customer').
        set('Authorization', `Bearer ${token}`).
        set('Content-Type', 'application/json').
        send({
          name: 'testes',
          email: emailCustomer,
        }).
        expect(422).
        end(function(err, res) {
          if (err) return done(err);
          done();
        });
  });

  it('customerController: should require authorization (list all customers)',
      function(done) {
        request.get('/customers').
            set('Content-Type', 'application/json').
            expect(401).
            end(function(err, res) {
              if (err) return done(err);
              done();
            });
      });

  it('customerController: list all customers', function(done) {
    request.get('/customers').
        set('Content-Type', 'application/json').
        set('Authorization', `Bearer ${token}`).
        expect(200).
        end(function(err, res) {
          if (err) return done(err);
          done();
        });
  });

  it('customerController: list all customers (limit and page)', function(done) {
    request.get('/customers?page=1&limit=1').
        set('Content-Type', 'application/json').
        set('Authorization', `Bearer ${token}`).
        expect(200).
        end(function(err, res) {
          expect(res.body).toHaveProperty('customers');
          const customers = res.body.customers;
          customerId = customers[0]['id'];
          if (err) return done(err);
          done();
        });
  });

  it('customerController: should require authorization (update customer)',
      function(done) {
        request.put('/customer/' + customerId).
            set('Content-Type', 'application/json').
            expect(401).
            end(function(err, res) {
              if (err) return done(err);
              done();
            });
      });

  it('customerController: should require valid fields (update customer)',
      function(done) {
        request.put('/customer/' + customerId).
            set('Authorization', `Bearer ${token}`).
            set('Content-Type', 'application/json').
            send({}).
            expect(422).
            end(function(err, res) {
              if (err) return done(err);
              done();
            });
      });

  it('customerController: should require valid email (update customer)',
      function(done) {
        request.put('/customer/' + customerId).
            set('Authorization', `Bearer ${token}`).
            set('Content-Type', 'application/json').
            send({
              name: 'testes',
              email: 'teste',
            }).
            expect(422).
            end(function(err, res) {
              if (err) return done(err);
              done();
            });
      });

  it('customerController: update customer', function(done) {
    request.put('/customer/' + customerId).
        set('Authorization', `Bearer ${token}`).
        set('Content-Type', 'application/json').
        send({
          name: 'testes',
          email: 'teste_' + Math.random() + '@testes.com.br',
          active: '1',
        }).
        expect(204).
        end(function(err, res) {
          if (err) return done(err);
          done();
        });
  });

  it('customerController: should require authorization (get customer)',
      function(done) {
        request.get('/customer/' + customerId).
            set('Content-Type', 'application/json').
            expect(401).
            end(function(err, res) {
              if (err) return done(err);
              done();
            });
      });

  it('customerController: get customer', function(done) {
    request.get('/customer/' + customerId).
        set('Authorization', `Bearer ${token}`).
        set('Content-Type', 'application/json').
        expect(200).
        end(function(err, res) {
          if (err) return done(err);
          done();
        });
  });

  it('customerController: get customer (not found)', function(done) {
    request.get('/customer/999999999999999999999').
        set('Authorization', `Bearer ${token}`).
        set('Content-Type', 'application/json').
        expect(404).
        end(function(err, res) {
          if (err) return done(err);
          done();
        });
  });

  it('customerController: should require authorization (delete customer)',
      function(done) {
        request.delete('/customer/' + customerId).
            set('Content-Type', 'application/json').
            expect(401).
            end(function(err, res) {
              if (err) return done(err);
              done();
            });
      });

  it('customerController: delete customer', function(done) {
    request.delete('/customer/' + customerId).
        set('Authorization', `Bearer ${token}`).
        set('Content-Type', 'application/json').
        expect(204).
        end(function(err, res) {
          if (err) return done(err);
          done();
        });
  });
});
