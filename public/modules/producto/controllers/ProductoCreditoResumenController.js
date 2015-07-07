'use strict';

/* jshint -W098 */
angular.module('producto').controller('ProductoCreditoResumenController', ['$scope', 'productoCredito',
    function($scope, productoCredito) {

        $scope.view = {
            producto: productoCredito
        };

        //tabla de caracteristicas del producto
        $scope.loadObjects = {
            tasas: [],
            caracteristicas: []
        };

        $scope.loadObjets = function(){
            $scope.loadObjects.tasas = $scope.view.producto.$getTasas().$object;
            $scope.loadObjects.caracteristicas = $scope.view.producto.$getCaracteristicas().$object;
        };
        $scope.loadObjets();

    }
]);
