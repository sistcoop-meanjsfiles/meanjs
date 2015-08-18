'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.TipoDocumento.EditarTipoDocumentoController',
	function ($scope, $state, tipoDocumento, SGTipoDocumento, SGTipoPersona, toastr) {

		$scope.working = false;

		$scope.view = {
			tipoDocumento: tipoDocumento
		};

		$scope.combo = {
			tipoPersona: SGTipoPersona.$search().$object
		};
		$scope.combo.selected = {
			tipoPersona: tipoDocumento.tipoPersona
		};

		$scope.save = function () {
			$scope.view.tipoDocumento.tipoPersona = $scope.combo.selected.tipoPersona;

			$scope.working = true;

			$scope.view.tipoDocumento.$save().then(
				function (response) {
					$scope.working = false;
					toastr.success('Tipo documento actualizado');
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);
		};

		$scope.cancel = function(){
			$state.go('^.buscar');
		};
	});
