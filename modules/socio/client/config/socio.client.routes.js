'use strict';

// Setting up route
angular.module('socio').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        var moduleName = 'socio';

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

        //$urlRouterProvider.when('/socio/app', '/socio/app/socio/socios');

        $urlRouterProvider.when('/socio/app/socio/socios', '/socio/app/socio/socios/buscar');

        $stateProvider
            .state('socio', {
                abstract: true,
                url: '/socio',
                templateUrl: 'modules/socio/client/views/_body.html',
                controller: 'SocioController'
            })
            .state('socio.home', {
                url: '/home',
                templateUrl: 'modules/socio/client/views/index.html',
                ncyBreadcrumb: {
                    label: 'Index'
                }
            })
            .state('socio.app', {
                url: '/app',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })

            .state('socio.app.socio', {
                url: '/socio',
                template: '<div ui-view></div>',
                abstract: true
            })
            .state('socio.app.configuracion', {
                url: '/configuracion',
                template: '<div ui-view></div>',
                abstract: true
            })

            //socios
            .state('socio.app.socio.socio', {
                url: '/socios',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('socio.app.socio.socio.buscar', {
                url: '/buscar',
                templateUrl: 'modules/socio/client/views/socio/form-buscar-socio.html',
                controller: 'Socio.Socio.BuscarSocioController',
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('socio.app.socio.socio.crear', {
                url: '/crear',
                templateUrl: 'modules/socio/client/views/socio/form-crear-socio.html',
                controller: 'Socio.Socio.CrearSocioController',
                ncyBreadcrumb: {
                    label: 'Crear documento',
                    parent: 'socio.app.socio.socio.buscar'
                }
            })
            .state('socio.app.socio.socio.editar', {
                url: '/editar/:socio',
                templateUrl: 'modules/socio/client/views/socio/form-editar-socio.html',
                resolve: {
                    socio: function ($state, $stateParams, SGSocio) {
                        return SGSocio.$find($stateParams.socio);
                    }
                },
                controller: 'Socio.Socio.EditarSocioController',
                ncyBreadcrumb: {
                    label: 'Editar socio',
                    parent: 'socio.app.socio.socio.buscar'
                }
            })
            .state('socio.app.socio.socio.editar.resumen', {
                url: '/resumen',
                templateUrl: 'modules/socio/client/views/socio/form-editar-resumen.html',
                controller: 'Socio.Socio.EditarSocio.ResumenController',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('socio.app.socio.socio.editar.cuentaPersonal', {
                url: '/cuentasPersonales',
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('socio.app.socio.socio.editar.cuentaPersonal.buscar', {
                url: '/buscar',
                templateUrl: 'modules/socio/client/views/socio/cuentaPersonal/form-buscar-cuentaPersonal.html',
                controller: 'Socio.Socio.CuentaPersonal.BuscarAgenciaController',
                ncyBreadcrumb: {
                    label: 'Cuentas personales'
                }
            })
            .state('socio.app.socio.socio.editar.cuentaPersonal.crear', {
                url: '/crear',
                templateUrl: 'modules/socio/client/views/socio/cuentaPersonal/form-crear-cuentaPersonal.html',
                controller: 'Socio.Socio.CuentaPersonal.CrearCuentaPersonalController',
                ncyBreadcrumb: {
                    label: 'Crear cuenta personal',
                    parent: 'socio.app.socio.socio.editar.cuentaPersonal.buscar'
                }
            })

            //socios
            .state('socio.app.configuracion.configuracion', {
                url: '/configuracion',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            });

    }
]);
