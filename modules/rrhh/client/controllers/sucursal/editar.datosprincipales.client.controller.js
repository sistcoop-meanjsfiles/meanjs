'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Sucursal.EditarSucursal.DatosPrincipalesController',
    function ($state, $scope, toastr, sucursal) {

        $scope.working = false;

        $scope.view = {
            sucursal: sucursal
        };

        $scope.save = function () {
            $scope.working = true;
            $scope.view.sucursal.$save().then(
                function (response) {
                    $scope.working = false;
                    toastr.success('Sucursal actualizada');
                },
                function error(err) {
                    toastr.error(err.data.errorMessage);
                }
            );

        };

    });
