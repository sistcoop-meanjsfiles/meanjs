'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Caja.BuscarController',
    function($scope, $state, SGSucursal, SGAgencia, SGCaja) {

        $scope.combo = {
            sucursal: undefined,
            agencia: undefined
        };
        $scope.combo.selected = {
            sucursal: undefined,
            agencia: undefined
        };

        $scope.loadCombo = function(){
            $scope.combo.sucursal = SGSucursal.$search().$object;
            $scope.$watch('combo.selected.sucursal', function(){
                if(angular.isDefined($scope.combo.selected.sucursal)){
                    $scope.combo.agencia = $scope.combo.selected.sucursal.$getAgencias().$object;
                }
            }, true);
        };
        $scope.loadCombo();



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
                {field: 'agencia.denominacion', displayName: 'Agencia'},
                {field: 'denominacion', displayName: 'Denominacion'},
                {field: 'abierto', displayName: 'Abierto', cellFilter: 'si_no : "abierto" | uppercase'},
                {field: 'estadoMovimiento', displayName: 'Estado movimiento', cellFilter: 'si_no : "congelado" | uppercase'},
                {field: 'estado', cellFilter: 'si_no : "activo" | uppercase', displayName: 'Estado'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '<div style="text-align: center; padding-top: 4px;"><button type="button" ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span>Editar</button></div>'
                }
            ]
        };

        $scope.search = function(){
            angular.extend($scope.filterOptions, {agencia: SGAgencia.$new($scope.combo.selected.agencia.id).$getUrl()});
			SGCaja.$search($scope.filterOptions).then(function(response){
				$scope.gridOptions.data = response;
				angular.forEach($scope.gridOptions.data, function (row) {
					row.agencia = SGAgencia.$findByUrl(row.agencia).$object;
				});
			});
        };

        $scope.gridActions = {
            edit: function(row){
                $state.go('^.editar', {caja: row.id});
            }
        };

    }
);
