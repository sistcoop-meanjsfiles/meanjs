'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Caja.BovedaCaja.Historial.TransaccionBovedaCaja.BuscarController',
	function ($scope, $state, historial) {

		$scope.view = {
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
