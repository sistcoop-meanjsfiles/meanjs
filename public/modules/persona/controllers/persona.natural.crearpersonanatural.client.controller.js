'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Natural.CrearPersonaNaturalController',
	function ($scope, $state, $stateParams, toastr, SGCountryCode, SGTipoDocumento, SGEstadoCivil, SGSexo, SGPersonaNatural) {

		$scope.view = {
			persona: SGPersonaNatural.$build()
		};

		$scope.combo = {
			pais: SGCountryCode.$search().$object,
			tipoDocumento: SGTipoDocumento.$search({tipoPersona: 'natural'}).$object,
			sexo: SGSexo.$search().$object,
			estadoCivil: SGEstadoCivil.$search().$object
		};
		$scope.combo.selected = {
			pais: undefined,
			tipoDocumento: undefined,
			sexo: undefined,
			estadoCivil: undefined
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

		$scope.check = function ($event) {
			if (!angular.isUndefined($event))
				$event.preventDefault();
			if (!angular.isUndefined($scope.combo.selected.tipoDocumento) && !angular.isUndefined($scope.view.persona.numeroDocumento)) {
				SGPersonaNatural.$findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.abreviatura, $scope.view.persona.numeroDocumento).then(function (data) {
					if (!data)
						toastr.info('Documento de identidad disponible');
					else
						toastr.warning('Documento de identidad no disponible');
				});
			}
		};

		$scope.save = function () {
			var save = function () {
				$scope.view.persona.$save().then(
					function (response) {
						toastr.success('Persona creada');
						$state.go('^.editar', {personaNatural: response.id});
					},
					function error(err) {
						toastr.error(err.data.message);
					}
				);
			};
			SGPersonaNatural.$findByTipoNumeroDocumento($scope.view.persona.tipoDocumento, $scope.view.persona.numeroDocumento).then(function (data) {
				if (data) {
					toastr.error('Documento de identidad no disponible', 'Error');
				} else {
					save();
				}
			});
		};

	});
