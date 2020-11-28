const server = require('./api/server');

const PORT = process.env.PORT || 5000;

server.use('/api/projects', require('./api/project/projectsRouter'));
server.use('/api/resources', require('./api/resource/resourcesRouter'));

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
