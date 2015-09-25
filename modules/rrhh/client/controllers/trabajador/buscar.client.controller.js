'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Trabajador.BuscarTrabajadorController',
    function ($scope, $state, SUCURSAL, AGENCIA, SGSucursal, SGTrabajador, SGPersonaNatural) {

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
            idSucursal: undefined,
            idAgencia: undefined
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
                {field: 'tipoDocumento', displayName: 'T.documento'},
                {field: 'numeroDocumento', displayName: 'Num.documento'},
                {field: 'persona.apellidoPaterno', displayName: 'A.Paterno'},
                {field: 'persona.apellidoMaterno', displayName: 'A.Materno'},
                {field: 'persona.nombres', displayName: 'Nombres'},
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
                $state.go('^.editar', {trabajador: row.id});
            }
        };

        $scope.search = function () {
            $scope.filterOptions.idSucursal = $scope.combo.selected.sucursal ? $scope.combo.selected.sucursal.id : undefined;
            $scope.filterOptions.idAgencia = $scope.combo.selected.agencia ? $scope.combo.selected.agencia.id : undefined;
            SGTrabajador.$search(angular.extend($scope.filterOptions, paginationOptions)).then(function (response1) {
                $scope.gridOptions.data = response1.items;
                $scope.gridOptions.totalItems = response1.totalSize;
                angular.forEach($scope.gridOptions.data, function (row) {
                    SGPersonaNatural.$search({tipoDocumento: row.tipoDocumento, numeroDocumento: row.numeroDocumento}).then(function (response2) {
                        row.persona = response2.items[0];
                    });
                });
            });
        };

    }
);
