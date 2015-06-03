'use strict';

// Setting up route
angular.module('mean.persona').config(['$stateProvider',
	function ($stateProvider) {

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

		$stateProvider
			.state('persona', {
				abstract: true,
				url: '/persona',
				templateUrl: '/modules/mean.persona/views/_body.html',
				controller: 'PersonaController'
			})
			.state('persona.home', {
				url: '/home',
				templateUrl: '/modules/mean.persona/views/index.html'
			})
			.state('persona.app', {
				url: '/app',
				templateUrl: '/modules/mean.persona/views/app.html'
			})

			.state('persona.app.personas', {
				url: '/personas',
				template: '<div ui-view></div>'
			})
			.state('persona.app.administracion', {
				url: '/administracion',
				template: '<div ui-view></div>'
			})

			//tipoDocumento
			.state('persona.app.administracion.buscarTipoDocumento', {
				url: '/buscarTipoDocumentos',
				templateUrl: '/modules/mean.persona/views/tipoDocumento/form-buscar-tipoDocumento.html',
				controller: 'Persona.BuscarTipoDocumentoController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-documentos', $q, $timeout, $http, $location, Auth);
					}
				}
			})
			.state('persona.app.administracion.crearTipoDocumento', {
				url: '/tipoDocumento',
				templateUrl: '/modules/mean.persona/views/tipoDocumento/form-crear-tipoDocumento.html',
				controller: 'Persona.CrearTipoDocumentoController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-documentos', $q, $timeout, $http, $location, Auth);
					}
				}
			})
			.state('persona.app.administracion.editarTipoDocumento', {
				url: '/tipoDocumento/:id',
				templateUrl: '/modules/mean.persona/views/tipoDocumento/form-editar-tipoDocumento.html',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-documentos', $q, $timeout, $http, $location, Auth);
					},
					tipoDocumento: function ($state, $stateParams, SGTipoDocumento) {
						return SGTipoDocumento.$find($stateParams.id);
					}
				},
				controller: 'Persona.EditarTipoDocumentoController'
			})

			//Personas
			.state('persona.app.personas.buscarPersonaNatural', {
				url: '/buscarPersonaNatural',
				templateUrl: '/modules/mean.persona/views/natural/form-buscar-personaNatural.html',
				controller: 'Persona.BuscarPersonaNaturalController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.crearPersonaNatural', {
				url: '/natural?tipoDocumento&numeroDocumento',
				templateUrl: '/modules/mean.persona/views/natural/form-crear-personaNatural.html',
				controller: 'Persona.CrearPersonaNaturalController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.editarPersonaNatural', {
				url: '/natural/{id:[0-9]{1,8}}',
				templateUrl: '/modules/mean.persona/views/natural/form-editar-personaNatural.html',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					},
					personaNatural: function ($state, $stateParams, SGPersonaNatural) {
						return SGPersonaNatural.$find($stateParams.id);
					}
				},
				controller: 'Persona.EditarPersonaNaturalController'
			}).state('persona.app.personas.editarPersonaNatural.resumen', {
				url: '/resumen',
				templateUrl: '/modules/mean.persona/views/natural/form-editar-resumen.html',
				controller: 'Persona.EditarPersonaNatural.ResumenController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.editarPersonaNatural.datosPrincipales', {
				url: '/principal',
				templateUrl: '/modules/mean.persona/views/natural/form-editar-datosPrincipales.html',
				controller: 'Persona.EditarPersonaNatural.DatosPrincipalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.editarPersonaNatural.datosAdicionales', {
				url: '/adicionales',
				templateUrl: '/modules/mean.persona/views/natural/form-editar-datosAdicionales.html',
				controller: 'Persona.EditarPersonaNatural.DatosAdicionalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			})

			.state('persona.app.personas.buscarPersonaJuridica', {
				url: '/juridica/buscar',
				templateUrl: '/modules/mean.persona/views/juridica/form-buscar-personaJuridica.html',
				controller: 'Persona.BuscarPersonaJuridicaController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.crearPersonaJuridica', {
				url: '/juridica?tipoDocumento&numeroDocumento',
				templateUrl: '/modules/mean.persona/views/juridica/form-crear-personaJuridica.html',
				controller: 'Persona.CrearPersonaJuridicaController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.crearPersonaJuridica.datosPrincipales', {
				url: '/principal',
				templateUrl: '/modules/mean.persona/views/juridica/form-crear-datosPrincipales.html',
				controller: 'Persona.CrearPersonaJuridica.DatosPrincipalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.crearPersonaJuridica.representante', {
				url: '/representante',
				templateUrl: '/modules/mean.persona/views/juridica/form-crear-representante.html',
				controller: 'Persona.CrearPersonaJuridica.RepresentanteController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			})

			.state('persona.app.personas.editarPersonaJuridica', {
				url: '/juridica/{id:[0-9]{1,8}}',
				templateUrl: '/modules/mean.persona/views/juridica/form-editar-personaJuridica.html',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					},
					personaJuridica: function ($state, $stateParams, SGPersonaJuridica) {
						return SGPersonaJuridica.$find($stateParams.id);
					}
				},
				controller: 'Persona.EditarPersonaJuridicaController'
			}).state('persona.app.personas.editarPersonaJuridica.resumen', {
				url: '/resumen',
				templateUrl: '/modules/mean.persona/views/juridica/form-editar-resumen.html',
				controller: 'Persona.EditarPersonaJuridica.ResumenController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.editarPersonaJuridica.datosPrincipales', {
				url: '/principal',
				templateUrl: '/modules/mean.persona/views/juridica/form-editar-datosPrincipales.html',
				controller: 'Persona.EditarPersonaJuridica.DatosPrincipalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.editarPersonaJuridica.datosAdicionales', {
				url: '/adicionales',
				templateUrl: '/modules/mean.persona/views/juridica/form-editar-datosAdicionales.html',
				controller: 'Persona.EditarPersonaJuridica.DatosAdicionalesController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.editarPersonaJuridica.representante', {
				url: '/representante',
				templateUrl: '/modules/mean.persona/views/juridica/form-editar-representante.html',
				controller: 'Persona.EditarPersonaJuridica.RepresentanteController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			}).state('persona.app.personas.editarPersonaJuridica.crearAccionista', {
				url: '/accionista',
				templateUrl: '/modules/mean.persona/views/juridica/form-editar-accionistas.html',
				controller: 'Persona.EditarPersonaJuridica.AccionistasController',
				resolve: {
					loggedin: function ($q, $timeout, $http, $location, Auth) {
						return checkUserRole('ver-personas', $q, $timeout, $http, $location, Auth);
					}
				}
			});
	}
]);
