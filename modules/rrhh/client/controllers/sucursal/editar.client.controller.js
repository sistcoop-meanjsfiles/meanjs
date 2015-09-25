'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Sucursal.EditarSucursalController',
    function ($scope, $state, toastr, sucursal, SGDialog) {

        $scope.view = {
            sucursal: sucursal
        };

        $scope.remove = function () {

            SGDialog.confirmDelete($scope.view.sucursal.denominacion, 'sucursal', function () {
                $scope.view.sucursal.$remove().then(
                    function (response) {
                        toastr.success('Sucursal eliminada');
                        $state.go('rrhh.app.organizacion.sucursal.buscar');
                    },
                    function error(err) {
                        toastr.error(err.data.errorMessage);
                    }
                );
            });

        };

    });
