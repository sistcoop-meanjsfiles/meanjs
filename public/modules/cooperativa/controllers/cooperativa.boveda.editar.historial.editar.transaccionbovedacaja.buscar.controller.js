'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Boveda.Editar.Historial.Editar.TransaccionBovedaCaja.BuscarController',
	function ($scope, $state, boveda, historial, toastr) {

		$scope.view = {
			boveda: boveda,
			historial: historial
		};

		$scope.view.load = {
			transaccionesBovedaCaja: []
		};

		$scope.loadTransaccionesBovedaCaja = function () {
			$scope.view.load.transaccionesBovedaCaja = $scope.view.historial.SGTransaccionBovedaCaja().$search().$object;
		};
		$scope.loadTransaccionesBovedaCaja();

		$scope.edit = function (row) {
			$state.go('^.editar', {transaccion: row.id});
		};

	});
