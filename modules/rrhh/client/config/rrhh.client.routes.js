'use strict';

// Setting up route
angular.module('persona').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        var moduleName = 'rrhh';

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

        $urlRouterProvider.when('/rrhh/app', '/rrhh/app/organizacion/sucursales');

        $urlRouterProvider.when('/rrhh/app/organizacion/sucursales', '/rrhh/app/organizacion/sucursales/buscar');

        $urlRouterProvider.when('/rrhh/app/organizacion/sucursales/editar/:sucursal', '/rrhh/app/organizacion/sucursales/editar/:sucursal/resumen');
        $urlRouterProvider.when('/rrhh/app/organizacion/sucursales/editar/:sucursal/agencias', '/rrhh/app/organizacion/sucursales/editar/:sucursal/agencias/buscar');

        $urlRouterProvider.when('/rrhh/app/rrhh/trabajadores', '/rrhh/app/rrhh/trabajadores/buscar');

        $urlRouterProvider.when('/rrhh/app/rrhh/trabajadores/editar/:trabajador', '/rrhh/app/rrhh/trabajadores/editar/:trabajador/resumen');

        $stateProvider
            .state('rrhh', {
                abstract: true,
                url: '/rrhh',
                templateUrl: 'modules/rrhh/client/views/_body.html',
                controller: 'RrhhController'
            })
            .state('rrhh.home', {
                url: '/home',
                templateUrl: 'modules/rrhh/client/views/index.html',
                ncyBreadcrumb: {
                    label: 'Index'
                }
            })

            .state('rrhh.app', {
                url: '/app',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })

            .state('rrhh.app.organizacion', {
                url: '/organizacion',
                template: '<ui-view></ui-view>',
                abstract: true
            })
            .state('rrhh.app.rrhh', {
                url: '/rrhh',
                template: '<ui-view></ui-view>',
                abstract: true
            })

            //sucursales
            .state('rrhh.app.organizacion.sucursal', {
                url: '/sucursales',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('rrhh.app.organizacion.sucursal.buscar', {
                url: '/buscar',
                templateUrl: 'modules/rrhh/client/views/sucursal/form-buscar-sucursal.html',
                controller: 'Rrhh.Sucursal.BuscarSucursalController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-sucursales', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('rrhh.app.organizacion.sucursal.crear', {
                url: '/crear',
                templateUrl: 'modules/rrhh/client/views/sucursal/form-crear-sucursal.html',
                controller: 'Rrhh.Sucursal.CrearSucursalController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-sucursales', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Crear sucursal',
                    parent: 'rrhh.app.organizacion.sucursal.buscar'
                }
            })
            .state('rrhh.app.organizacion.sucursal.editar', {
                url: '/editar/:sucursal',
                templateUrl: 'modules/rrhh/client/views/sucursal/form-editar-sucursal.html',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-sucursales', $q, $timeout, $http, $location, Auth);
                    },
                    sucursal: function ($state, $stateParams, SGSucursal) {
                        return SGSucursal.$find($stateParams.sucursal);
                    }
                },
                controller: 'Rrhh.Sucursal.EditarSucursalController',
                ncyBreadcrumb: {
                    label: 'Editar sucursal',
                    parent: 'rrhh.app.organizacion.sucursal.buscar'
                }
            })
            .state('rrhh.app.organizacion.sucursal.editar.resumen', {
                url: '/resumen',
                templateUrl: 'modules/rrhh/client/views/sucursal/form-editar-sucursal-resumen.html',
                controller: 'Rrhh.Sucursal.EditarSucursal.ResumenController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-sucursales', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('rrhh.app.organizacion.sucursal.editar.datosPrincipales', {
                url: '/datosPrincipales',
                templateUrl: 'modules/rrhh/client/views/sucursal/form-editar-sucursal-datosPrincipales.html',
                controller: 'Rrhh.Sucursal.EditarSucursal.DatosPrincipalesController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-sucursales', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Datos principales'
                }
            })

            //Agencias
            .state('rrhh.app.organizacion.sucursal.editar.agencia', {
                url: '/agencias',
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('rrhh.app.organizacion.sucursal.editar.agencia.buscar', {
                url: '/buscar',
                templateUrl: 'modules/rrhh/client/views/sucursal/agencia/form-buscar-agencia.html',
                controller: 'Rrhh.Sucursal.Agencia.BuscarAgenciaController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-sucursales', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Agencias'
                }
            })
            .state('rrhh.app.organizacion.sucursal.editar.agencia.crear', {
                url: '/crear',
                templateUrl: 'modules/rrhh/client/views/sucursal/agencia/form-crear-agencia.html',
                controller: 'Rrhh.Sucursal.Agencia.CrearAgenciaController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-sucursales', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Crear agencia',
                    parent: 'rrhh.app.organizacion.sucursal.editar.agencia.buscar'
                }
            })
            .state('rrhh.app.organizacion.sucursal.editar.agencia.editar', {
                url: '/editar/:agencia',
                templateUrl: 'modules/rrhh/client/views/sucursal/agencia/form-editar-agencia-datosPrincipales.html',
                controller: 'Rrhh.Sucursal.Agencia.EditarAgenciaController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-sucursales', $q, $timeout, $http, $location, Auth);
                    },
                    agencia: function ($state, $stateParams, sucursal, SGSucursal) {
                        return sucursal.SGAgencia().$find($stateParams.agencia);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar agencia',
                    parent: 'rrhh.app.organizacion.sucursal.editar.agencia.buscar'
                }
            })

            //Trabajadores
            .state('rrhh.app.rrhh.trabajador', {
                url: '/trabajadores',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('rrhh.app.rrhh.trabajador.buscar', {
                url: '/buscar',
                templateUrl: 'modules/rrhh/client/views/trabajador/form-buscar-trabajador.html',
                controller: 'Rrhh.Trabajador.BuscarTrabajadorController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-trabajadores', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('rrhh.app.rrhh.trabajador.crear', {
                url: '/crear',
                templateUrl: 'modules/rrhh/client/views/trabajador/form-crear-trabajador.html',
                controller: 'Rrhh.Trabajador.CrearTrabajadorController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-trabajadores', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Crear trabajador',
                    parent: 'rrhh.app.rrhh.trabajador.buscar'
                }
            })
            .state('rrhh.app.rrhh.trabajador.editar', {
                url: '/editar/:trabajador',
                templateUrl: 'modules/rrhh/client/views/trabajador/form-editar-trabajador.html',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-trabajadores', $q, $timeout, $http, $location, Auth);
                    },
                    trabajador: function ($state, $stateParams, SGTrabajador, $q, $timeout, $http, $location, Auth) {
                        if (Auth.authz.hasResourceRole('administrar-trabajadores', moduleName)) {
                            return SGTrabajador.$find($stateParams.trabajador);
                        } else if (Auth.authz.hasResourceRole('administrar-trabajadores-agencia', moduleName)) {
                            var deferred = $q.defer();
                            SGTrabajador.$find($stateParams.trabajador).then(function (response) {
                                if (Auth.sistcoop.agencia === response.agencia.denominacion && Auth.sistcoop.sucursal === response.agencia.sucursal.denominacion) {
                                    $timeout(deferred.resolve(response));
                                } else {
                                    $timeout(deferred.reject);
                                }
                            });
                            return deferred.promise;
                        }
                    }
                },
                controller: 'Rrhh.Trabajador.EditarTrabajadorController',
                ncyBreadcrumb: {
                    label: 'Editar trabajador',
                    parent: 'rrhh.app.rrhh.trabajador.buscar'
                }
            })
            .state('rrhh.app.rrhh.trabajador.editar.resumen', {
                url: '/resumen',
                templateUrl: 'modules/rrhh/client/views/trabajador/form-editar-trabajador-resumen.html',
                controller: 'Rrhh.Trabajador.EditarTrabajador.ResumenController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-trabajadores', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Resumen'
                }
            })
            .state('rrhh.app.rrhh.trabajador.editar.datosPrincipales', {
                url: '/datosPrincipales',
                templateUrl: 'modules/rrhh/client/views/trabajador/form-editar-trabajador-datosPrincipales.html',
                controller: 'Rrhh.Trabajador.EditarTrabajador.DatosPrincipalesController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-trabajadores', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Datos principales'
                }
            })
            .state('rrhh.app.rrhh.trabajador.editar.accesoSistema', {
                url: '/accesoSistema',
                templateUrl: 'modules/rrhh/client/views/trabajador/form-editar-trabajador-accesoSistema.html',
                controller: 'Rrhh.Trabajador.EditarTrabajador.AccesoSistemaController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-trabajadores', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Acceso al sistema'
                }
            });
    }
]);
