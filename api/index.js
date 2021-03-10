const server = require('./src/app')
const app = new server()

app.server.listen(process.env.PORT, () => console.log("running on port: " + process.env.PORT + " - " + process.env.NODE_ENV))
