'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Boveda.BuscarController',
    function ($scope, $state, SUCURSAL, AGENCIA, SGSucursal, SGBoveda) {

        $scope.combo = {
            sucursal: undefined,
            agencia: undefined
        };
        $scope.combo.selected = {
            sucursal: SUCURSAL ? SUCURSAL : undefined,
            agencia: AGENCIA ? AGENCIA : undefined
        };

        $scope.loadCombo = function () {
            SGSucursal.$getAll().then(function (response1) {
                $scope.combo.sucursal = response1;

                $scope.$watch('combo.selected.sucursal', function () {
                    if (angular.isDefined($scope.combo.selected.sucursal)) {
                        SGSucursal.$new($scope.combo.selected.sucursal.id).SGAgencia().$getAll().then(function (response2) {
                            $scope.combo.agencia = response2;
                        });
                    }
                }, true);
            });
        };
        $scope.loadCombo();

        var paginationOptions = {
            page: 1,
            pageSize: 10
        };

        $scope.filterOptions = {
            filterText: undefined,
            agencia: undefined,
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
                $state.go('^.editar', {boveda: row.id});
            }
        };

        $scope.search = function () {
            var agencia;
            if ($scope.combo.selected.sucursal && $scope.combo.selected.agencia) {
                agencia = SGSucursal.$new($scope.combo.selected.sucursal.id).SGAgencia().$new($scope.combo.selected.agencia.id);
            }

            $scope.filterOptions.agencia = agencia ? agencia.$getAbsoluteUrl() : undefined;
            SGBoveda.$search(angular.extend($scope.filterOptions, paginationOptions)).then(function (response) {
                $scope.gridOptions.data = response.items;
                $scope.gridOptions.totalItems = response.totalSize;
            });
        };

    }
);
