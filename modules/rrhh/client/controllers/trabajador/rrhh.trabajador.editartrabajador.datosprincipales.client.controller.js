'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Trabajador.EditarTrabajador.DatosPrincipalesController',
	function ($scope, trabajador, sucursales, agencias, SGPersonaNatural, SGAgencia, toastr) {

		$scope.view = {
			trabajador: trabajador
		};

		$scope.view.loaded = {
			persona: undefined
		};

		$scope.combo = {
			sucursal: undefined,
			agencia: undefined
		};
		$scope.combo.selected = {
			sucursal: undefined,
			agencia: undefined
		};

		$scope.loadCombo = function () {
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

		$scope.loadPersona = function () {
			var tipoDocumento = $scope.view.trabajador.tipoDocumento;
			var numeroDocumento = $scope.view.trabajador.numeroDocumento;
			$scope.view.loaded.persona = SGPersonaNatural.$findByTipoNumeroDocumento(tipoDocumento, numeroDocumento).$object;
		};
		$scope.loadPersona();

		$scope.save = function () {

			var trabajajador = {};
			angular.extend(trabajajador,
				$scope.view.trabajador,
				{
					agencia: {
						denominacion: $scope.combo.selected.agencia.denominacion,
						sucursal: {
							denominacion: $scope.combo.selected.sucursal.denominacion
						}
					}
				}
			);

			trabajajador.$save().then(
				function (response) {
					toastr.success('Trabajador actualizado satisfactoriamente');
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);

		};

	}
);
