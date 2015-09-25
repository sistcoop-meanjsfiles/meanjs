'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Sucursal.Agencia.CrearAgenciaController',
    function ($scope, $state, toastr, sucursal) {

        $scope.working = false;

        $scope.view = {
            sucursal: sucursal,
            agencia: sucursal.SGAgencia().$build()
        };

        $scope.save = function () {
            $scope.working = true;
            $scope.view.agencia.$save().then(
                function (response) {
                    toastr.success('Agencia creada satisfactoriamente');
                    $scope.working = false;
                    $state.go('^.editar', {agencia: response.id});
                },
                function error(err) {
                    toastr.error(err.data.errorMessage);
                }
            );

        };

    });
