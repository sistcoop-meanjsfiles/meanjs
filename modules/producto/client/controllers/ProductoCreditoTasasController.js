'use strict';

/* jshint -W098 */
angular.module('producto').controller('ProductoCreditoTasasController', ['$scope', 'productoCredito', 'toastr', 'SGProductoTasa',
    function($scope, productoCredito, toastr, SGProductoTasa) {

        $scope.view = {
            producto: productoCredito,
            tasa: {}
        };

        //tabla de caracteristicas del producto
        $scope.loadObjects = {
            tasas: []
        };

        $scope.loadTasas = function(){
            $scope.loadObjects.tasas = $scope.view.producto.$getTasas().$object;
        };
        $scope.loadTasas();

        //Crear tasa
        $scope.submit = function(){
            if($scope.form.$valid){

                $scope.view.producto.$addTasa($scope.view.tasa).then(
                    function(){
                        toastr.success('Tasa creada satisfactoriamente', 'Success');
                        $scope.view.tasa = {};
                        $scope.loadTasas();
                    },
                    function error(err){
                        toastr.error(err.data.message, 'Error');
                    }
                );

            }
        };

        //Actualizar tasa
        $scope.saveTasa = function(data, id) {
            var obj = SGProductoTasa.$new(id);
            angular.extend(obj, data);
            obj.$save().then(
                function(){
                    toastr.success('Tasa actualizada satisfactoriamente', 'Success');
                },
                function error(err){
                    toastr.error(err.data.message, 'Error');
                }
            );
        };

        //Eliminar tasa
        $scope.removeTasa = function($index){
            var obj = $scope.loadObjects.tasas[$index];
            SGProductoTasa.$remove(obj.id).then(
                function(){
                    toastr.success('Tasa eliminada satisfactoriamente', 'Success');
                    $scope.loadObjects.tasas.splice($index, 1);
                },
                function error(err){
                    toastr.error(err.data.message, 'Error');
                }
            );
        };

    }
]);
