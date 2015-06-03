'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mean';
	var applicationModuleVendorDependencies = [
		'angularFileUpload',
		'ngAnimate',
		'ng-autofocus',
		'ngMessages',
		'ngSanitize',
		'restangular',
		'sg-cooperativa',
		'sg-iso3166',
		'sg-iso4217',
		'sg-persona',
		'sg-producto',
		'sg-rrhh',
		'sg-socio',
		'sg-ubigeo',
		'sg-utils',
		'toastr',
		'ui.bootstrap',
		'ui.grid',
		'ui.grid.edit',
		'ui.grid.selection',
		'ui.router',
		'ui.select',
		'ui.select.utils',
		'ui.utils',
		'ui.utils.masks',
		'xeditable'
	];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
