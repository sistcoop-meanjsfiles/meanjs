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
                url: '/socios',
                template: '<div ui-view></div>',
                abstract: true
            })
            .state('socio.app.cliente', {
                url: '/clientes',
                template: '<div ui-view></div>',
                abstract: true
            })

            //tipoDocumento
            .state('socio.app.administracion.documento', {
                url: '/documentos',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('socio.app.administracion.documento.buscar', {
                url: '/buscar',
                templateUrl: 'modules/socio/client/views/tipoDocumento/form-buscar-tipoDocumento.html',
                controller: 'Persona.TipoDocumento.BuscarTipoDocumentoController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-documentos', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('socio.app.administracion.documento.crear', {
                url: '/crear',
                templateUrl: 'modules/socio/client/views/tipoDocumento/form-crear-tipoDocumento.html',
                controller: 'Persona.TipoDocumento.CrearTipoDocumentoController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-documentos', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Crear documento',
                    parent: 'persona.app.administracion.documento.buscar'
                }
            })
            .state('socio.app.administracion.documento.editar', {
                url: '/editar/:documento',
                templateUrl: 'modules/socio/client/views/tipoDocumento/form-editar-tipoDocumento.html',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-documentos', $q, $timeout, $http, $location, Auth);
                    },
                    tipoDocumento: function ($state, $stateParams, SGTipoDocumento) {
                        return SGTipoDocumento.$find($stateParams.documento);
                    }
                },
                controller: 'Persona.TipoDocumento.EditarTipoDocumentoController',
                ncyBreadcrumb: {
                    label: 'Editar documento',
                    parent: 'persona.app.administracion.documento.buscar'
                }
            });

    }
]);
