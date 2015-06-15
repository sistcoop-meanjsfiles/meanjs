'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.CrearPersonaJuridicaController',
	function ($scope, $state, $stateParams, SGTipoEmpresa, SGTipoDocumento, SGCountryCode, SGPersonaJuridica, toastr) {

		$scope.view = {
			persona: SGPersonaJuridica.$build()
		};

		$scope.save = function () {

			if (angular.isUndefined($scope.view.persona.representanteLegal)) {
				toastr.warning('Representante legal no definido.', 'Warning');
				return;
			}
			if (angular.isUndefined($scope.view.persona.representanteLegal.id)) {
				toastr.warning('Representante legal no definido.', 'Warning');
				return;
			}

			SGPersonaJuridica.$findByTipoNumeroDocumento($scope.view.persona.tipoDocumento, $scope.view.persona.numeroDocumento).then(function (response) {
				if (response) {
					toastr.error('Documento de identidad no disponible');
				} else {
					$scope.save();
				}
			});

			$scope.view.persona.representanteLegal = {
				tipoDocumento: $scope.view.persona.representanteLegal.tipoDocumento,
				numeroDocumento: $scope.view.persona.representanteLegal.numeroDocumento
			};
			$scope.view.persona.$save().then(
				function (response) {
					toastr.success('Persona creada');
					$state.go('^.^.editar', {personaJuridica: response.id});
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);
		};

	});
