const supertest = require('supertest')
const request = supertest('wishlist_api:3000')

let token;
beforeAll((done) => {
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
            done();
        });
});


describe('customerController Test', () => {
    it('should require authorization', function(done) {
        request
            .get('/customers')
            .set('Content-Type', 'application/json')
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });


    it('should require authorization', function(done) {
        request
            .get('/customers')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
    });
})
