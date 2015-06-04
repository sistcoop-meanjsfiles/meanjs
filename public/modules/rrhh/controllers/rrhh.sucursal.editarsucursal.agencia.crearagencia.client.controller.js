'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Sucursal.Agencia.CrearAgenciaController',
	function ($scope, $state, toastr, sucursal, SGAgencia) {

		$scope.view = {
			sucursal: sucursal,
			agencia: SGAgencia.$build()
		};

		$scope.save = function () {

			$scope.view.sucursal.$addAgencia($scope.view.agencia).then(
				function (response) {
					toastr.success('Agencia creada satisfactoriamente');
					$state.go('^.editarAgencia', {agencia: $scope.view.agencia.denominacion});
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);

		};

	});
