const knex = require('knex')
const config = require('../../knexfile')
const db = knex(config.development)

function getResources() {
	return db('resources');
}

function getResourceById(id) {
	return db('resources').where({ id }).first();
}

async function addResource(resource) {
	const [id] = await db('resources').insert(resource);

	return getResourceById(id);
}

function getProjectsByResource(resourceId) {
	return db('projects_resrouces as ref')
		.join('projects as p', 'ref.projectId', 'p.id')
		.where({ 'ref.resourceId': resourceId })
		.select('p.*')
		.then((res) => {
			console.log(res);
			return res;
		});
}

module.exports = {
	getResources,
	addResource,
	getResourceById,
	getProjectsByResource,
};
