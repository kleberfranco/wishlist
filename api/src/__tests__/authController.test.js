const server = require('../app')
const supertest = require('supertest')
const serverapp = new server()
const app = serverapp.server
const request = supertest(app)

describe('Post Endpoints', () => {
    it('should create a new post', async done => {
        const res = await request
            .post('/auth/token')
            .set('Content-Type', 'application/json')
            .send({
                user: 'testes',
                role: 'app',
            })
        // expect(res.statusCode).toEqual(200)
        // expect(res.body).toHaveProperty('post')
        done()
    })
})

// it('Gets the test endpoint', async done => {
//     // Sends GET Request to /test endpoint
//     const res = await request.get('/customers')
//
//     // ...
//     done()
// })