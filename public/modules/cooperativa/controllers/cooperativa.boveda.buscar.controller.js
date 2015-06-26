'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Boveda.BuscarController',
	function ($scope, $state, sucursales, agencias, SGSucursal, SGAgencia, SGBoveda) {

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

		$scope.filterOptions = {
			agencia: undefined,
			estado: undefined,
			filterText: undefined,
			firstResult: 0,
			maxResults: 10
		};

		$scope.gridOptions = {
			data: [],
			enableRowSelection: true,
			enableRowHeaderSelection: false,
			multiSelect: false,
			columnDefs: [
				{field: 'moneda', displayName: 'Moneda'},
				{field: 'denominacion', displayName: 'Denominacion'},
				{field: 'abierto', displayName: 'Abierto', cellFilter: 'si_no : "abierto" | uppercase'},
				{
					field: 'estadoMovimiento',
					displayName: 'Estado movimiento',
					cellFilter: 'si_no : "congelado" | uppercase'
				},
				{field: 'estado', cellFilter: 'si_no : "activo" | uppercase', displayName: 'Estado'},
				{
					name: 'edit',
					displayName: 'Edit',
					cellTemplate: '<div style="text-align: center; padding-top: 4px;"><button type="button" ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span>Editar</button></div>'
				}
			]
		};

		$scope.search = function () {
			$scope.filterOptions.estado = true;
			$scope.filterOptions.agencia = SGAgencia.$new($scope.combo.selected.agencia.id).$getAbsoluteUrl();

			$scope.gridOptions.data = SGBoveda.$search($scope.filterOptions).$object;
		};

		$scope.gridActions = {
			edit: function (row) {
				$state.go('^.editar', {boveda: row.id});
			}
		};

	}
);
