'use strict';

// Setting up route
angular.module('producto').config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.when('/producto/app/productos/cuentasPersonales', '/producto/app/productos/cuentasPersonales/buscar');

		$stateProvider
			.state('producto', {
				abstract: true,
				url: '/producto',
				templateUrl: '/modules/producto/views/_body.html',
				controller: 'ProductoController'
			})
			.state('producto.home', {
				url: '/home',
				templateUrl: '/modules/producto/views/index.html',
				ncyBreadcrumb: {
					label: 'Index'
				}
			})
			.state('producto.app', {
				url: '/app',
				template: '<div ui-view></div>',
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			})

			.state('producto.app.producto', {
				url: '/productos',
				template: '<div ui-view></div>',
				abstract: true
			})

			//tipoDocumento
			.state('producto.app.producto.cuentaPersonal', {
				url: '/cuentasPersonales',
				template: '<div ui-view></div>',
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			})
			.state('producto.app.producto.cuentaPersonal.buscar', {
				url: '/buscar',
				templateUrl: '/modules/producto/views/producto/cuentaPersonal/form-buscar-producto.html',
				controller: 'Producto.CuentaPersonal.BuscarController',
				resolve: {
				},
				ncyBreadcrumb: {
					label: 'Home'
				}
			})
			.state('producto.app.producto.cuentaPersonal.crear', {
				url: '/crear',
				templateUrl: '/modules/producto/views/producto/cuentaPersonal/form-crear-producto.html',
				controller: 'Producto.CuentaPersonal.CrearController',
				resolve: {

				},
				ncyBreadcrumb: {
					label: 'Crear producto cuenta personal',
					parent: 'producto.app.producto.cuentaPersonal.buscar'
				}
			})
			.state('producto.app.producto.cuentaPersonal.editar', {
				url: '/editar/:producto',
				template: '<div ui-view></div>',
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			});

	}
]);
