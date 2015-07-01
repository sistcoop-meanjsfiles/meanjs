'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Caja.Editar.DatosPrincipalesController',
	function ($scope, caja, toastr, SGAgencia) {

		$scope.changed = false;

		$scope.view = {
			caja: caja
		};

		$scope.view.loaded = {
			agencia: undefined
		};

		$scope.loadAgencia = function () {
			$scope.view.loaded.agencia = SGAgencia.$findByUrl($scope.view.caja.agencia).$object;
		};
		$scope.loadAgencia();

		$scope.save = function () {
			if ($scope.view.caja.estado === false) {
				toastr.info('Caja inactiva, no se puede actualizar');
				return;
			}

			$scope.changed = true;

			$scope.view.caja.$save().then(
				function (response) {
					toastr.success('Caja actualizada');
					$scope.changed = false;
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);
		};


	});
