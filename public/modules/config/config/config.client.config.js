'use strict';

// Configuring the application
angular.module('config').run(['$rootScope', '$state', '$stateParams',
		function ($rootScope,   $state,   $stateParams) {
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
		}
	]
);

angular.module('config').config(function ($provide, sgKeycloakProvider) {
	sgKeycloakProvider.restUrl = 'http://localhost:8080/auth/admin/realms/sistcoop-default';
});

angular.module('config').config(function (sgIso3166Provider) {
	sgIso3166Provider.restUrl = 'http://localhost:8080/iso3166/rest';
});

angular.module('config').config(function (sgIso4217Provider) {
	sgIso4217Provider.restUrl = 'http://localhost:8080/iso4217/rest';
});

angular.module('config').config(function (sgUbigeoProvider) {
	sgUbigeoProvider.restUrl = 'http://localhost:8080/ubigeo/rest';
});

angular.module('config').config(function (sgProductoProvider) {
	sgProductoProvider.restUrl = 'http://localhost:8080/producto/rest';
});

angular.module('config').config(function (sgPersonaProvider) {
	sgPersonaProvider.restUrl = 'http://localhost:8080/persona/rest';
});

angular.module('config').config(function (sgRrhhProvider) {
	sgRrhhProvider.restUrl = 'http://localhost:8080/rrhh/rest';
});

angular.module('config').config(function (sgCooperativaProvider) {
	sgCooperativaProvider.restUrl = 'http://localhost:8080/cooperativa/rest';
});

angular.module('config').run(function (editableOptions, editableThemes) {
	editableThemes.bs3.inputClass = 'input-sm form-control';
	editableThemes.bs3.buttonsClass = 'btn-sm';
	editableOptions.theme = 'bs3';
});

angular.module('config').run(function ($q, $rootScope, Restangular, toastr) {

	//controllar el spiner del ladda button
	$rootScope.control = {
		block: false
	};

	//activa/desactiva el control en loader
	Restangular.addFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {
		if (operation === 'post' || operation === 'put') {
			$rootScope.control.block = true;
		}
	});
	Restangular.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
		if (operation === 'post' || operation === 'put') {
			$rootScope.control.block = false;
		}
		return data;
	});

	//no permite que objeto con estado false puedan hacer transacciones
	Restangular.addFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {
		if (operation === 'post' || operation === 'put') {
			if (angular.isDefined(element.estado) && element.estado === false) {
				var defer = $q.defer();
				defer.resolve('Objeto inactivo, no se puede actualizar.');
				httpConfig.timeout = defer.promise;
				return {
					element: element,
					headers: headers,
					params: params,
					httpConfig: httpConfig
				};
			}
		}
	});

	Restangular.setErrorInterceptor(function (response, deferred, responseHandler) {
		if (response.config.method === 'POST' || response.config.method === 'PUT') {
			$rootScope.control.block = false;
		}

		if (response.status === 0) {
			if (response.config.timeout) {
				toastr.error(response.config.timeout.$$state.value);
			} else {
				toastr.error('No se pudo realizar la conexion al sistema, verifique que la base de datos este funcionando.');
			}
			return false; // error handled
		}
		if (response.status === 400) {
			toastr.error('Bad request.');
			return false; // error handled
		}
		if (response.status === 403) {
			return false; // error handled
		}
		if (response.status === 405) {
			alert('405');
			return false; // error handled
		}
		return true; // error not handled
	});

});
