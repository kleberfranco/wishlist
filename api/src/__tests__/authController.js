const supertest = require('supertest')
const request = supertest('wishlist_api:3000')

describe('authController Test', () => {
    it('authController: create token', async done => {
        const res = await request
            .post('/auth/token')
            .set('Content-Type', 'application/json')
            .send({
                user: 'testes',
                role: 'App',
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('token')
        done()
    })
})
