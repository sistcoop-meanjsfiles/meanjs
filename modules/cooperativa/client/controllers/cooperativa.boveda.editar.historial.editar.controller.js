'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Boveda.Editar.Historial.EditarController',
	function ($scope, $state, boveda, historial) {

		$scope.view = {
			boveda: boveda,
			historial: historial
		};

	});
