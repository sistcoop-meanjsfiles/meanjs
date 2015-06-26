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
		$urlRouterProvider.when('/cooperativa/app/estructura/cajas', '/cooperativa/app/estructura/cajas/buscar');

		$urlRouterProvider.when('/cooperativa/app/estructura/bovedas/editar/:boveda', '/cooperativa/app/estructura/bovedas/editar/:boveda/resumen');
		$urlRouterProvider.when('/cooperativa/app/estructura/cajas/editar/:caja', '/cooperativa/app/estructura/cajas/editar/:caja/resumen');

		$urlRouterProvider.when('/cooperativa/app/estructura/bovedas/editar/:boveda/historiales', '/cooperativa/app/estructura/bovedas/editar/:boveda/historiales/buscar');

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

			//Estructura

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
				controller: 'Cooperativa.Boveda.BuscarController',
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
				controller: 'Cooperativa.Boveda.CrearController',
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
			.state('cooperativa.app.estructura.boveda.editar', {
				url: '/editar/:boveda',
				templateUrl: '/modules/cooperativa/views/boveda/form-editar-boveda.html',
				controller: 'Cooperativa.Boveda.EditarController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-bovedas', $q, $timeout, $http, $location, Auth);
					},
					boveda: function ($state, $stateParams, SGBoveda) {
						return SGBoveda.$find($stateParams.boveda);
					}
				},
				ncyBreadcrumb: {
					label: 'Editar boveda',
					parent: 'cooperativa.app.estructura.boveda.buscar'
				}
			})
			.state('cooperativa.app.estructura.boveda.editar.resumen', {
				url: '/resumen',
				templateUrl: '/modules/cooperativa/views/boveda/form-editar-boveda-resumen.html',
				controller: 'Cooperativa.Boveda.Editar.ResumenController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-bovedas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			})
			.state('cooperativa.app.estructura.boveda.editar.datosPrincipales', {
				url: '/datosPrincipales',
				templateUrl: '/modules/cooperativa/views/boveda/form-editar-boveda-datosPrincipales.html',
				controller: 'Cooperativa.Boveda.Editar.DatosPrincipalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-bovedas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Datos principales'
				}
			})
			//HistorialBoveda
			.state('cooperativa.app.estructura.boveda.editar.historial', {
				url: '/historiales',
				template: '<div ui-view></div>',
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			})
			.state('cooperativa.app.estructura.boveda.editar.historial.buscar', {
				url: '/buscar',
				templateUrl: '/modules/cooperativa/views/boveda/historial/form-buscar-historial.html',
				controller: 'Cooperativa.Boveda.Editar.Historial.BuscarController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-bovedas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Buscar historial'
				}
			})
			.state('cooperativa.app.estructura.boveda.editar.historial.crear', {
				url: '/crear',
				templateUrl: '/modules/cooperativa/views/boveda/historial/form-crear-historial.html',
				controller: 'Cooperativa.Boveda.Editar.Historial.CrearController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-bovedas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Crear historial',
					parent: 'cooperativa.app.estructura.boveda.editar.historiales.buscar'
				}
			})
			.state('cooperativa.app.estructura.boveda.editar.historial.editar', {
				url: '/editar/:historial',
				templateUrl: '/modules/cooperativa/views/boveda/historial/form-editar-historial.html',
				controller: 'Cooperativa.Boveda.Editar.Historial.EditarController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-bovedas', $q, $timeout, $http, $location, Auth);
					},
					historial: function ($state, $stateParams, boveda) {
						return boveda.SGHistorialBoveda().$find($stateParams.historial);
					}
				},
				ncyBreadcrumb: {
					label: 'Editar historial',
					parent: 'cooperativa.app.estructura.boveda.editar.historiales.buscar'
				}
			})
			.state('cooperativa.app.estructura.boveda.editar.historial.editar.resumen', {
				url: '/resumen',
				templateUrl: '/modules/cooperativa/views/boveda/historial/form-editar-historial-resumen.html',
				controller: 'Cooperativa.Boveda.Editar.Historial.Editar.ResumenController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-bovedas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			})
			.state('cooperativa.app.estructura.boveda.editar.historial.editar.cerrar', {
				url: '/cerrar',
				templateUrl: '/modules/cooperativa/views/boveda/historial/form-editar-historial-cerrar.html',
				controller: 'Cooperativa.Boveda.Editar.Historial.Editar.CerrarController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-bovedas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Cerrar historial'
				}
			})
			//TransaccionBovedaCaja
			.state('cooperativa.app.estructura.boveda.editar.historial.editar.transaccionBovedaCaja', {
				url: '/transaccionesBovedaCaja',
				template: '<div ui-view></div>',
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			})
			.state('cooperativa.app.estructura.boveda.editar.historial.editar.transaccionBovedaCaja.buscar', {
				url: '/buscar',
				templateUrl: '/modules/cooperativa/views/boveda/historial/transaccionBovedaCaja/form-buscar-transaccionBovedaCaja.html',
				controller: 'Cooperativa.Boveda.Editar.Historial.Editar.TransaccionBovedaCaja.BuscarController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-bovedas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Buscar transaccionBovedaCaja'
				}
			})
			.state('cooperativa.app.estructura.boveda.editar.historial.editar.transaccionBovedaCaja.crear', {
				url: '/crear',
				templateUrl: '/modules/cooperativa/views/boveda/historial/transaccionBovedaCaja/form-crear-transaccionBovedaCaja.html',
				controller: 'Cooperativa.Boveda.Editar.Historial.Editar.TransaccionBovedaCaja.CrearController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-bovedas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Crear transaccion boveda-caja',
					parent: 'cooperativa.app.estructura.boveda.editar.historial.editar.transaccionBovedaCaja.buscar'
				}
			})
			.state('cooperativa.app.estructura.boveda.editar.historial.editar.transaccionBovedaCaja.editar', {
				url: '/editar/:transaccion',
				templateUrl: '/modules/cooperativa/views/boveda/historial/transaccionBovedaCaja/form-editar-transaccionBovedaCaja.html',
				controller: 'Cooperativa.Boveda.Editar.Historial.Editar.TransaccionBovedaCaja.EditarController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-bovedas', $q, $timeout, $http, $location, Auth);
					},
					transaccion: function ($state, $stateParams, historial) {
						return historial.SGTransaccionBovedaCaja().$find($stateParams.transaccion);
					}
				},
				ncyBreadcrumb: {
					label: 'Editar transaccion boveda-caja',
					parent: 'cooperativa.app.estructura.boveda.editar.historial.editar.transaccionBovedaCaja.buscar'
				}
			})

			//Cajas
			.state('cooperativa.app.estructura.caja', {
				url: '/cajas',
				template: '<div ui-view></div>',
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			})
			.state('cooperativa.app.estructura.caja.buscar', {
				url: '/buscar',
				templateUrl: '/modules/cooperativa/views/caja/form-buscar-caja.html',
				controller: 'Cooperativa.Caja.BuscarCajaController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Home'
				}
			})
			.state('cooperativa.app.estructura.caja.crear', {
				url: '/crear',
				templateUrl: '/modules/cooperativa/views/caja/form-crear-caja.html',
				controller: 'Cooperativa.Caja.CrearCajaController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Crear caja',
					parent: 'cooperativa.app.estructura.caja.buscar'
				}
			})
			.state('cooperativa.app.estructura.caja.editar', {
				url: '/editar/:caja',
				templateUrl: '/modules/cooperativa/views/caja/form-editar-caja.html',
				controller: 'Cooperativa.Caja.EditarCajaController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
					},
					caja: function ($state, $stateParams, SGCaja) {
						return SGCaja.$find($stateParams.caja);
					}
				},
				ncyBreadcrumb: {
					label: 'Editar caja',
					parent: 'cooperativa.app.estructura.caja.buscar'
				}
			})
			.state('cooperativa.app.estructura.caja.editar.resumen', {
				url: '/resumen',
				templateUrl: '/modules/cooperativa/views/caja/form-editar-caja-resumen.html',
				controller: 'Cooperativa.Caja.EditarCaja.ResumenController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			})
			.state('cooperativa.app.estructura.caja.editar.datosPrincipales', {
				url: '/datosPrincipales',
				templateUrl: '/modules/cooperativa/views/caja/form-editar-caja-datosPrincipales.html',
				controller: 'Cooperativa.Caja.EditarCaja.DatosPrincipalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
					}
				}
			})
			.state('cooperativa.app.estructura.caja.editar.boveda', {
				url: '/buscar',
				templateUrl: '/modules/cooperativa/views/caja/form-editar-caja-bovedas.html',
				controller: 'Cooperativa.Caja.EditarCaja.BovedasController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Bovedas'
				}
			})
			.state('cooperativa.app.estructura.caja.editar.abrir', {
				url: '/abrir',
				templateUrl: '/modules/cooperativa/views/caja/form-editar-caja-abrir.html',
				controller: 'Cooperativa.Caja.EditarCaja.AbrirController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
					}
				}
			})
			.state('cooperativa.app.estructura.caja.editar.cerrar', {
				url: '/cerrar',
				templateUrl: '/modules/cooperativa/views/caja/form-editar-caja-cerrar.html',
				controller: 'Cooperativa.Caja.EditarCaja.CerrarController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
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
