const router = require('express').Router();
const Project = require('../data/helpers/projectModel');

router.post('/', validateProject, (req, res) => {
	const { name, description } = req.body;
	Project.insert({ name, description })
		.then(data => {
			Project.get(data.id).then(data => {
				res.status(201).json(data);
			});
		})
		.catch(error => {
			res
				.status(500)
				.json({ message: 'Unable to add project to the database.' });
		});
});

router.get('/', (req, res) => {
	Project.get()
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			res.status(500).json({ message: 'Unable to retrieve projects.' });
		});
});

router.get('/:id', validateProjectId, (req, res) => {
	const id = req.params.id;

	Project.get(id)
		.then(data => {
			res.status(200).json(data);
		})
		.catch(error => {
			res
				.status(500)
				.json({ message: `Unable to retrieve post with id ${id}` });
		});
});

// Project Middleware
async function validateProjectId(req, res, next) {
	const id = req.params.id;

	const project = await Project.get(id);

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
		res.status(400).json({
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
		res.status(400).json({
			message: 'Please provide a description and note for your action.'
		});
	} else {
		next();
	}
}

module.exports = router;
