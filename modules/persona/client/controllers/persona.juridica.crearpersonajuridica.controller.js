'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.CrearPersonaJuridicaController',
	function ($scope, $state, $stateParams, SGTipoEmpresa, SGTipoDocumento, SGCountryCode, SGPersonaJuridica, toastr) {

		$scope.view = {
			persona: SGPersonaJuridica.$build()
		};

		$scope.loadParams = function () {
			$scope.view.persona.tipoDocumento = $stateParams.tipoDocumento;
			$scope.view.persona.numeroDocumento = $stateParams.numeroDocumento;
		};
		$scope.loadParams();

		$scope.loadDefaultConfiguration = function () {
			$scope.view.persona.codigoPais = 'PER';
		};
		$scope.loadDefaultConfiguration();

		$scope.save = function () {

			if (!$scope.view.persona.representanteLegal || !$scope.view.persona.representanteLegal.id) {
				toastr.warning('Representante legal no definido.');
				return;
			}

			SGPersonaJuridica.$findByTipoNumeroDocumento($scope.view.persona.tipoDocumento, $scope.view.persona.numeroDocumento).then(function (response) {
				if (!response) {
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
				} else {
					toastr.error('Documento de identidad no disponible');
				}
			});

		};

	});
