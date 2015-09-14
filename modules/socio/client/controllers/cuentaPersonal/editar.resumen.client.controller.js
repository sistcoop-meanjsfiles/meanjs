'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.Socio.Editar.CuentaPersonal.Editar.ResumenController',
	function ($scope, $state, boveda, historial, toastr) {

		$scope.view = {
			boveda: boveda,
			historial: historial
		};

		$scope.view.load = {
			detalleHistorial: [],//Detalle de monedas en boveda {cantidad:'10', valor: '200.00'},
			transaccionesBovedaCaja: []
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

		$scope.loadTransaccionesBovedaCaja = function () {
			$scope.view.load.transaccionesBovedaCaja = $scope.view.historial.SGTransaccionBovedaCaja().$search().$object;
		};
		$scope.loadTransaccionesBovedaCaja();

		$scope.getTotal = function () {
			var total = 0;
			for (var i = 0; i < $scope.view.load.detalleHistorial.length; i++) {
				total = total + $scope.view.load.detalleHistorial[i].getSubTotal();
			}
			return total;
		};

	});
