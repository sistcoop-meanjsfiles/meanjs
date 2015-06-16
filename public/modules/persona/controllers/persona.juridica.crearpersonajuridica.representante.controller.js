'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.CrearPersonaJuridica.RepresentanteController',
	function ($scope, $state, toastr, SGTipoDocumento, SGPersonaNatural) {

		$scope.verificarDatos = function () {
			if (!$scope.view.persona.razonSocial) {
				$state.go('^.datosPrincipales');
			}
		};
		$scope.verificarDatos();

		$scope.view = {
			representante: SGPersonaNatural.$build()
		};

		$scope.combo = {
			tipoDocumento: undefined
		};
		$scope.combo.selected = {
			tipoDocumento: undefined
		};

		$scope.loadCombo = function(){
			$scope.combo.tipoDocumento = SGTipoDocumento.$search({tipoPersona: 'natural'}).$object;
		};
		$scope.loadCombo();

		$scope.setRepresentante = function ($event) {
			if ($event) {
				$event.preventDefault();
			}
			if ($scope.combo.selected.tipoDocumento && $scope.representante.numeroDocumento) {
				SGPersonaNatural.$findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.abreviatura, $scope.view.representante.numeroDocumento).then(function (response) {
					if (response) {
						$scope.view.representante = response;
						$scope.view.persona.representanteLegal = response;
						toastr.info('Persona encontrada');
					} else {
						toastr.warning('Persona no encontrada');
					}
				});
			}
		};

	});
