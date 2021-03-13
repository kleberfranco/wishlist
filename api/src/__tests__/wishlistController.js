const supertest = require('supertest')
const request = supertest('wishlist_api:3000')
const productService = require('../service/productService')

let token;
let customerId;
let productId;
let wishlistId;
beforeAll( (done) => {
    request
        .post('/auth/token')
        .set('Content-Type', 'application/json')
        .send({
            user: 'testes',
            role: 'App',
        })
        .expect(200)
        .end((err, response) => {
            token = response.body.token; // save the token!

            request
                .post('/customer')
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    name: 'testes',
                    email: 'teste@testes.com.br',
                })
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    request
                        .get('/customers?page=1&limit=1')
                        .set('Content-Type', 'application/json')
                        .set('Authorization', `Bearer ${token}`)
                        .expect(200)
                        .end((err, res) => {
                            expect(res.body).toHaveProperty('customers')
                            const customers = res.body.customers
                            customerId = customers[0]['id']
                            if (err) return done(err);
                            done();
                        });
                    done();
                });
            done();
        });
});

test('find Products', async () => {
    const products = await productService.findAll(1);
    expect(products).toHaveProperty('products')
    productId = products.products[0].id
});

describe('wishlistController Test', () => {
    it('wishlistController: list all wishlists (without register)', function(done) {
        request
            .get('/wishlists')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('wishlistController: should require authorization (create new wishlist)', function (done) {
        request
            .post('/customer/' + customerId + '/wishlist')
            .set('Content-Type', 'application/json')
            .expect(401)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('wishlistController: should require valid fields (create new wishlist)', function(done) {
        request
            .post('/customer/' + customerId + '/wishlist')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .send({})
            .expect(403)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('wishlistController: should require valid product (create new wishlist)', function(done) {
        request
            .post('/customer/' + customerId + '/wishlist')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .send({
                products: ['1ss']
            })
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('wishlistController: should require valid customer (create new wishlist)', function(done) {
        request
            .post('/customer/9999999999999/wishlist')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .send({
                products: ['1ss']
            })
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('wishlistController: create new wishlist', function(done) {
        request
            .post('/customer/' + customerId + '/wishlist')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .send({
                products: [productId]
            })
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });


    it('wishlistController: should require authorization (list all wishlists)', function(done) {
        request
            .get('/wishlists')
            .set('Content-Type', 'application/json')
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('wishlistController: list all wishlists', function(done) {
        request
            .get('/wishlists')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('wishlistController: list all wishlists (limit and page)', function(done) {
        request
            .get('/wishlists?page=1&limit=1')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end(function(err, res) {
                expect(res.body).toHaveProperty('wishlists')
                const wishlists = res.body.wishlists
                wishlistId = wishlists[0]['id']
                if (err) return done(err);
                done();
            });
    });


    it('wishlistController: should require authorization (get wishlist)', function(done) {
        request
            .get('/wishlist/' + wishlistId)
            .set('Content-Type', 'application/json')
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('wishlistController: get wishlist', function (done) {
        request
            .get('/wishlist/' + wishlistId)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('wishlistController: get wishlist (not found)', function (done) {
        request
            .get('/wishlist/999999999999999999999')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('wishlistController: should require authorization (delete wishlist)', function(done) {
        request
            .delete('/customer/' + customerId)
            .set('Content-Type', 'application/json')
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

    it('customerController: delete customer', function (done) {
        request
            .delete('/customer/' + customerId)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .expect(204)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });

})
