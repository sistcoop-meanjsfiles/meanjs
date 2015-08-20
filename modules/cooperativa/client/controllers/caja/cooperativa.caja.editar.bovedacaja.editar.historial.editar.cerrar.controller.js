'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Caja.Editar.BovedaCaja.Historial.Editar.CerrarController',
	function ($scope, $state, toastr, historial) {

		$scope.changed = false;

		$scope.view = {
			historial: historial
		};

		$scope.view.load = {
			detalleHistorial: []//Detalle de monedas en boveda {cantidad:'10', valor: '200.00'},
		};

		$scope.loadDetalleHistorial = function () {
			$scope.view.historial.$getDetalle().then(function (response) {
				$scope.view.load.detalleHistorial = response;
				angular.forEach($scope.view.load.detalleHistorial, function (row) {
					row.getSubTotal = function () {
						return this.valor * this.cantidad;
					};
				});
			});
		};
		$scope.loadDetalleHistorial();

		$scope.getTotal = function () {
			var total = 0;
			for (var i = 0; i < $scope.view.load.detalleHistorial.length; i++) {
				total = total + $scope.view.load.detalleHistorial[i].getSubTotal();
			}
			return total;
		};

		$scope.cerrar = function () {
			$scope.view.historial.$cerrar().then(
				function (response) {
					$scope.changed = true;
					toastr.success('Historial cerrado');
					$state.go('^.resumen');
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);
		};

	});
