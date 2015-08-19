'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Trabajador.CrearTrabajadorController',
	function ($scope, $state, sucursales, agencias, SGTrabajador, SGPersonaNatural, SGTipoDocumento, toastr) {

		$scope.view = {
			trabajador: SGTrabajador.$build()
		};

		$scope.view.loaded = {
			persona: undefined,
			trabajador: undefined
		};

		$scope.combo = {
			sucursal: undefined,
			agencia: undefined,
			tipoDocumento: undefined
		};
		$scope.combo.selected = {
			sucursal: undefined,
			agencia: undefined,
			tipoDocumento: undefined
		};

		$scope.loadCombo = function () {
			$scope.combo.tipoDocumento = SGTipoDocumento.$search({tipoPersona: 'natural'}).$object;
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

		$scope.check = function ($event) {
			if (!angular.isUndefined($event)) {
				$event.preventDefault();
			}
			SGPersonaNatural.$findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.abreviatura, $scope.view.trabajador.numeroDocumento).then(function (response) {
				$scope.view.loaded.persona = response;
				if ($scope.view.loaded.persona) {
					toastr.info('Persona encontrada');
				} else {
					toastr.warning('Persona no encontrada');
				}
			});
			$scope.view.loaded.trabajador = SGTrabajador.$findByAtributos({
				tipoDocumento: $scope.combo.selected.tipoDocumento.abreviatura,
				numeroDocumento: $scope.view.trabajador.numeroDocumento
			}).$object;
		};

		$scope.save = function () {

			if (angular.isUndefined($scope.view.loaded.persona)) {
				toastr.warning('Debe de seleccionar una persona.');
				return;
			}
			if (angular.isDefined($scope.view.loaded.trabajador.id)) {
				toastr.warning('El trabajador ya fue registrado, no puede continuar.');
				return;
			}

			var trabajador = angular.copy($scope.view.trabajador);
			trabajador.tipoDocumento = $scope.combo.selected.tipoDocumento.abreviatura;
			trabajador.agencia = {
				denominacion: $scope.combo.selected.agencia.denominacion,
				sucursal: {
					denominacion: $scope.combo.selected.agencia.sucursal.denominacion
				}
			};

			trabajador.$save().then(
				function (response) {
					toastr.success('Trabajador creado');
					$state.go('^.editar.resumen', {trabajador: response.id});
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);

		};
	});
