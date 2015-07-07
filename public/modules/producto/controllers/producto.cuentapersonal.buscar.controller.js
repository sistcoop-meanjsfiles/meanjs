'use strict';

/* jshint -W098 */
angular.module('producto').controller('Producto.CuentaPersonal.BuscarController',
	function ($scope, $state) {

		$scope.filterOptions = {
			filterText: undefined,
			offset: 0,
			limit: 10
		};

		$scope.gridOptions = {
			data: [],
			enableRowSelection: true,
			enableRowHeaderSelection: false,
			multiSelect: false,
			columnDefs: [
				{field: 'tipoDocumento', displayName: 'Documento'},
				{field: 'numeroDocumento', displayName: 'Numero'},
				{field: 'razonSocial', displayName: 'Razon social'},
				{field: 'nombreComercial', displayName: 'Nombre comercial'},
				{field: 'tipoEmpresa', displayName: 'Tipo Empresa'},
				{
					name: 'edit',
					displayName: 'Edit',
					cellTemplate: '<div style="text-align: center; padding-top: 4px;"><button type="button" ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span>Editar</button></div>'
				}
			]
		};
		$scope.gridActions = {
			edit: function (row) {
				$state.go('^.editar', {personaJuridica: row.id});
			}
		};

		$scope.search = function () {
			$scope.gridOptions.data = SGPersonaJuridica.$search($scope.filterOptions).$object;
		};

	});
