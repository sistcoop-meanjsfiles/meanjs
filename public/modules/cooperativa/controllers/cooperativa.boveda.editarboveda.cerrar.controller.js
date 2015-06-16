'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Boveda.EditarBoveda.CerrarController',
    function($scope, $state, boveda, toastr){

        $scope.view = {
            boveda: boveda
        };

        $scope.view.loaded = {
            detalle: []
        };

        $scope.loadDetalle = function(){
            $scope.view.boveda.$getDetalle().then(function(response){
                $scope.view.loaded.detalle = response;
                angular.forEach($scope.view.loaded.detalle, function(row){
                    row.getSubTotal = function(){
                        return this.valor * this.cantidad;
                    };
                });
            });
        };
        $scope.loadDetalle();

        $scope.getTotal = function(){
            var total = 0;
            for(var i = 0; i < $scope.view.loaded.detalle.length; i++) {
                total = total + $scope.view.loaded.detalle[i].getSubTotal();
            }
            return total;
        };

        $scope.submit = function(){
            if($scope.view.boveda.abierto === false){
                toastr.warning('Boveda cerrada, no se puede cerrar nuevamente');
                return;
            }
            if($scope.view.boveda.estado === false){
                toastr.info('Boveda inactiva, no se puede cerrar');
                return;
            }

            if ($scope.form.$valid) {
                $scope.view.boveda.$cerrar().then(
                    function(response){
                        toastr.success('Boveda cerrada satisfactoriamente');
                        $scope.view.boveda.abierto = false;
                        $scope.view.boveda.estadoMovimiento = false;
                    },
                    function error(err){
                        toastr.error(err.data.message);
                    }
                );
            }
        };

    });
