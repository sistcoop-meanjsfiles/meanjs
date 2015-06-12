'use strict';

// Setting up route
angular.module('cooperativa').config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {

		var moduleName = 'cooperativa';

		// Check if user has role
		var checkUserRole = function (role, $q, $timeout, $http, $location, Auth) {

			// Initialize a new promise
			var deferred = $q.defer();

			// Authenticated
			if (Auth.authz.hasResourceRole(role, moduleName)) {
				$timeout(deferred.resolve);
			}

			// Not Authenticated
			else {
				$timeout(deferred.reject);
				//$location.url('/auth/login');
				alert('No tiene los permisos para poder acceder a esta pagina');
			}

			return deferred.promise;
		};

		// Get session sucursal
		var getSucursalesAutorizadasParaAdministrarBovedas = function ($q, $timeout, $http, $location, Auth, SGSucursal) {
			if (Auth.authz.hasResourceRole('administrar-bovedas', moduleName)) {
				return SGSucursal.$search();
			} else if (Auth.authz.hasResourceRole('administrar-bovedas-agencia', moduleName)) {
				return SGSucursal.$find(Auth.sistcoop.sucursal);
			} else {
				return SGSucursal.$find(Auth.sistcoop.sucursal);
			}
		};
		// Get session agencia
		var getAgenciasAutorizadasParaAdministrarBovedas = function ($q, $timeout, $http, $location, Auth, SGSucursal) {
			if (Auth.authz.hasResourceRole('administrar-bovedas', moduleName)) {
				return undefined;
			} else if (Auth.authz.hasResourceRole('administrar-bovedas-agencia', moduleName)) {
				return SGSucursal.$new(Auth.sistcoop.sucursal).$findAgencia(Auth.sistcoop.agencia);
			} else {
				return SGSucursal.$new(Auth.sistcoop.sucursal).$findAgencia(Auth.sistcoop.agencia);
			}
		};

		$urlRouterProvider.when('/cooperativa/app/estructura/bovedas', '/cooperativa/app/estructura/bovedas/buscar');

		$stateProvider
			.state('cooperativa', {
				abstract: true,
				url: '/cooperativa',
				templateUrl: '/modules/cooperativa/views/_body.html',
				controller: 'CooperativaController'
			})
			.state('cooperativa.home', {
				url: '/home',
				templateUrl: '/modules/cooperativa/views/index.html',
				ncyBreadcrumb: {
					label: 'Index'
				}
			})
			.state('cooperativa.app', {
				url: '/app',
				template: '<div ui-view></div>',
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			})

			.state('cooperativa.app.estructura', {
				url: '/estructura',
				template: '<div ui-view></div>',
				abstract: true
			})
			.state('cooperativa.app.transaccionInterna', {
				url: '/transaccionInterna',
				template: '<div ui-view></div>',
				abstract: true
			})
			.state('cooperativa.app.transaccionCliente', {
				url: '/transaccionCliente',
				template: '<div ui-view></div>',
				abstract: true
			})

			//estructura

			//Bovedas
			.state('cooperativa.app.estructura.boveda', {
				url: '/bovedas',
				template: '<div ui-view></div>',
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			})
			.state('cooperativa.app.estructura.boveda.buscar', {
				url: '/buscar',
				templateUrl: '/modules/cooperativa/views/boveda/form-buscar-boveda.html',
				controller: 'Cooperativa.Boveda.BuscarBovedaController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-bovedas', $q, $timeout, $http, $location, Auth);
					},
					sucursales: function ($q, $timeout, $http, $location, Auth, SGSucursal) {
						return getSucursalesAutorizadasParaAdministrarBovedas($q, $timeout, $http, $location, Auth, SGSucursal);
					},
					agencias: function ($q, $timeout, $http, $location, Auth, SGSucursal) {
						return getAgenciasAutorizadasParaAdministrarBovedas($q, $timeout, $http, $location, Auth, SGSucursal);
					}
				},
				ncyBreadcrumb: {
					label: 'Home'
				}
			})
			.state('cooperativa.app.estructura.boveda.crear', {
				url: '/crear',
				templateUrl: '/modules/cooperativa/views/boveda/form-crear-boveda.html',
				controller: 'Cooperativa.Boveda.CrearBovedaController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-bovedas', $q, $timeout, $http, $location, Auth);
					},
					sucursales: function ($q, $timeout, $http, $location, Auth, SGSucursal) {
						return getSucursalesAutorizadasParaAdministrarBovedas($q, $timeout, $http, $location, Auth, SGSucursal);
					},
					agencias: function ($q, $timeout, $http, $location, Auth, SGSucursal) {
						return getAgenciasAutorizadasParaAdministrarBovedas($q, $timeout, $http, $location, Auth, SGSucursal);
					}
				},
				ncyBreadcrumb: {
					label: 'Crear boveda',
					parent: 'cooperativa.app.estructura.boveda.buscar'
				}
			})
			.state('cooperativa.app.estructura.editarBoveda', {
				url: '/boveda/:id',
				templateUrl: '/modules/cooperativa/views/boveda/form-editar-boveda.html',
				controller: 'Cooperativa.EditarBovedaController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('PUBLIC', $q, $timeout, $http, $location, Auth);
					},
					boveda: function ($state, $stateParams, SGBoveda) {
						return SGBoveda.$find($stateParams.id);
					}
				}
			})
			.state('cooperativa.app.estructura.editarBoveda.resumen', {
				url: '/resumen',
				templateUrl: '/modules/cooperativa/views/boveda/form-editar-boveda-resumen.html',
				controller: 'Cooperativa.EditarBoveda.ResumenController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('PUBLIC', $q, $timeout, $http, $location, Auth);
					}
				}
			})
			.state('cooperativa.app.estructura.editarBoveda.datosPrincipales', {
				url: '/datosPrincipales',
				templateUrl: '/modules/cooperativa/views/boveda/form-editar-boveda-datosPrincipales.html',
				controller: 'Cooperativa.EditarBoveda.DatosPrincipalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ADMIN', $q, $timeout, $http, $location, Auth);
					}
				}
			})
			.state('cooperativa.app.estructura.editarBoveda.abrir', {
				url: '/abrir',
				templateUrl: '/modules/cooperativa/views/boveda/form-editar-boveda-abrir.html',
				controller: 'Cooperativa.EditarBoveda.AbrirController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('JEFE_CAJA', $q, $timeout, $http, $location, Auth);
					}
				}
			})
			.state('cooperativa.app.estructura.editarBoveda.cerrar', {
				url: '/cerrar',
				templateUrl: '/modules/cooperativa/views/boveda/form-editar-boveda-cerrar.html',
				controller: 'Cooperativa.EditarBoveda.CerrarController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('JEFE_CAJA', $q, $timeout, $http, $location, Auth);
					}
				}
			})

			.state('cooperativa.app.estructura.buscarCajas', {
				url: '/buscarCajas',
				templateUrl: '/modules/cooperativa/views/caja/form-buscar-caja.html',
				controller: 'Cooperativa.BuscarCajaController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('PUBLIC', $q, $timeout, $http, $location, Auth);
					}
				}
			})
			.state('cooperativa.app.estructura.crearCaja', {
				url: '/crearCaja',
				templateUrl: '/modules/cooperativa/views/caja/form-crear-caja.html',
				controller: 'Cooperativa.CrearCajaController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ADMIN', $q, $timeout, $http, $location, Auth);
					}
				}
			})
			.state('cooperativa.app.estructura.editarCaja', {
				url: '/caja/:id',
				templateUrl: '/modules/cooperativa/views/caja/form-editar-caja.html',
				controller: 'Cooperativa.EditarCajaController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('PUBLIC', $q, $timeout, $http, $location, Auth);
					},
					caja: function ($state, $stateParams, SGCaja) {
						return SGCaja.$find($stateParams.id);
					}
				}
			})
			.state('cooperativa.app.estructura.editarCaja.resumen', {
				url: '/resumen',
				templateUrl: '/modules/cooperativa/views/caja/form-editar-caja-resumen.html',
				controller: 'Cooperativa.EditarCaja.ResumenController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('PUBLIC', $q, $timeout, $http, $location, Auth);
					}
				}
			})
			.state('cooperativa.app.estructura.editarCaja.datosPrincipales', {
				url: '/datosPrincipales',
				templateUrl: '/modules/cooperativa/views/caja/form-editar-caja-datosPrincipales.html',
				controller: 'Cooperativa.EditarCaja.DatosPrincipalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ADMIN', $q, $timeout, $http, $location, Auth);
					}
				}
			})
			.state('cooperativa.app.estructura.editarCaja.abrir', {
				url: '/abrir',
				templateUrl: '/modules/cooperativa/views/caja/form-editar-caja-abrir.html',
				controller: 'Cooperativa.EditarCaja.AbrirController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('JEFE_CAJA', $q, $timeout, $http, $location, Auth);
					}
				}
			})
			.state('cooperativa.app.estructura.editarCaja.cerrar', {
				url: '/cerrar',
				templateUrl: '/modules/cooperativa/views/caja/form-editar-caja-cerrar.html',
				controller: 'Cooperativa.EditarCaja.CerrarController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('CAJERO', $q, $timeout, $http, $location, Auth);
					}
				}
			})
			.state('cooperativa.app.estructura.editarCaja.bovedas', {
				url: '/bovedas',
				templateUrl: '/modules/cooperativa/views/caja/form-editar-caja-bovedas.html',
				controller: 'Cooperativa.EditarCaja.BovedasController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ADMIN', $q, $timeout, $http, $location, Auth);
					}
				}
			})

			.state('cooperativa.app.transaccionInterna.buscarTransaccionesBovedaCaja', {
				url: '/buscarTransaccionesBovedaCaja',
				templateUrl: '/modules/cooperativa/views/transaccionInterna/form-buscar-transaccionBovedaCaja.html',
				controller: 'Cooperativa.BuscarTransaccionBovedaCajaController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('PUBLIC', $q, $timeout, $http, $location, Auth);
					}
				}
			})

			.state('cooperativa.app.transaccionInterna.buscarTransaccionesCajaCaja', {
				url: '/buscarTransaccionesCajaCaja',
				templateUrl: '/modules/cooperativa/views/transaccionInterna/form-buscar-transaccionCajaCaja.html',
				controller: 'Cooperativa.BuscarTransaccionCajaCajaController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('PUBLIC', $q, $timeout, $http, $location, Auth);
					}
				}
			});
	}
]);
