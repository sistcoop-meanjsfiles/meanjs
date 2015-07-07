'use strict';

/* jshint -W098 */
angular.module('producto').controller('ProductoController', ['$scope', 'Global', 'Producto',
    function($scope, Global, Producto) {
        $scope.global = Global;
        $scope.package = {
            name: 'producto'
        };
    }
]);
