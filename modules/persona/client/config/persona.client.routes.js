'use strict';

// Setting up route
angular.module('persona').config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {

		// Check if user has role
		var checkUserRole = function (role, $q, $timeout, $http, $location, Auth) {

			// Initialize a new promise
			var deferred = $q.defer();

			// ver-personas
			if (Auth.authz.hasResourceRole(role, 'persona')) {
				$timeout(deferred.resolve);
			}

			// Not ver-personas
			else {
				$timeout(deferred.reject);
				//$location.url('/auth/login');
				alert('No tiene los permisos para poder acceder a esta pagina');
			}

			return deferred.promise;
		};

		$urlRouterProvider.when('/console/:realm/persona/app', '/console/:realm/persona/app/personas/naturales');

		$urlRouterProvider.when('/console/:realm/persona/app/administracion/documentos', '/console/:realm/persona/app/administracion/documentos/buscar');

		$urlRouterProvider.when('/console/:realm/persona/app/personas/naturales', '/console/:realm/persona/app/personas/naturales/buscar');
		$urlRouterProvider.when('/console/:realm/persona/app/personas/juridicas', '/console/:realm/persona/app/personas/juridicas/buscar');

		$urlRouterProvider.when('/console/:realm/persona/app/personas/juridicas/crear', '/console/:realm/persona/app/personas/juridicas/crear/datosPrincipales');

		$urlRouterProvider.when('/console/:realm/persona/app/personas/naturales/editar/:personaNatural', '/console/:realm/persona/app/personas/naturales/editar/:personaNatural/resumen');
		$urlRouterProvider.when('/console/:realm/persona/app/personas/juridicas/editar/:personaJuridica', '/console/:realm/persona/app/personas/juridicas/editar/:personaJuridica/resumen');

		$stateProvider
			.state('console.persona', {
				abstract: true,
				url: '/persona',
				templateUrl: '/modules/persona/views/_body.html',
				controller: 'PersonaController'
			})
			.state('console.persona.home', {
				url: '/home',
				templateUrl: '/modules/persona/views/index.html',
				ncyBreadcrumb: {
					label: 'Index'
				}
			})
			.state('console.persona.app', {
				url: '/app',
				template: '<div ui-view></div>',
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			})

			.state('console.persona.app.persona', {
				url: '/personas',
				template: '<div ui-view></div>',
				abstract: true
			})
			.state('console.persona.app.administracion', {
				url: '/administracion',
				template: '<div ui-view></div>',
				abstract: true
			})

			//tipoDocumento
			.state('console.persona.app.administracion.documento', {
				url: '/documentos',
				template: '<div ui-view></div>',
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			})
			.state('console.persona.app.administracion.documento.buscar', {
				url: '/buscar',
				templateUrl: '/modules/persona/views/tipoDocumento/form-buscar-tipoDocumento.html',
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
			.state('console.persona.app.administracion.documento.crear', {
				url: '/crear',
				templateUrl: '/modules/persona/views/tipoDocumento/form-crear-tipoDocumento.html',
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
			.state('console.persona.app.administracion.documento.editar', {
				url: '/editar/:documento',
				templateUrl: '/modules/persona/views/tipoDocumento/form-editar-tipoDocumento.html',
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
			})

			//Personas naturales
			.state('console.persona.app.persona.natural', {
				url: '/naturales',
				template: '<div ui-view></div>',
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			})
			.state('console.persona.app.persona.natural.buscar', {
				url: '/buscar',
				templateUrl: '/modules/persona/views/natural/form-buscar-personaNatural.html',
				controller: 'Persona.Natural.BuscarPersonaNaturalController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Home'
				}
			}).state('console.persona.app.persona.natural.crear', {
				url: '/crear?tipoDocumento&numeroDocumento',
				templateUrl: '/modules/persona/views/natural/form-crear-personaNatural.html',
				controller: 'Persona.Natural.CrearPersonaNaturalController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Crear persona',
					parent: 'persona.app.persona.natural.buscar'
				}
			}).state('console.persona.app.persona.natural.editar', {
				url: '/editar/:personaNatural',
				templateUrl: '/modules/persona/views/natural/form-editar-personaNatural.html',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					},
					personaNatural: function ($state, $stateParams, SGPersonaNatural) {
						return SGPersonaNatural.$find($stateParams.personaNatural);
					}
				},
				controller: 'Persona.Natural.EditarPersonaNaturalController',
				ncyBreadcrumb: {
					label: 'Editar persona',
					parent: 'persona.app.persona.natural.buscar'
				}
			}).state('console.persona.app.persona.natural.editar.resumen', {
				url: '/resumen',
				templateUrl: '/modules/persona/views/natural/form-editar-resumen.html',
				controller: 'Persona.Natural.EditarPersonaNatural.ResumenController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			}).state('console.persona.app.persona.natural.editar.datosPrincipales', {
				url: '/datosPrincipales',
				templateUrl: '/modules/persona/views/natural/form-editar-datosPrincipales.html',
				controller: 'Persona.Natural.EditarPersonaNatural.DatosPrincipalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Datos principales'
				}
			}).state('console.persona.app.persona.natural.editar.datosAdicionales', {
				url: '/datosAdicionales',
				templateUrl: '/modules/persona/views/natural/form-editar-datosAdicionales.html',
				controller: 'Persona.Natural.EditarPersonaNatural.DatosAdicionalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Datos adicionales'
				}
			})

			//Personas juridicas
			.state('console.persona.app.persona.juridica', {
				url: '/juridicas',
				template: '<div ui-view></div>',
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			})
			.state('console.persona.app.persona.juridica.buscar', {
				url: '/buscar',
				templateUrl: '/modules/persona/views/juridica/form-buscar-personaJuridica.html',
				controller: 'Persona.Juridica.BuscarPersonaJuridicaController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Home'
				}
			}).state('console.persona.app.persona.juridica.crear', {
				url: '/crear?tipoDocumento&numeroDocumento',
				templateUrl: '/modules/persona/views/juridica/form-crear-personaJuridica.html',
				controller: 'Persona.Juridica.CrearPersonaJuridicaController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Crear persona juridica',
					parent: 'persona.app.persona.juridica.buscar'
				}
			}).state('console.persona.app.persona.juridica.crear.datosPrincipales', {
				url: '/datosPrincipales',
				templateUrl: '/modules/persona/views/juridica/form-crear-datosPrincipales.html',
				controller: 'Persona.Juridica.CrearPersonaJuridica.DatosPrincipalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			}).state('console.persona.app.persona.juridica.crear.representante', {
				url: '/representante',
				templateUrl: '/modules/persona/views/juridica/form-crear-representante.html',
				controller: 'Persona.Juridica.CrearPersonaJuridica.RepresentanteController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Representante legal'
				}
			})

			.state('console.persona.app.persona.juridica.editar', {
				url: '/editar/:personaJuridica',
				templateUrl: '/modules/persona/views/juridica/form-editar-personaJuridica.html',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					},
					personaJuridica: function ($state, $stateParams, SGPersonaJuridica) {
						return SGPersonaJuridica.$find($stateParams.personaJuridica);
					}
				},
				controller: 'Persona.Juridica.EditarPersonaJuridicaController',
				ncyBreadcrumb: {
					label: 'Editar persona juridica',
					parent: 'persona.app.persona.juridica.buscar'
				}
			}).state('console.persona.app.persona.juridica.editar.resumen', {
				url: '/resumen',
				templateUrl: '/modules/persona/views/juridica/form-editar-resumen.html',
				controller: 'Persona.Juridica.EditarPersonaJuridica.ResumenController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					skip: true // Never display this state in breadcrumb.
				}
			}).state('console.persona.app.persona.juridica.editar.datosPrincipales', {
				url: '/datosPrincipales',
				templateUrl: '/modules/persona/views/juridica/form-editar-datosPrincipales.html',
				controller: 'Persona.Juridica.EditarPersonaJuridica.DatosPrincipalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Datos principales'
				}
			}).state('console.persona.app.persona.juridica.editar.datosAdicionales', {
				url: '/datosAdicionales',
				templateUrl: '/modules/persona/views/juridica/form-editar-datosAdicionales.html',
				controller: 'Persona.Juridica.EditarPersonaJuridica.DatosAdicionalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Datos adicionales'
				}
			}).state('console.persona.app.persona.juridica.editar.representante', {
				url: '/representante',
				templateUrl: '/modules/persona/views/juridica/form-editar-representante.html',
				controller: 'Persona.Juridica.EditarPersonaJuridica.RepresentanteController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Representante legal'
				}
			}).state('console.persona.app.persona.juridica.editar.crearAccionista', {
				url: '/crearAccionista',
				templateUrl: '/modules/persona/views/juridica/form-editar-accionistas.html',
				controller: 'Persona.Juridica.EditarPersonaJuridica.AccionistasController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				},
				ncyBreadcrumb: {
					label: 'Crear accionista'
				}
			});
	}
]);
