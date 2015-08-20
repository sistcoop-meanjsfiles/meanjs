'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Boveda.Editar.Historial.Editar.TransaccionBovedaCaja.EditarController',
	function ($scope, $state, toastr, boveda, historial, transaccion) {

		$scope.changed = true;

		$scope.view = {
			transaccion: transaccion
		};

		$scope.view.load = {
			detalle: []//Detalle de monedas en boveda {cantidad:'10', valor: '200.00'}
		};

		$scope.loadDetalle = function () {
			$scope.view.transaccion.$getDetalle().then(function (response) {
				$scope.view.load.detalle = response;
				angular.forEach($scope.view.load.detalle, function (row) {
					row.getSubTotal = function () {
						return this.valor * this.cantidad;
					};
				});
			});
		};
		$scope.loadDetalle();

		$scope.getTotal = function () {
			var total = 0;
			for (var i = 0; i < $scope.view.load.detalle.length; i++) {
				total = total + $scope.view.load.detalle[i].getSubTotal();
			}
			return total;
		};

		$scope.confirmar = function () {
			$scope.view.transaccion.$confirmar().then(
				function (response) {
					toastr.success('Transaccion confirmada');
					$state.go('^.buscar');
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);
		};

		$scope.cancelar = function () {
			$scope.view.transaccion.$cancelar().then(
				function (response) {
					$scope.changed = true;
					toastr.success('Transaccion cancelada');
					$state.go('^.buscar');
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);
		};

	});
