'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

window.auth = {};
window.auth.sistcoop = {};

window.realm;

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	//angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);

	var consoleIndex = window.location.href.indexOf('/console');
	if (consoleIndex == -1) {
		alert('Invalid url.');
		return;
	}

	var consoleBaseUrl = window.location.href;
	consoleBaseUrl = consoleBaseUrl.substring(0, consoleBaseUrl.indexOf('/console'));

	window.realm = consoleBaseUrl.split('/')[3];
	var sucursal;
	var agencia;
	var keycloak;
	if(realm === 'master') {
		sucursal = realm;
		agencia = realm;
		keycloak = new Keycloak({
			url: 'http://192.168.1.50:8080/auth',
			realm: 'sistcoop-master',
			clientId: 'sistcoop'
		});

		window.realm = 'sistcoop-master';

	} else if(realm === 'sucursales'){
		sucursal = consoleBaseUrl.split('/')[4];
		agencia = consoleBaseUrl.split('/')[6];
		keycloak = new Keycloak({
			url: 'http://192.168.1.50:8080/auth',
			realm: 'sistcoop-default',
			clientId: 'sistcoop'
		});

		window.realm = 'sistcoop-default';

	} else {
		alert('Invalid realm.');
		return;
	}

	keycloak.init({onLoad: 'login-required'}).success(function () {

		var sistcoop = new Sistcoop({
			url: 'http://localhost:8080/rrhh',
			username: keycloak.idTokenParsed.preferred_username,
			sucursal: sucursal,
			agencia: agencia,
			token: keycloak.token
		});

		sistcoop.init({onLoad: 'login-required'}).success(function () {
			window.auth.authz = keycloak;
			window.auth.sistcoop = sistcoop;
			angular.module('mean').factory('Auth', function () {
				return auth;
			});
			angular.module('mean').constant('REALM', window.realm);

			//Then init the app
			angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);

		}).error(function () {
			alert('No se pudo verificar el origen de sucursal y agencia para el usuario');
		});
	}).error(function () {
		window.location.reload();
	});

});
