'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');

	app.route('/').get(function(req, res) {
		res.redirect('/master/console/');
	});

	app.route('/master/console')
		.get(function(req, res) {
			res.render('index', {
				user: req.user || null,
				request: req
			});
		});

	app.route('/sucursales/:sucursal/agencias/:agencia/console')
		.get(function(req, res) {
			res.render('index', {
				user: req.user || null,
				request: req
			});
		});
};
