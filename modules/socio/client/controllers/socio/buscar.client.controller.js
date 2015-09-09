'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.Socio.BuscarSocioController',
    function ($scope, $state, SGSocio) {

        var paginationOptions = {
            page: 1,
            pageSize: 10
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

            paginationPageSizes: [10, 25, 50],
            paginationPageSize: 10,
            useExternalPagination: true,
            useExternalSorting: true,

            columnDefs: [
                {field: 'tipoPersona', displayName: 'Tipo persona'},
                {field: 'tipoDocumento', displayName: 'Documento'},
                {field: 'numeroDocumento', displayName: 'Numero'},
                {field: 'fechaInicio', displayName: 'F.Inicio'},
                {field: 'fechaFin', displayName: 'F.Fin'},
                {field: 'estado', displayName: 'estado', cellFilter: 'si_no : "activo" | uppercase'},
                {
                    name: 'edit',
                    displayName: 'Edit',
                    cellTemplate: '' +
                    '<div style="text-align: center; padding-top: 5px;">' +
                    '<button type="button" ng-click="grid.appScope.gridActions.edit(row.entity)" class="btn btn-info btn-xs">' +
                    '<i class="pficon pficon-edit"></i>' +
                    '<span>&nbsp;Editar</span>' +
                    '</button>' +
                    '</div>'
                }
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    console.log('Order by. Not available.');
                });
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    paginationOptions.page = newPage;
                    paginationOptions.pageSize = pageSize;
                    $scope.search();
                });
            }
        };

        $scope.gridActions = {
            edit: function (row) {
                $state.go('^.editar', {socio: row.id});
            }
        };

        $scope.search = function () {
            SGSocio.$search(angular.extend($scope.filterOptions, paginationOptions)).then(function (response) {
                $scope.gridOptions.data = response.items;
                $scope.gridOptions.totalItems = response.totalSize;
            });
        };

    }
)
;
