'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Caja.Editar.BovedaCaja.BuscarController',
	function ($scope, $state, caja) {

		$scope.view = {
			caja: caja
		};

		$scope.view.load = {
			bovedaCaja: []
		};

		$scope.loadBovedaCajas = function () {
			$scope.view.load.bovedaCaja = $scope.view.caja.SGBovedaCaja().$search().$object;
		};
		$scope.loadBovedaCajas();

		$scope.edit = function (row) {
			$state.go('^.editar', {bovedaCaja: row.id});
		};

	});
