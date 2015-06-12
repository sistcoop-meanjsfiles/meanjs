'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Boveda.CrearBovedaController',
	function ($scope, $state, sucursales, agencias, SGCurrency, SGSucursal, SGBoveda, toastr) {

		$scope.view = {
			boveda: SGBoveda.$build()
		};

		$scope.combo = {
			sucursal: undefined,
			agencia: undefined,
			moneda: undefined
		};
		$scope.combo.selected = {
			sucursal: undefined,
			agencia: undefined,
			moneda: undefined
		};

		$scope.loadCombo = function () {
			$scope.combo.moneda = SGCurrency.$search().$object;

			if (angular.isArray(sucursales)) {
				$scope.combo.sucursal = sucursales;
				$scope.$watch('combo.selected.sucursal', function () {
					if (angular.isDefined($scope.combo.selected.sucursal)) {
						$scope.combo.agencia = $scope.combo.selected.sucursal.$getAgencias().$object;
					}
				}, true);
			} else {
				$scope.combo.sucursal = [sucursales];
				$scope.combo.agencia = [agencias];

				$scope.combo.selected.sucursal = sucursales;
				$scope.combo.selected.agencia = agencias;
			}
		};
		$scope.loadCombo();


		$scope.save = function () {

			$scope.view.boveda.moneda = $scope.combo.selected.moneda.alphabeticCode;
			$scope.view.boveda.agencia = $scope.combo.selected.agencia.codigo;

			$scope.view.boveda.$save().then(
				function (response) {
					toastr.success('Boveda creada');
					$state.go('^.editarBoveda.resumen', {id: response.id});
				},
				function error(error) {
					toastr.error(error.data.message);
				}
			);

		};

	});
