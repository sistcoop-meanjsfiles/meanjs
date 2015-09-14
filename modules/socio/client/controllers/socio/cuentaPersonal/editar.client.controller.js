'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.Socio.Editar.CuentaPersonal.EditarController',
	function ($scope, $state, boveda, historial) {

		$scope.view = {
			boveda: boveda,
			historial: historial
		};

	});
