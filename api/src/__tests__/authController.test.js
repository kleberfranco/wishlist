const server = require('../app')
const supertest = require('supertest')
const app = new server()
const request = supertest(app)

describe('Post Endpoints', () => {
    it('should create a new post', async () => {
        const res = await request()
            .post('/auth/token')
            .send({
                uesr: 'testes',
                role: 'app',
            })
        // expect(res.statusCode).toEqual(201)
        // expect(res.body).toHaveProperty('post')
        done()
    })
})