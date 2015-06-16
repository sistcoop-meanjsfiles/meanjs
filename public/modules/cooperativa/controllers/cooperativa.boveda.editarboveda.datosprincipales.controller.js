'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Boveda.EditarBoveda.DatosPrincipalesController',
	function ($scope, boveda, toastr, SGAgencia) {

		$scope.view = {
			boveda: boveda
		};

		$scope.view.load = {
			agencia: undefined
		};

		$scope.loadAgencia = function () {
			$scope.view.load.agencia = SGAgencia.$findByUrl($scope.view.boveda.agencia).$object;
		};
		$scope.loadAgencia();

		$scope.save = function () {
			$scope.view.boveda.$save().then(
				function (response) {
					toastr.success('Boveda actualizada');
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);
		};

	}
);
