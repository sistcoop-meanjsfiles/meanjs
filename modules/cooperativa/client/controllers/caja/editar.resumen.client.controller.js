'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Caja.Editar.ResumenController',
    function ($scope, caja) {

        $scope.view = {
            caja: caja
        };

        $scope.view.load = {
            agencia: undefined,
            bovedaCajas: [],
            trabajadorCajas: []
        };

        $scope.loadAgencia = function () {
            //$scope.view.load.agencia = SGAgencia.$findByUrl($scope.view.caja.agencia).$object;
        };
        $scope.loadAgencia();

        $scope.loadBovedaCajas = function () {
            //$scope.view.load.bovedaCajas = $scope.view.caja.SGBovedaCaja().$search().$object;
        };
        $scope.loadBovedaCajas();

        $scope.loadTrabajadorCajas = function () {
            //$scope.view.load.trabajadorCajas = $scope.view.caja.SGTrabajadorCaja().$search().$object;
        };
        $scope.loadTrabajadorCajas();

    });
