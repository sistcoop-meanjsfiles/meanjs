'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Sucursal.Agencia.BuscarAgenciaController',
    function ($scope, $state, toastr, sucursal, SGDialog) {

        $scope.view = {
            sucursal: sucursal
        };

        $scope.loadObjects = {
            agencias: []
        };

        $scope.loadAgencias = function () {
            $scope.view.sucursal.SGAgencia().$search().then(function (response) {
                $scope.loadObjects.agencias = response.items;
            });
        };
        $scope.loadAgencias();

        $scope.edit = function (row) {
            $state.go('^.editar', {agencia: row.id});
        };

        $scope.remove = function (row) {
            SGDialog.confirmDelete(row.denominacion, 'agencia', function () {
                row.$remove().then(
                    function (response) {
                        toastr.success('Agencia eliminada');
                        $scope.loadAgencias();
                    },
                    function error(err) {
                        toastr.error(err.data.errorMessage);
                    }
                );
            });
        };

    });
