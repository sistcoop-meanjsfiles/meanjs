'use strict';

/* jshint -W098 */
angular.module('mean.persona').controller('Persona.BuscarPersonaJuridicaController', function($scope, $state, SGPersonaJuridica){

    $scope.nuevo = function(){
        $state.go('^.crearPersonaJuridica.datosPrincipales');
    };

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
        edit: function(row){
            $state.go('^.editarPersonaJuridica.resumen', {id: row.id});
        }
    };

    $scope.search = function(){
        $scope.gridOptions.data = SGPersonaJuridica.$search($scope.filterOptions).$object;
    };

});