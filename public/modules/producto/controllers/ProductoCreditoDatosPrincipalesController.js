'use strict';

/* jshint -W098 */
angular.module('producto').controller('ProductoCreditoDatosPrincipalesController', ['$scope', 'productoCredito', 'toastr',
    function($scope, productoCredito, toastr) {

        $scope.view = {
            producto: productoCredito
        };

        $scope.submit = function(){
            if($scope.form.$valid){

                $scope.view.producto.$save().then(
                    function(response){
                        toastr.success('Producto actualizado', 'Success');
                    },
                    function error(err){
                        toastr.error(err.data.message, 'Error');
                    }
                );

            }
        };

    }
]);
