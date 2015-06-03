'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.TipoDocumento.CrearTipoDocumentoController',
	function ($scope, $state, SGTipoDocumento, SGTipoPersona, toastr) {

		$scope.view = {
			tipoDocumento: SGTipoDocumento.$build()
		};

		$scope.combo = {
			tipoPersona: SGTipoPersona.$search().$object
		};
		$scope.combo.selected = {
			tipoPersona: undefined
		};

		$scope.save = function () {
			$scope.view.tipoDocumento.$save().then(
				function (response) {
					toastr.success('Tipo documento creado');
					$state.go('^.editarTipoDocumento', {id: $scope.view.tipoDocumento.abreviatura});
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);
		};

	});
