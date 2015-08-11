'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Caja.Editar.BovedaCaja.Historial.CrearController',
	function ($scope, $state, toastr, bovedaCaja) {

		$scope.changed = false;

		$scope.view = {
			bovedaCaja: bovedaCaja
		};

		$scope.view.load = {
			historialActivo: undefined,
			detalleHistorialActivo: []//Detalle de monedas en boveda {cantidad:'10', valor: '200.00'}
		};

		$scope.loadHistorialActivo = function () {
			$scope.view.bovedaCaja.SGHistorialBovedaCaja().$search({estado: true}).then(function (response) {
				if (response.length) {

					$scope.view.load.historialActivo = response[0];

					$scope.view.load.historialActivo.$getDetalle().then(function (detalle) {
						$scope.view.load.detalleHistorialActivo = detalle;
						angular.forEach($scope.view.load.detalleHistorialActivo, function (row) {
							row.getSubTotal = function () {
								return this.valor * this.cantidad;
							};
						});
					});

				}
			});
		};
		$scope.loadHistorialActivo();

		$scope.getTotal = function () {
			var total = 0;
			for (var i = 0; i < $scope.view.load.detalleHistorialActivo.length; i++) {
				total = total + $scope.view.load.detalleHistorialActivo[i].getSubTotal();
			}
			return total;
		};

		$scope.save = function () {
			if ($scope.view.bovedaCaja.estado === false) {
				toastr.warning('Bovedacaja inactiva, no se puede abrir.');
				return;
			}
			if ($scope.view.load.historialActivo) {
				if ($scope.view.load.historialActivo.abierto) {
					toastr.warning('Bovedacaja abierta, no se puede abrir.');
					return;
				}
			}

			var historialBovedaCaja = $scope.view.bovedaCaja.SGHistorialBovedaCaja().$build();

			historialBovedaCaja.$save().then(
				function (response) {
					$scope.changed = true;
					toastr.success('BovedaCaja abierta');
					$state.go('^.buscar');
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);
		};

	});
