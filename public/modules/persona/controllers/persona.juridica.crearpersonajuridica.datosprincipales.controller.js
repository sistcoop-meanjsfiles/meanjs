'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.CrearPersonaJuridica.DatosPrincipalesController',
	function ($scope, $state, $stateParams, toastr, SGPersonaJuridica, SGCountryCode, SGTipoDocumento, SGTipoEmpresa) {

		$scope.combo = {
			pais: undefined,
			tipoDocumento: undefined,
			tipoEmpresa: undefined
		};
		$scope.combo.selected = {
			pais: undefined,
			tipoDocumento: undefined,
			tipoEmpresa: undefined
		};

		$scope.loadCombo = function () {
			$scope.combo.pais = SGCountryCode.$search().$object;
			$scope.combo.tipoDocumento = SGTipoDocumento.$search({tipoPersona: 'juridica'}).$object;
			$scope.combo.tipoEmpresa = SGTipoEmpresa.$search().$object;
		};

		$scope.check = function ($event) {
			if ($event) {
				$event.preventDefault();
			}
			if ($scope.combo.selected.tipoDocumento && $scope.view.persona.numeroDocumento) {
				SGPersonaJuridica.$findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.abreviatura, $scope.view.persona.numeroDocumento).then(function (response) {
					if (response) {
						toastr.warn('Documento de identidad NO disponible');
					} else {
						toastr.info('Documento de identidad disponible');
					}
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
