'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.TipoDocumento.BuscarTipoDocumentoController',
	function ($scope, $state, SGTipoDocumento) {

		$scope.filterOptions = {
			filterText: undefined,
			firstResult: 0,
			maxResults: 10,
			estado: true
		};

		$scope.gridOptions = {
			data: [],
			enableRowSelection: true,
			enableRowHeaderSelection: false,
			multiSelect: false,
			columnDefs: [
				{field: 'abreviatura', displayName: 'Abreviatura'},
				{field: 'denominacion', displayName: 'Denominacion'},
				{field: 'cantidadCaracteres', displayName: 'Num.Caracteres'},
				{field: 'tipoPersona', displayName: 'T.persona'},
				{field: 'estado', displayName: 'estado', cellFilter: 'si_no : "activo" | uppercase'},
				{
					name: 'edit',
					displayName: 'Edit',
					cellTemplate: '<div style="text-align: center; padding-top: 5px;"><button type="button" ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span>Editar</button></div>'
				}
			]
		};
		$scope.gridActions = {
			edit: function (row) {
				$state.go('^.editar', {documento: row.abreviatura});
			}
		};

		$scope.search = function () {
			$scope.gridOptions.data = SGTipoDocumento.$search($scope.filterOptions).$object;
		};

	});
