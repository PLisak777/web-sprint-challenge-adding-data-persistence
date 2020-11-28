const router = require('express').Router();

const { resource } = require('../../server');
const db = require('./model');

router.use('/:id', verifyId);

router.get('/', (req, res) => {
	db.getResources()
		.then((resources) => {
			res.status(200).json(resources);
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Unable to retrieve resources',
				error: err,
			});
		});
});

router.post('/', verifyResourceSchema, (req, res) => {
	db.addResource(req.body)
		.then((resource) => {
			res.status(201).json(resource);
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Unable to add new resource',
				error: err,
			});
		});
});

router.get('/:id', (req, res) => {
	res.status(200).json(req.resource);
});

router.get('/:id/projects', (req, res) => {
	const { id } = req.params;

	db.getProjectsByResource(id).then((projects) => {
		res.status(200).json(projects);
	});
});

function verifyId(req, res, next) {
	const { id } = req.params;

	db.getResourceById(id)
		.then((resource) => {
			req.resource = resource;
			next();
		})
		.catch((err) => {
			res.status(404).json({
				message: 'A resource with that Id does not exist',
				error: err,
			});
		});
}

function verifyResourceSchema(req, res, next) {
	const { name } = req.body;

	if (name) {
		next();
	} else {
		res.status(400).json({
			message: 'Please include a name for your resource',
		});
	}
}

module.exports = router;
