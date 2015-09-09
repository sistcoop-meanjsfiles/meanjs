'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.Socio.EditarSocio.ResumenController',
    function ($scope, $state, socio) {

        $scope.view = {
            socio: socio
        };

        $scope.view.load = {
            cuentaAporte: undefined,
            cuentasPersonales: undefined
        };

        $scope.loadCuentaAporte = function () {

        };
        $scope.loadCuentaAporte();

        $scope.loadCuentasPersonales = function () {

        };
        $scope.loadCuentasPersonales();

    });

