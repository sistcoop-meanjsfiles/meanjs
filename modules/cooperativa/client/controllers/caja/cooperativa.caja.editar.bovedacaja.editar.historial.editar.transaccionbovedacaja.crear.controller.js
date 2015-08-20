'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Caja.BovedaCaja.Historial.TransaccionBovedaCaja.CrearController',
	function ($scope, $state, toastr, historial, SGBoveda) {

		$scope.changed = false;

		$scope.view = {
			historialBovedaCaja: historial,

			transaccionBovedaCaja: historial.SGTransaccionBovedaCaja().$build(),
			historialBoveda: undefined
		};

		$scope.view.load = {
			detalleHistorialBoveda: undefined
		};

		$scope.combo = {
			boveda: undefined
		};
		$scope.combo.selected = {
			boveda: undefined
		};

		$scope.loadDetalleHistorialBoveda = function () {
			$scope.combo.selected.boveda.SGHistorialBoveda().$search({estado:true}).then(function(historiales){
				$scope.view.historialBoveda = historiales[0];
				$scope.view.historialBoveda.$getDetalle().then(function (response) {
					angular.forEach(response, function (row) {
						row.getSubTotal = function () {
							return this.valor * this.cantidad;
						};
					});
					$scope.view.load.detalleHistorialBoveda = response;
				});
			});

		};
		$scope.loadDetalleHistorialBoveda();

		$scope.loadCombo = function () {
			$scope.combo.boveda = SGBoveda.$search({agencia: $scope.view.caja.agencia}).$object;
		};
		$scope.loadCombo();

		$scope.getTotal = function () {
			if($scope.view.load.detalleHistorialBoveda) {
				var total = 0;
				for (var i = 0; i < $scope.view.load.detalleHistorialBoveda.length; i++) {
					total = total + $scope.view.load.detalleHistorialBoveda[i].getSubTotal();
				}
				return total;
			}
		};

		$scope.save = function () {

			var detalle = [];
			for (var i = 0; $scope.view.load.detalleHistorialBoveda.length; i++) {
				detalle[i] = {
					valor: $scope.view.load.detalleHistorialBoveda[i].valor,
					cantidad: $scope.view.load.detalleHistorialBoveda[i].cantidad
				};
			}

			$scope.view.transaccionBovedaCaja.origen = 'CAJA';
			$scope.view.transaccionBovedaCaja.historialBoveda = {id: $scope.view.historialBoveda.id};
			$scope.view.transaccionBovedaCaja.historialBovedaCaja = $scope.view.historialBovedaCaja.id;
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
