'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Sucursal.CrearSucursalController',
    function ($scope, $state, SGSucursal, toastr) {

        $scope.working = false;

        $scope.view = {
            sucursal: SGSucursal.$build()
        };

        $scope.save = function () {
            $scope.working = true;
            $scope.view.sucursal.$save().then(
                function (response) {
                    toastr.success('Sucursal creada satisfactoriamente');
                    $scope.working = false;
                    $state.go('^.editar.resumen', {sucursal: response.id});
                },
                function error(err) {
                    toastr.error(err.data.errorMessage);
                }
            );
        };

    });
