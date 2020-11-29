const express = require('express');
const router = express.Router();
const Tasks = require('./taskModel');

router.get('/', async (req, res) => {
	try {
		const tasks = await Tasks.getTasks();
		res.status(200).json(tasks);
	} catch (err) {
		res.status(500).json({
			message: 'Unable to retrieve tasks',
			error: err,
		});
	}
});

router.post('/', async (req, res) => {
	const { description, notes, completed, projectId } = req.body;

	if (!description || !projectId) {
		res.status(401).json({
			message: 'Resource must include a desciption and Id',
		});
	} else {
		const newTask = {
			...(description && { description }),
			...(notes && { notes }),
			...(completed && { completed }),
			...(projectId && { projectId }),
		};
		const task = await Tasks.addTask(newTask);
		res.status(201).json({
			message: 'New task created',
			task,
		});
	}
});

module.exports = router;
