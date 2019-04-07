//create HTTP server
const http = require('http');
const app  = require('./app');
//allow port to be set to a environment port otherwise port = 4000
const port = process.env.PORT || 4000;
//create our server and have it listen at the assigned port
const server = http.createServer(app);
server.listen(port);
