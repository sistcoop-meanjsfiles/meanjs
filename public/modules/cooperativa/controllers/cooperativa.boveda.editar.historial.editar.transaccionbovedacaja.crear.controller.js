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
			detalleHistorialBoveda: []
		};

		$scope.combo = {
			caja: undefined
		};
		$scope.combo.selected = {
			caja: undefined
		};

		$scope.loadDetalleHistorialBoveda = function () {
			$scope.view.historialBoveda.$getDetalle().then(function (response) {
				$scope.view.load.detalleHistorialBoveda = response;
				angular.forEach($scope.view.load.detalleHistorialBoveda, function (row) {
					row.getSubTotal = function () {
						return this.valor * this.cantidad;
					};
				});
			});
		};
		$scope.loadDetalleHistorialBoveda();

		$scope.loadCombo = function () {
			$scope.combo.caja = SGCaja.$search({agencia: $scope.view.boveda.agencia});
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

		$scope.save = function () {

			var detalle = [];
			for (var i = 0; $scope.view.load.detalleHistorialBoveda.length; i++) {
				detalle[i] = {
					valor: $scope.view.load.detalleHistorialBoveda[i].valor,
					cantidad: $scope.view.load.detalleHistorialBoveda[i].cantidad
				};
			}

			$scope.view.transaccionBovedaCaja.origen = 'BOVEDA';
			$scope.view.transaccionBovedaCaja.historialBoveda = {id: $scope.view.historialBoveda.id};
			$scope.view.transaccionBovedaCaja.historialBovedaCaja = $scope.view.historialBovedaCaja.id;
			$scope.view.transaccionBovedaCaja.detalle = detalle;

			$scope.view.transaccionBovedaCaja.$save().then(
				function (response) {
					$scope.changed = true;
					toastr.success('Transaccion creada');
					$state.go('^.buscar');
				},
				function error(error) {
					toastr.error(error.data.message);
				}
			);
		};

	});
