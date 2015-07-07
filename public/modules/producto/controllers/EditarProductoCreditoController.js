'use strict';

/* jshint -W098 */
angular.module('producto').controller('EditarProductoCreditoController', ['$scope', '$state', 'productoCredito', 'toastr',
    function($scope, $state, productoCredito, toastr) {

        $scope.view = {
            producto: productoCredito
        };

        $scope.desactivar = function(){
            $scope.view.producto.$desactivar().then(
                function(response){
                    toastr.success('Producto desactivado', 'Success');
                },
                function error(err){
                    toastr.error(err.data.message, 'Error');
                }
            );
        };

    }
]);
