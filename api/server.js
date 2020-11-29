const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.status(200).json({ message: '<h1>Hello World</h1>' });
});

const projectsRouter = require('./project/projectsRouter')
server.use('/api/projects', projectsRouter)

const resourcesRouter = require('./resource/resourcesRouter')
server.use('/api/resources', resourcesRouter)

const taskRouter = require('./task/taskRouter')
server.use('/api/tasks', taskRouter)

module.exports = server;
