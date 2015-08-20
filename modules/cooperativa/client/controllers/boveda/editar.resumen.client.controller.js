'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Boveda.Editar.ResumenController',
	function ($scope, boveda) {

		$scope.view = {
			boveda: boveda
		};

		$scope.view.load = {
			agencia: undefined
		};

		$scope.loadAgencia = function () {
			//$scope.view.load.agencia = SGAgencia.$findByUrl($scope.view.boveda.agencia).$object;
		};
		//$scope.loadAgencia();

	}
);
