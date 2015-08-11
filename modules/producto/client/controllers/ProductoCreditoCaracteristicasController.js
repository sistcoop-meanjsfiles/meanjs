'use strict';

/* jshint -W098 */
angular.module('producto').controller('ProductoCreditoCaracteristicasController', ['$scope', 'productoCredito', 'toastr', 'SGProductoCaracteristica',
    function($scope, productoCredito, toastr, SGProductoCaracteristica) {

        $scope.view = {
            producto: productoCredito,
            caracteristica: {}
        };

        //tabla de caracteristicas del producto
        $scope.loadObjects = {
            caracteristicas: []
        };

        $scope.loadCaracteristicas = function(){
            $scope.loadObjects.caracteristicas = $scope.view.producto.$getCaracteristicas().$object;
        };
        $scope.loadCaracteristicas();

        //Crear caracteristica
        $scope.submit = function(){
            if($scope.form.$valid){

                $scope.view.producto.$addCaracteristica($scope.view.caracteristica).then(
                    function(){
                        toastr.success('Caracteristica creada satisfactoriamente', 'Success');
                        $scope.view.caracteristica = {};
                        $scope.loadCaracteristicas();
                    },
                    function error(err){
                        toastr.error(err.data.message, 'Error');
                    }
                );

            }
        };

        //Actualizar caracteristica
        $scope.saveCaracteristica = function(data, id) {
            var obj = SGProductoCaracteristica.$new(id);
            angular.extend(obj, data);
            obj.$save().then(
                function(){
                    toastr.success('Caracteristica actualizada satisfactoriamente', 'Success');
                },
                function error(err){
                    toastr.error(err.data.message, 'Error');
                }
            );
        };

        //Eliminar caracteristica
        $scope.removeCaracteristica = function($index){
            var obj = $scope.loadObjects.caracteristicas[$index];
            SGProductoCaracteristica.$remove(obj.id).then(
                function(){
                    toastr.success('Caracteristica eliminada satisfactoriamente', 'Success');
                    $scope.loadObjects.caracteristicas.splice($index, 1);
                },
                function error(err){
                    toastr.error(err.data.message, 'Error');
                }
            );
        };

    }
]);
