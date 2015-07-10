'use strict';

/* jshint -W098 */
angular.module('producto').controller('Producto.CuentaPersonal.CrearController',
	function ($scope, $state, toastr, SGProductoCuentaPersonal, SGCurrency, SGTipoPersona, SGTipoCuentaPersonal) {

		$scope.view = {
			producto: SGProductoCuentaPersonal.$build()
		};

		$scope.combo = {
			tipoCuenta: undefined,
			tipoPersona: undefined,
			moneda: undefined
		};
		$scope.combo.selected = {
			tipoCuenta: undefined,
			tipoPersona: undefined,
			moneda: undefined
		};

		$scope.loadCombo = function () {
			$scope.combo.tipoCuenta = SGTipoCuentaPersonal.$search().$object;
			$scope.combo.tipoPersona = SGTipoPersona.$search().$object;
			$scope.combo.moneda = SGCurrency.$search().$object;
		};
		$scope.loadCombo();

		$scope.submit = function () {
			if ($scope.form.$valid) {
				$scope.view.producto.moneda = $scope.combo.selected.moneda.alphabeticCode;
				$scope.view.producto.tipoPersona = $scope.combo.selected.tipoPersona.denominacion;
				$scope.view.producto.$save().then(
					function (response) {
						toastr.success('Producto creado satisfactoriamente', 'Success');
						$state.go('^.editarProductoCredito.resumen', {id: response.id});
					},
					function error(err) {
						toastr.error(err.data.message, 'Error');
					}
				);

			}
		};
	}
);
