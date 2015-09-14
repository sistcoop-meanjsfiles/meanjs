'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.CuentaPersonal.BuscarSocioController',
    function ($scope, $state, toastr, socio) {

        $scope.view = {
            socio: socio
        };

        $scope.view.load = {
            cuentasPersonales: undefined
        };

        $scope.filterOptions = {
            filterText: undefined,
            page: 0,
            pageSize: 10
        };

        $scope.loadCuentasPersonales = function () {
            $scope.view.socio.SGCuentaPersonal().$getAll().then(function (response) {
                $scope.view.load.cuentasPersonales = response;
            });
        };
        $scope.loadCuentasPersonales();

        $scope.edit = function (row) {
            $state.go('^.editar', {socio: row.id});
        };

    });
