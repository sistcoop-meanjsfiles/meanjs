'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.TipoDocumento.BuscarTipoDocumentoController',
    function ($scope, $state, SGTipoDocumento) {

        var paginationOptions = {
            page: 1,
            pageSize: 2
        };

        $scope.filterOptions = {
            filterText: undefined,
            estado: true
        };

        $scope.gridOptions = {
            data: [],
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,

            paginationPageSizes: [2, 25, 50],
            paginationPageSize: 2,
            useExternalPagination: true,
            useExternalSorting: true,

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
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    paginationOptions.page = newPage;
                    paginationOptions.pageSize = pageSize;
                    $scope.search();
                });
            }
        };

        $scope.gridActions = {
            edit: function (row) {
                $state.go('^.editar', {documento: row.abreviatura});
            }
        };

        $scope.search = function () {
            SGTipoDocumento.$search(angular.extend($scope.filterOptions, paginationOptions)).then(function (response) {
                $scope.gridOptions.data = response.items;
                $scope.gridOptions.totalItems = response.totalSize;
            });
        };

    });
