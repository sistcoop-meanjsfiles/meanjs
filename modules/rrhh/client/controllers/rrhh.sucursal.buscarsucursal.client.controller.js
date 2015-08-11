'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Sucursal.BuscarSucursalController',
	function($scope, $state, SGSucursal){

    $scope.filterOptions = {
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
            {field: 'denominacion', displayName: 'Denominacion', width: '90%'},
            {
                name: 'edit',
                displayName: 'Edit',
                cellTemplate: '<div style="text-align: center; padding-top: 4px;"><button type="button" ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span>Editar</button></div>',
                width: '10%'
            }
        ]
    };

    $scope.search = function(){
        $scope.gridOptions.data = SGSucursal.$search($scope.filterOptions).$object;
    };

    $scope.gridActions = {
        edit: function(row){
            $state.go('^.editar.resumen', {sucursal: row.denominacion});
        }
    };

});
