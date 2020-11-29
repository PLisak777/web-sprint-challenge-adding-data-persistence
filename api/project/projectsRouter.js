const express = require('express')
const router = express.Router()
const Projects = require('./projectsModel')

router.use('/:id', verifyId);

router.get('/', (req, res) => {
	Projects.getProjects()
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Unable to retrieve projects',
				error: err,
			});
		});
});

router.get('/:id', (req, res) => {
	res.status(200).json(req.project);
});

router.get('/:id/tasks', (req, res) => {
	const { id } = req.params;
	Projects.getProjectTasks(id)
		.then((tasks) => {
			res.status(200).json(tasks);
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Unable to retrieve tasks',
				error: err,
			});
		});
});

router.get('/:id/resources', (req, res) => {
	const { id } = req.params;
	Projects.getProjectResources(id)
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

router.post('/', verifyProjectSchema, (req, res) => {
	Projects.addProject(req.body)
		.then((project) => {
			res.status(201).json(project);
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Unable to add project',
				error: err,
			});
		});
});

router.post('/:id/tasks', verifyTaskSchema, (req, res) => {
	Projects.addTaskToProject(req.body)
		.then((task) => {
			res.status(201).json(task);
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Unable to add new task',
				error: err,
			});
		});
});

router.post('/:id/resources', (req, res) => {
	Projects.addResourceToProject(req.project.id, req.body.id)
		.then((id) => {
			res.status(201).json({
				message: `Added ${req.body.name} to ${req.project.name}`,
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Unable to add resource to project',
				error: err,
			});
		});
});

function verifyTaskSchema(req, res, next) {
	const { description } = req.body;
	if (description) {
		req.body.projectId = req.params.id;
		next();
	} else {
		res.status(400).json({
			message: 'Please include a description for your task',
		});
	}
}

function verifyProjectSchema(req, res, next) {
	const { name } = req.body;
	if (name) {
		next();
	} else {
		res.status(400).json({
			message: 'Please include a name for your project',
		});
	}
}

function verifyId(req, res, next) {
	const { id } = req.params;
	Projects.getProjectsById(id).then((project) => {
		if (project) {
			req.project = project;
			next();
		} else {
			res
				.status(404)
				.json({
					message: 'A project with that ID could not be found',
				})
				.catch((err) => {
					res.status(500).json({
						message: 'Unable to retrieve project',
						error: err,
					});
				});
		}
	});
}

module.exports = router;
