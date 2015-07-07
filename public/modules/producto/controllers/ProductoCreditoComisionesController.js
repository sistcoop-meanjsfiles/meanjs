'use strict';

/* jshint -W098 */
angular.module('producto').controller('ProductoCreditoComisionesController', ['$scope', 'productoCredito', 'toastr', 'SGProductoComision', 'SGTipoValor', 'SGFrecuencia',
    function($scope, productoCredito, toastr, SGProductoComision, SGTipoValor, SGFrecuencia) {

        $scope.view = {
            producto: productoCredito,
            comision: {}
        };

        $scope.combo = {
            tipoValor: SGTipoValor.$search().$object,
            frecuencia: SGFrecuencia.$search().$object
        };
        $scope.combo.selected = {
            tipoPersona: undefined,
            moneda: undefined
        };

        //tabla de caracteristicas del producto
        $scope.loadObjects = {
            comisiones: []
        };

        $scope.loadComisiones = function(){
            $scope.loadObjects.comisiones = $scope.view.producto.$getComisiones().$object;
        };
        $scope.loadComisiones();

        //Crear comision
        $scope.submit = function(){
            if($scope.form.$valid){

                $scope.view.comision.tipoValor = $scope.combo.selected.tipoValor.denominacion;
                $scope.view.comision.frecuencia = $scope.combo.selected.frecuencia.denominacion;

                $scope.view.producto.$addComision($scope.view.comision).then(
                    function(){
                        toastr.success('Comision creada satisfactoriamente', 'Success');
                        $scope.view.comision = {};
                        $scope.loadComisiones();
                    },
                    function error(err){
                        toastr.error(err.data.message, 'Error');
                    }
                );

            }
        };

        //Actualizar comision
        $scope.saveComision = function(data, id) {
            var obj = SGProductoComision.$new(id);
            angular.extend(obj, data);
            obj.$save().then(
                function(){
                    toastr.success('Comision actualizada satisfactoriamente', 'Success');
                },
                function error(err){
                    toastr.error(err.data.message, 'Error');
                }
            );
        };

        //Eliminar comision
        $scope.removeComision = function($index){
            var obj = $scope.loadObjects.comisiones[$index];
            SGProductoComision.$remove(obj.id).then(
                function(){
                    toastr.success('Comision eliminada satisfactoriamente', 'Success');
                    $scope.loadObjects.comisiones.splice($index, 1);
                },
                function error(err){
                    toastr.error(err.data.message, 'Error');
                }
            );
        };

    }
]);
