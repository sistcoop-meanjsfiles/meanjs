'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.CrearPersonaJuridica.DatosPrincipalesController',
	function ($scope, SGCountryCode, SGTipoDocumento, SGTipoEmpresa) {

		$scope.combo = {
			pais: SGCountryCode.$search().$object,
			tipoDocumento: SGTipoDocumento.$search({tipoPersona: 'juridica'}).$object,
			tipoEmpresa: SGTipoEmpresa.$search().$object
		};
		$scope.combo.selected = {
			pais: undefined,
			tipoDocumento: undefined,
			tipoEmpresa: undefined
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
				SGPersonaJuridica.$findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.abreviatura, $scope.view.persona.numeroDocumento).then(function (data) {
					if (!data)
						toastr.info('Documento de identidad disponible', 'Info');
					else
						toastr.warn('Documento de identidad no disponible', 'Warning');
				});
			}
		};

		$scope.goTabRepresentante = function () {
			if ($scope.form.$valid) {
				$state.go('^.representante');
			} else {
				$scope.form.$setSubmitted();
			}
		};


	});
