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

        $urlRouterProvider.when('/cooperativa/app/estructura/bovedas', '/cooperativa/app/estructura/bovedas/buscar');
        $urlRouterProvider.when('/cooperativa/app/estructura/cajas', '/cooperativa/app/estructura/cajas/buscar');

        $urlRouterProvider.when('/cooperativa/app/estructura/bovedas/editar/:boveda', '/cooperativa/app/estructura/bovedas/editar/:boveda/resumen');
        $urlRouterProvider.when('/cooperativa/app/estructura/cajas/editar/:caja', '/cooperativa/app/estructura/cajas/editar/:caja/resumen');

        $urlRouterProvider.when('/cooperativa/app/estructura/bovedas/editar/:boveda/historiales', '/cooperativa/app/estructura/bovedas/editar/:boveda/historiales/buscar');

        $urlRouterProvider.when('/cooperativa/app/estructura/bovedas/editar/:boveda/historiales/editar/:historial', '/cooperativa/app/estructura/bovedas/editar/:boveda/historiales/editar/:historial/resumen');

        $urlRouterProvider.when('/cooperativa/app/estructura/bovedas/editar/:boveda/historiales/editar/:historial/transaccionesBovedaCaja', '/cooperativa/app/estructura/bovedas/editar/:boveda/historiales/editar/:historial/transaccionesBovedaCaja/buscar');

        $urlRouterProvider.when('/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas', '/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/buscar');

        //$urlRouterProvider.when('/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja', '/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/resumen');
        //$urlRouterProvider.when('/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales', '/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales/buscar');
        $urlRouterProvider.when('/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja', '/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales/buscar');
        $urlRouterProvider.when('/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales/editar/:historial', '/cooperativa/app/estructura/cajas/editar/:caja/bovedaCajas/editar/:bovedaCaja/historiales/editar/:historial/resumen');
        $stateProvider
            .state('cooperativa', {
                abstract: true,
                url: '/cooperativa',
                templateUrl: 'modules/cooperativa/client/views/_body.html',
                controller: 'CooperativaController'
            })
            .state('cooperativa.home', {
                url: '/home',
                templateUrl: 'modules/cooperativa/client/views/index.html',
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
                templateUrl: 'modules/cooperativa/client/views/boveda/form-buscar-boveda.html',
                controller: 'Cooperativa.Boveda.BuscarController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-bovedas', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('cooperativa.app.estructura.boveda.crear', {
                url: '/crear',
                templateUrl: 'modules/cooperativa/client/views/boveda/form-crear-boveda.html',
                controller: 'Cooperativa.Boveda.CrearController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-bovedas', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Crear boveda',
                    parent: 'cooperativa.app.estructura.boveda.buscar'
                }
            })
            .state('cooperativa.app.estructura.boveda.editar', {
                url: '/editar/:boveda',
                templateUrl: 'modules/cooperativa/client/views/boveda/form-editar-boveda.html',
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
                templateUrl: 'modules/cooperativa/client/views/boveda/form-editar-boveda-resumen.html',
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
                templateUrl: 'modules/cooperativa/client/views/boveda/form-editar-boveda-datosPrincipales.html',
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
                templateUrl: 'modules/cooperativa/client/views/boveda/historial/form-buscar-historial.html',
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
                templateUrl: 'modules/cooperativa/client/views/boveda/historial/form-crear-historial.html',
                controller: 'Cooperativa.Boveda.Editar.Historial.CrearController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-bovedas', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Crear historial',
                    parent: 'cooperativa.app.estructura.boveda.editar.historial.buscar'
                }
            })
            .state('cooperativa.app.estructura.boveda.editar.historial.editar', {
                url: '/editar/:historial',
                templateUrl: 'modules/cooperativa/client/views/boveda/historial/form-editar-historial.html',
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
                    parent: 'cooperativa.app.estructura.boveda.editar.historial.buscar'
                }
            })
            .state('cooperativa.app.estructura.boveda.editar.historial.editar.resumen', {
                url: '/resumen',
                templateUrl: 'modules/cooperativa/client/views/boveda/historial/form-editar-historial-resumen.html',
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
                templateUrl: 'modules/cooperativa/client/views/boveda/historial/form-editar-historial-cerrar.html',
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
                templateUrl: 'modules/cooperativa/client/views/boveda/historial/transaccionBovedaCaja/form-buscar-transaccionBovedaCaja.html',
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
                templateUrl: 'modules/cooperativa/client/views/boveda/historial/transaccionBovedaCaja/form-crear-transaccionBovedaCaja.html',
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
                templateUrl: 'modules/cooperativa/client/views/boveda/historial/transaccionBovedaCaja/form-editar-transaccionBovedaCaja.html',
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
                templateUrl: 'modules/cooperativa/client/views/caja/form-buscar-caja.html',
                controller: 'Cooperativa.Caja.BuscarController',
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
                templateUrl: 'modules/cooperativa/client/views/caja/form-crear-caja.html',
                controller: 'Cooperativa.Caja.CrearController',
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
                templateUrl: 'modules/cooperativa/client/views/caja/form-editar-caja.html',
                controller: 'Cooperativa.Caja.EditarController',
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
                templateUrl: 'modules/cooperativa/client/views/caja/form-editar-caja-resumen.html',
                controller: 'Cooperativa.Caja.Editar.ResumenController',
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
                templateUrl: 'modules/cooperativa/client/views/caja/form-editar-caja-datosPrincipales.html',
                controller: 'Cooperativa.Caja.Editar.DatosPrincipalesController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Datos principales'
                }
            })
            //BovedaCajas
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja', {
                url: '/bovedaCajas',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/form-buscar-bovedaCaja.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.BuscarController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Bovedas'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.crear', {
                url: '/crear',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/form-crear-bovedaCaja.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.CrearController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Crear Boveda-Caja',
                    parent: 'cooperativa.app.estructura.caja.editar.bovedaCaja.buscar'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar', {
                url: '/editar/:bovedaCaja',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/form-editar-bovedaCaja.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.EditarController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
                    },
                    bovedaCaja: function ($state, $stateParams, caja) {
                        return caja.SGBovedaCaja().$find($stateParams.bovedaCaja);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar boveda-caja',
                    parent: 'cooperativa.app.estructura.caja.editar.bovedaCaja.buscar'
                }
            })
            //HistorialBovedacaja
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial', {
                url: '/historiales',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/form-buscar-historial.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.BuscarController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.crear', {
                url: '/crear',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/form-crear-historial.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.CrearController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Crear Historial',
                    parent: 'cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.buscar'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar', {
                url: '/editar/:historial',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/form-editar-historial.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.EditarController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
                    },
                    historial: function ($state, $stateParams, bovedaCaja) {
                        return bovedaCaja.SGHistorialBovedaCaja().$find($stateParams.historial);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar caja',
                    parent: 'cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.buscar'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.resumen', {
                url: '/resumen',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/form-editar-historial-resumen.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.Editar.ResumenController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar caja',
                    parent: 'cooperativa.app.estructura.caja.buscar'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.cerrar', {
                url: '/cerrar',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/form-editar-historial-cerrar.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.Editar.CerrarController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Cerrar caja'
                }
            })
            //TransaccionBoevdaCaja
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionBovedaCaja', {
                url: '/historiales',
                template: '<div ui-view></div>',
                ncyBreadcrumb: {
                    skip: true // Never display this state in breadcrumb.
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionBovedaCaja.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-buscar-transaccionBovedaCaja.html',
                controller: 'Cooperativa.Caja.BovedaCaja.Historial.TransaccionBovedaCaja.BuscarController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar caja',
                    parent: 'cooperativa.app.estructura.caja.buscar'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionBovedaCaja.crear', {
                url: '/crear',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-crear-transaccionBovedaCaja.html',
                controller: 'Cooperativa.Caja.BovedaCaja.Historial.TransaccionBovedaCaja.CrearController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'crear caja'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionBovedaCaja.editar', {
                url: '/editar/:transaccion',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-editar-transaccionBovedaCaja.html',
                controller: 'Cooperativa.Caja.BovedaCaja.Historial.TransaccionBovedaCaja.EditarController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
                    },
                    transaccion: function ($state, $stateParams, historial) {
                        return historial.SGTransaccionBovedaCaja().$find($stateParams.transaccion);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Editar transaccion'
                }
            })
            //TransaccionCajacaja
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionCajaCaja', {
                url: '/transaccionesCajaCaja',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-editar-historial-resumen.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.Editar.TransaccionBovedaCaja.BuscarController',
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
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionCajaCaja.buscar', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-editar-historial-resumen.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.Editar.TransaccionBovedaCaja.BuscarController',
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
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionCajaCaja.crear', {
                url: '/crear',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-editar-historial-resumen.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.Editar.TransaccionBovedaCaja.BuscarController',
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
            .state('cooperativa.app.estructura.caja.editar.bovedaCaja.editar.historial.editar.transaccionCajaCaja.editar', {
                url: '/editar/:transaccion',
                templateUrl: 'modules/cooperativa/client/views/caja/bovedaCaja/historial/transaccionBovedaCaja/form-editar-historial-resumen.html',
                controller: 'Cooperativa.Caja.Editar.BovedaCaja.Historial.Editar.TransaccionBovedaCaja.BuscarController',
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

            .state('cooperativa.app.estructura.caja.editar.editar.boveda', {
                url: '/buscar',
                templateUrl: 'modules/cooperativa/client/views/caja/form-editar-caja-bovedas.html',
                controller: 'Cooperativa.Caja.Editar.BovedaController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
                    }
                },
                ncyBreadcrumb: {
                    label: 'Bovedas'
                }
            })
            .state('cooperativa.app.estructura.caja.editar.editar.abrir', {
                url: '/abrir',
                templateUrl: 'modules/cooperativa/client/views/caja/form-editar-caja-abrir.html',
                controller: 'Cooperativa.Caja.EditarCaja.AbrirController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
                    }
                }
            })
            .state('cooperativa.app.estructura.caja.editar.editar.cerrar', {
                url: '/cerrar',
                templateUrl: 'modules/cooperativa/client/views/caja/form-editar-caja-cerrar.html',
                controller: 'Cooperativa.Caja.EditarCaja.CerrarController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('ver-cajas', $q, $timeout, $http, $location, Auth);
                    }
                }
            })

            .state('cooperativa.app.transaccionInterna.buscarTransaccionesBovedaCaja', {
                url: '/buscarTransaccionesBovedaCaja',
                templateUrl: 'modules/cooperativa/client/views/transaccionInterna/form-buscar-transaccionBovedaCaja.html',
                controller: 'Cooperativa.BuscarTransaccionBovedaCajaController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('PUBLIC', $q, $timeout, $http, $location, Auth);
                    }
                }
            })

            .state('cooperativa.app.transaccionInterna.buscarTransaccionesCajaCaja', {
                url: '/buscarTransaccionesCajaCaja',
                templateUrl: 'modules/cooperativa/client/views/transaccionInterna/form-buscar-transaccionCajaCaja.html',
                controller: 'Cooperativa.BuscarTransaccionCajaCajaController',
                resolve: {
                    loggedin: function ($q, $timeout, $http, $location, Auth) {
                        return checkUserRole('PUBLIC', $q, $timeout, $http, $location, Auth);
                    }
                }
            });
    }
]);
