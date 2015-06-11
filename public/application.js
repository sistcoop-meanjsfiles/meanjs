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

window.realm = {};

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

	window.realm.name = consoleBaseUrl.split('/')[3];
	var sucursal;
	var agencia;
	var keycloak;
	if(realm.name === 'master') {
		sucursal = realm.name;
		agencia = realm.name;
	} else if(realm === 'sucursales'){
		sucursal = consoleBaseUrl.split('/')[4];
		agencia = consoleBaseUrl.split('/')[6];
	} else {
		alert('Invalid realm.');
		return;
	}

	keycloak = new Keycloak({
		url: 'http://192.168.1.50:8080/auth',
		realm: 'sistcoop',
		clientId: 'sistcoop'
	});

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

			window.realm.name = keycloak.realm;
			window.realm.authServerUrl = keycloak.authServerUrl;
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



angular.module('mean').controller('KeycloakController',
	function ($scope, Auth) {

		$scope.logout = function(){
			Auth.authz.logout();
		};
		$scope.accountManagement = function(){
			Auth.authz.accountManagement();
		};

		$scope.user = {
			username: Auth.authz.idTokenParsed.preferred_username,
			roles: []
		};

		$scope.loadRoles = function () {
			var realmRoles = Auth.authz.realmAccess.roles;
			for (var i = 0; i < realmRoles.length; i++) {
				$scope.user.roles.push(realmRoles[i]);
			}
		};
		$scope.loadRoles();

	}
);

var resourceRequests = 0;
var loadingTimer = -1;

angular.module('mean').factory('authInterceptor', function ($q, Auth) {
	return {
		request: function (config) {
			if (!config.url.match(/.html$/)) {
				var deferred = $q.defer();
				if (Auth.authz.token) {
					Auth.authz.updateToken(5).success(function () {
						config.headers = config.headers || {};
						config.headers.Authorization = 'Bearer ' + Auth.authz.token;

						deferred.resolve(config);
					}).error(function () {
						location.reload();
					});
				}
				return deferred.promise;
			} else {
				return config;
			}
		}
	};
});

angular.module('mean').factory('spinnerInterceptor', function ($q, $window, $rootScope, $location) {
	return function (promise) {
		return promise.then(function (response) {
			resourceRequests--;
			if (resourceRequests == 0) {
				if (loadingTimer != -1) {
					window.clearTimeout(loadingTimer);
					loadingTimer = -1;
				}
				$('#loading').hide();
			}
			return response;
		}, function (response) {
			resourceRequests--;
			if (resourceRequests == 0) {
				if (loadingTimer != -1) {
					window.clearTimeout(loadingTimer);
					loadingTimer = -1;
				}
				$('#loading').hide();
			}

			return $q.reject(response);
		});
	};
});

angular.module('mean').factory('errorInterceptor', function ($q, $window, $rootScope, $location, Auth) {
	return function (promise) {
		return promise.then(function (response) {
			return response;
		}, function (response) {
			if (response.status == 401) {
				Auth.authz.logout();
			} else if (response.status == 403) {
				$location.path('/forbidden');
			} else if (response.status == 404) {
				$location.path('/notfound');
			} else if (response.status) {
				if (response.data && response.data.errorMessage) {
					alert(response.data.errorMessage);
				} else {
					alert.error("An unexpected server error has occurred");
				}
			}
			return $q.reject(response);
		});
	};
});

angular.module('mean').config(function ($httpProvider) {
	$httpProvider.interceptors.push('errorInterceptor');

	var spinnerFunction = function (data, headersGetter) {
		if (resourceRequests == 0) {
			loadingTimer = window.setTimeout(function () {
				//$('#loading').show();
				loadingTimer = -1;
			}, 500);
		}
		resourceRequests++;
		return data;
	};
	$httpProvider.defaults.transformRequest.push(spinnerFunction);

	$httpProvider.interceptors.push('spinnerInterceptor');
	$httpProvider.interceptors.push('authInterceptor');

});
