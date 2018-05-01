const express = require('express');
const router = express.Router();
const models = require('../models/index.js');
let sequelizeConnection = models.sequelize;
sequelizeConnection.sync();

// home page: grabs everything off of the database and displays it on the html with handlebars
// also grabs the guests names when needed, and orders everything by the burgers names
router.get('/', function(req, res) {
	models.burger.findAll({
		include: [{model: models.guest}],
		order: ['burger_name']
	}).then(function(result) {
		console.log(result);
		res.render('index', {
			burger: result
		});
	});
});

// post request that will put the new burgers into the database when they are submitted
router.post('/api/burgers', function(req, res) {
	models.burger.create({
		burger_name:req.body.burger_name,
		devoured: false,
	});
});

// post request that will update the burgers devoured state from false to true
// if there is no guest name the user will alerted from burgers.js and then be redirected to the home page
router.post('/api/burgers/:burgerId/', function(req, res) {
	if (req.body.burgerEater === null || req.body.burgerEater.length === 0) {
		res.redirect('/');	
	} else {
		models.guest.create({
			guest_name: req.body.burgerEater,
			burgerId: req.params.burgerId,
		});
	  	models.burger.update({ 
	  		devoured: true,
	  	}, { where: { id: req.params.burgerId }
	  	}).then(function(result) {
	  		if (result.changedRows === 0) {
	  			return res.status(404).end();
	  		} else {
	  			res.redirect('/dashboard');
	  		}
	  	});
  	}
});

module.exports = router;