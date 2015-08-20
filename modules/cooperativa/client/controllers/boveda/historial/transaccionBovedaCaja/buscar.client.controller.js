'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Boveda.Editar.Historial.Editar.TransaccionBovedaCaja.BuscarController',
	function ($scope, $state, historial, SGBoveda) {

		$scope.view = {
			historial: historial
		};

		$scope.view.load = {
			transaccionesBovedaCaja: []
		};

		$scope.loadTransaccionesBovedaCaja = function () {
			$scope.view.historial.SGTransaccionBovedaCaja().$search().then(function(historiales){
				$scope.view.load.transaccionesBovedaCaja = historiales;
				angular.forEach($scope.view.load.transaccionesBovedaCaja, function (row) {
					//row.boveda = SGPersonaNatural.$findByTipoNumeroDocumento(row.tipoDocumento, row.numeroDocumento).$object;
				});
				angular.forEach($scope.view.load.transaccionesBovedaCaja, function (row) {
					row.detalle = row.$getDetalle().$object;
				});
			});
		};
		$scope.loadTransaccionesBovedaCaja();

		$scope.edit = function (row) {
			$state.go('^.editar', {transaccion: row.id});
		};

	});
