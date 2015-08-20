'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Boveda.Editar.Historial.CrearController',
	function ($scope, $state, toastr, boveda, SGCurrency) {

		$scope.changed = false;

		$scope.view = {
			boveda: boveda
		};

		$scope.view.load = {
			historialActivo: undefined,
			detalleHistorialActivo: [],//Detalle de monedas en boveda {cantidad:'10', valor: '200.00'}
			denominaciones: []//Denominaciones existentes de una moneda
		};

		$scope.loadHistorialActivo = function () {
			$scope.view.boveda.SGHistorialBoveda().$search({estado: true}).then(function (response) {
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

		$scope.loadDenominaciones = function () {
			SGCurrency.$findByAlphabeticCode($scope.view.boveda.moneda).then(function (currency) {
				$scope.view.load.denominaciones = currency.$getDenominationsByAlphabeticCode($scope.view.boveda.moneda).$object;
			});
		};
		$scope.loadDenominaciones();

		$scope.getTotal = function () {
			var total = 0;
			for (var i = 0; i < $scope.view.load.detalleHistorialActivo.length; i++) {
				total = total + $scope.view.load.detalleHistorialActivo[i].getSubTotal();
			}
			return total;
		};

		$scope.save = function () {
			if ($scope.view.boveda.estado === false) {
				toastr.warning('Boveda inactiva, no se puede abrir.');
				return;
			}
			if ($scope.view.load.historialActivo) {
				if ($scope.view.load.historialActivo.abierto) {
					toastr.warning('Boveda abierta, no se puede abrir.');
					return;
				}
			}

			var historialBoveda = $scope.view.boveda.SGHistorialBoveda().$build();
			historialBoveda.detalle = [];
			for (var i = 0; i < $scope.view.load.denominaciones.length; i++) {
				historialBoveda.detalle[i] = {
					valor: $scope.view.load.denominaciones[i].value
				};
			}

			historialBoveda.$save().then(
				function (response) {
					$scope.changed = true;
					toastr.success('Boveda abierta');
					$state.go('^.buscar');
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);
		};

	});
