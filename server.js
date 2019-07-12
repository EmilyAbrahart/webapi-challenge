const express = require('express');
const projectRouter = require('./projects/projectRouter');
const actionRouter = require('./actions/actionRouter');

const server = express();
server.use(express.json());


server.get('/', (req, res) => {
  res.send(`<h2>Web API Challenge</h2>`);
});

// Logging middleware
function logger(req, res, next) {
	const loggedData = {
		method: req.method,
    url: req.url,
    body: req.body || '',
    id: req.params.id || '',
		timestamp: new Date()
	};
	console.log(loggedData);
	next();
}

module.exports = server;