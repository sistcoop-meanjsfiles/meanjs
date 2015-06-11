'use strict';

/* jshint -W098 */

angular.module('rrhh').controller('Rrhh.Trabajador.EditarTrabajador.ResumenController',
	function ($scope, trabajador, SGAgencia, SGPersonaNatural, SGUsuarioKeycloak) {

		$scope.view = {
			trabajador: trabajador
		};

		$scope.view.loaded = {
			persona: SGPersonaNatural.$findByTipoNumeroDocumento($scope.view.trabajador.tipoDocumento, $scope.view.trabajador.numeroDocumento).$object,
			userKeycloak: {
				rolesAssigned: []
			}
		};

		$scope.loadUsuario = function () {
			//Usuario de keycloak, para sacar roles
			var usuario = $scope.view.trabajador.usuario;
			if(usuario){
				SGUsuarioKeycloak.$realmRoles(usuario).then(function (response) {
					for (var i = 0; i < response.length; i++) {
						$scope.view.loaded.userKeycloak.rolesAssigned.push(response[i].name);
					}
				});
			}
		};
		$scope.loadUsuario();

		$scope.combo = {
			sucursal: undefined,
			agencia: undefined,
			tipoDocumento: undefined
		};
		$scope.combo.selected = {
			sucursal: undefined,
			agencia: undefined,
			tipoDocumento: undefined
		};

	});


