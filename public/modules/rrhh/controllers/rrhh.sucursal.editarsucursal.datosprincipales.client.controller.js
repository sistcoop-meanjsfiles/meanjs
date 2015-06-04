'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Sucursal.EditarSucursal.DatosPrincipalesController',
	function ($state, $scope, toastr, sucursal) {

		$scope.view = {
			sucursal: sucursal,
			sucursalDB: angular.copy(sucursal)
		};

		$scope.save = function () {

			$scope.view.sucursalDB.$save($scope.view.sucursal).then(
				function (response) {
					toastr.success('Sucursal actualizada');
					$state.go('^.datosPrincipales', {sucursal: $scope.view.sucursal.denominacion});
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);

		};

	});
