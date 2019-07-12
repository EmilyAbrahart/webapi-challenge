const router = require('express').Router();
const Action = require('../data/helpers/actionModel');

router.get('/', (req, res) => {
  Action.get()
  .then(data => {
    res.status(200).json(data);
  })
  .catch(error => {
    res.status(500).json({message: "Unable to retrieve actions."})
  })
})

// Action middleware
async function validateActionId(req, res, next) {
	const id = req.params.id;

	const action = await Action.get(id);

	if (action) {
		next();
	} else {
		res.status(400).json({ message: 'Invalid action ID' });
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
