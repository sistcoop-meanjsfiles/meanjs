'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Caja.Editar.BovedaCaja.Historial.BuscarController',
	function ($scope, $state, bovedaCaja) {

		$scope.view = {
			bovedaCaja: bovedaCaja
		};

		$scope.view.load = {
			historiales: []
		};

		$scope.filterOptions = {
			desde: undefined,
			hasta: undefined,
			filterText: undefined,
			firstResult: 0,
			maxResults: 10
		};

		$scope.loadHistoriales = function () {
			$scope.view.load.historiales = $scope.view.bovedaCaja.SGHistorialBovedaCaja().$search($scope.filterOptions).$object;
		};
		$scope.loadHistoriales();

		$scope.edit = function (row) {
			$state.go('^.editar', {historial: row.id});
		};

	});
