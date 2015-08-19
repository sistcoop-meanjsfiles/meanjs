'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Sucursal.EditarSucursal.ResumenController',
    function ($scope, sucursal) {

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

    });
