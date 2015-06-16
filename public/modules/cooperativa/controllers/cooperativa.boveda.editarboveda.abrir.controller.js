'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Boveda.EditarBoveda.AbrirController', function(
    $scope, $state, boveda, SGCurrency, toastr){

    $scope.view = {
        boveda: boveda
    };

    $scope.view.loaded = {
        detalle: [],
        denominaciones: []
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

    $scope.loadDenominaciones = function(){
        SGCurrency.$findByAlphabeticCode($scope.view.boveda.moneda).then(function(currency){
            $scope.view.loaded.denominaciones = currency.$getDenominationsByAlphabeticCode($scope.view.boveda.moneda).$object;
        });
    };
    $scope.loadDenominaciones();

    $scope.getTotal = function(){
        var total = 0;
        for(var i = 0; i < $scope.view.loaded.detalle.length; i++) {
            total = total + $scope.view.loaded.detalle[i].getSubTotal();
        }
        return total;
    };

    $scope.submit = function(){
        if($scope.view.boveda.abierto === true){
            toastr.warning('Boveda abierta, no se puede abrir nuevamente');
            return;
        }
        if($scope.view.boveda.estado === false){
            toastr.warning('Boveda inactiva, no se puede abrir.');
            return;
        }

        var denominaciones = [];
        for(var i = 0; i < $scope.view.loaded.denominaciones.length; i++) {
            denominaciones[i] = $scope.view.loaded.denominaciones[i].value;
        }

        if ($scope.form.$valid) {
            $scope.view.boveda.$abrir(denominaciones).then(
                function(response){
                    toastr.success('Boveda abierta satisfactoriamente');
                    $scope.view.boveda.abierto = true;
                    $scope.view.boveda.estadoMovimiento = true;
                    $scope.loadDetalle();
                },
                function error(error){
                    toastr.error(error.data.message);
                }
            );
        }
    };

});
