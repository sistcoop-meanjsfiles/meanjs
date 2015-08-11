'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Boveda.Editar.Historial.Editar.TransaccionBovedaCaja.CrearController',
	function ($scope, $state, toastr, boveda, historial, SGCaja) {

		$scope.changed = false;

		$scope.view = {
			boveda: boveda,
			historialBoveda: historial,

			transaccionBovedaCaja: historial.SGTransaccionBovedaCaja().$build(),
			historialBovedaCaja: undefined
		};

		$scope.view.load = {
			detalleHistorialBoveda: undefined
		};

		$scope.combo = {
			caja: undefined
		};
		$scope.combo.selected = {
			caja: undefined
		};

		$scope.loadDetalleHistorialBoveda = function () {
			$scope.view.historialBoveda.$getDetalle().then(function (response) {
				angular.forEach(response, function (row) {
					row.getSubTotal = function () {
						return this.valor * this.cantidad;
					};
				});
				$scope.view.load.detalleHistorialBoveda = response;
			});
		};
		$scope.loadDetalleHistorialBoveda();

		$scope.loadCombo = function () {
			$scope.combo.caja = SGCaja.$search({agencia: $scope.view.boveda.agencia}).$object;
		};
		$scope.loadCombo();

		$scope.getHistorialActivoBovedaCaja = function () {
			$scope.combo.selected.caja.SGBovedaCaja().$search().then(function (bovedaCajas) {
				var bovedaCaja;
				for (var i = 0; i < bovedaCajas.length; i++) {
					if ($scope.view.boveda.id === bovedaCajas[i].boveda.id) {
						bovedaCaja = bovedaCajas[i];
					}
				}
				bovedaCaja.SGHistorialBovedaCaja().$search({estado: true}).then(function (historiales) {
					$scope.view.historialBovedaCaja = historiales[0];
				});
			});
		};
		$scope.$watch('combo.selected.caja', function (newVal, oldVal) {
			if (newVal) {
				$scope.getHistorialActivoBovedaCaja();
			}
		}, true);

		$scope.getTotal = function () {
			if ($scope.view.load.detalleHistorialBoveda) {
				var total = 0;
				for (var i = 0; i < $scope.view.load.detalleHistorialBoveda.length; i++) {
					total = total + $scope.view.load.detalleHistorialBoveda[i].getSubTotal();
				}
				return total;
			}
		};

		$scope.save = function () {

			var detalle = [];
			for (var i = 0; i < $scope.view.load.detalleHistorialBoveda.length; i++) {
				detalle[i] = {
					valor: $scope.view.load.detalleHistorialBoveda[i].valor,
					cantidad: $scope.view.load.detalleHistorialBoveda[i].cantidad
				};
			}

			$scope.view.transaccionBovedaCaja.origen = 'BOVEDA';
			$scope.view.transaccionBovedaCaja.historialBoveda = {id: $scope.view.historialBoveda.id};
			$scope.view.transaccionBovedaCaja.historialBovedaCaja = {id: $scope.view.historialBovedaCaja.id};
			$scope.view.transaccionBovedaCaja.detalle = detalle;

			$scope.view.transaccionBovedaCaja.$save().then(
				function (response) {
					$scope.changed = true;
					toastr.success('Transaccion creada');
					$state.go('^.buscar');
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);
		};

	});
