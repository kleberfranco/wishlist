const Server = require('./src/app');
const app = new Server();

app.server.listen(process.env.PORT, () => console.log(
    'running on port: ' + process.env.PORT + ' - ' + process.env.NODE_ENV));
