'use strict';

module.exports = {
	app: {
		title: 'MEAN.JS',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'mongodb, express, angularjs, node.js, mongoose, passport'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	// The secret should be set to a non-guessable string that
	// is used to compute a session hash
	sessionSecret: 'MEAN',
	// The name of the MongoDB collection to store sessions in
	sessionCollection: 'sessions',
	// The session cookie settings
	sessionCookie: {
		path: '/',
		httpOnly: true,
		// If secure is set to true then it will cause the cookie to be set
		// only when SSL-enabled (HTTPS) is used, and otherwise it won't
		// set a cookie. 'true' is recommended yet it requires the above
		// mentioned pre-requisite.
		secure: false,
		// Only set the maxAge to null if the cookie shouldn't be expired
		// at all. The cookie will expunge when the browser is closed.
		maxAge: null,
		// To set the cookie in a specific domain uncomment the following
		// setting:
		// domain: 'yourdomain.com'
	},
	// The session cookie name
	sessionName: 'connect.sid',
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			stream: 'access.log'
		}
	},
	assets: {
		lib: {
			css: [
				//'public/lib/bootstrap/dist/css/bootstrap.css',
				//'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/angular-toastr/dist/angular-toastr.css',
				'public/lib/angular-ui-grid/ui-grid.css',
				'public/lib/angular-ui-select/dist/select.css',
				'public/lib/angular-xeditable/dist/css/xeditable.css',
				//'public/lib/openshift/dist/css/main.css',
				'public/lib/patternfly/dist/css/patternfly.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-file-upload/angular-file-upload.js',
				'public/lib/angular-input-masks/angular-input-masks.js',
				'public/lib/angular-messages/angular-messages.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-toastr/dist/angular-toastr.tpls.js',
				'public/lib/angular-ui-grid/ui-grid.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-select/dist/select.js',
				'public/lib/angular-ui-select-utils/dist/select.utils.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-xeditable/dist/js/xeditable.js',
				'public/lib/ng-autofocus/dist/ng-autofocus.js',
				'public/lib/restangular/dist/restangular.js',
				'public/lib/sg-cooperativa/dist/sg-cooperativa.js',
				'public/lib/sg-iso3166/dist/sg-iso3166.js',
				'public/lib/sg-iso4217/dist/sg-iso4217.js',
				'public/lib/sg-persona/dist/sg-persona.js',
				'public/lib/sg-producto/dist/sg-producto.js',
				'public/lib/sg-rrhh/dist/sg-rrhh.js',
				'public/lib/sg-socio/dist/sg-socio.js',
				'public/lib/sg-ubigeo/dist/sg-ubigeo.js',
				'public/lib/sg-utils/dist/sg-utils.js',
				'public/lib/underscore/underscore.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
