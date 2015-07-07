'use strict';

/* jshint -W098 */
angular.module('producto').controller('BuscarProductoCreditoController', ['$scope', '$state', 'SGProductoCredito', 'SGTipoPersona',
    function($scope, $state, SGProductoCredito, SGTipoPersona) {

        $scope.combo = {
            tipoPersona: undefined,
            moneda: undefined
        };
        $scope.combo.selected = {
            tipoPersona: undefined,
            moneda: undefined
        };

        $scope.check = {
            moneda: undefined
        };

        $scope.loadCombo = function(){
            $scope.combo.tipoPersona = SGTipoPersona.$search().$object;
        };
        $scope.loadCombo();

        $scope.loadCheck = function(){
            $scope.check.moneda = {
                pen: true,
                usd: true,
                eur: true
            };
        };
        $scope.loadCheck();

        $scope.filterOptions = {
            filterText: undefined,
            firstResult: 0,
            maxResults: 10,

            tipoPersona: undefined,
            moneda: []
        };

        $scope.gridOptions = {
            data: [],
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            columnDefs: [
                {field: 'codigo', displayName: 'Codigo'},
                {field: 'denominacion', displayName: 'Denominacion'},
                {field: 'tipoPersona', displayName: 'T.persona'},
                {field: 'moneda', displayName: 'moneda'},
                {field: 'montoMinimo', displayName: 'Minimo', cellFilter: 'currency: ""'},
                {field: 'montoMaximo', displayName: 'Maximo', cellFilter: 'currency: ""'},
                {field: 'estado', displayName: 'Estado', cellFilter: 'si_no : "activo" | uppercase'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '<div style="text-align: center; padding-top: 5px;"><button type="button" ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-edit"></span>Editar</button></div>'
                }
            ]
        };

        $scope.gridActions = {
            edit: function(row){
                $state.go('^.editarProductoCredito.resumen', {id: row.id});
            }
        };

        $scope.nuevo = function(){
            $state.go('^.crearProductoCredito');
        };

        $scope.search = function(){


            if($scope.combo.selected.tipoPersona){
                $scope.filterOptions.tipoPersona = $scope.combo.selected.tipoPersona.denominacion;
            }

            $scope.filterOptions.moneda = [];
            if($scope.check.moneda.pen === true) {
                $scope.filterOptions.moneda[0] = 'PEN';
            }
            if($scope.check.moneda.usd) {
                $scope.filterOptions.moneda[1] = 'USD';
            }
            if($scope.check.moneda.eur) {
                $scope.filterOptions.moneda[2] = 'EUR';
            }

            $scope.gridOptions.data = SGProductoCredito.$search($scope.filterOptions).$object;
        };

    }
]);
