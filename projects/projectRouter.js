const router = require('express').Router();
const Project = require('../data/helpers/projectModel');



// Project Middleware
async function validateProjectId(req, res, next) {
	const id = req.params.id;

	const project = await Project.getById(id);

	if (project) {
		next();
	} else {
		res.status(400).json({ message: 'Invalid project ID' });
	}
}

function validateProject(req, res, next) {
	if (Object.keys(req.body) == 0) {
		res.status(400).json({ message: 'Missing project data' });
	} else if (!req.body.name || !req.body.description) {
		res
			.status(400)
			.json({
				message: 'Please provide a name and description for your project.'
			});
	} else {
		next();
	}
}

function validateAction(req, res, next) {
	if (Object.keys(req.body) == 0) {
		res.status(400).json({ message: 'Missing action data' });
	} else if (!req.body.description || !req.body.notes) {
		res
			.status(400)
			.json({
				message: 'Please provide a description and note for your action.'
			});
	} else {
		next();
	}
}

module.exports = router;
