const server = require('./server');

const PORT = process.env.PORT || 5000;

server.use('/api/projects', require('./projects/projectsRouter'));
server.use('/api/resources', require('./resources/resourceRouter'));

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
