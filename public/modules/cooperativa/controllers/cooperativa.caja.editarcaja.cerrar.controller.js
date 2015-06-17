'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Caja.EditarCaja.CerrarController',
    function ($scope, $state, $filter, caja, toastr) {

        $scope.view = {
            caja: caja
        };

        $scope.view.loaded = {
            detalle: []
        };

        $scope.config = {
            checkbox: {
                cantidad: true
            }
        };

        $scope.loadDetalle = function () {
            $scope.view.caja.$getDetalle().then(function (response) {
                angular.forEach(response, function (row) {
                    angular.forEach(row.detalle, function (subRow) {
                        subRow.getSubTotal = function () {
                            return this.valor * this.cantidad;
                        };
                    });

                    row.getTotal = function () {
                        var total = 0;
                        angular.forEach(this.detalle, function (subRow) {
                            total = total + subRow.getSubTotal();
                        });
                        return total;
                    };
                });
                $scope.view.loaded.detalle = angular.copy(response);
            });
        };
        $scope.loadDetalle();

        $scope.submit = function () {

            if ($scope.view.caja.estado === false) {
                toastr.info('Caja inactiva, no se puede actualizar');
                return;
            }

            //verificar boveda abierta
            if ($scope.view.caja.abierto === false) {
                toastr.warning('Caja cerrada, no se puede cerrar nuevamente');
                return;
            }

            //verificar que las bovedas esten abiertas
            //cuadrando caja

            if ($scope.form.$valid) {
                var detalle = [];

                //obteniendo el detalle
                for(var i = 0; i<$scope.view.loaded.detalle.length; i++){
                    detalle[i] = {
                        moneda: $scope.view.loaded.detalle[i].moneda,
                        detalle: []
                    };

                    //poniendo detalle de valor cantidad
                    for(var j = 0; j<$scope.view.loaded.detalle[i].detalle.length; j++){
                        detalle[i].detalle[j] = {
                            valor: $scope.view.loaded.detalle[i].detalle[j].valor,
                            cantidad: $scope.view.loaded.detalle[i].detalle[j].cantidad
                        };
                    }
                }

                $scope.view.caja.$cerrar(detalle).then(
                    function (response) {
                        toastr.success('Caja cerrada satisfactoriamente');
                        $scope.view.caja.abierto = false;
                        $scope.view.caja.estadoMovimiento = false;
                        $scope.loadDetalle();
                    },
                    function error(err) {
                        toastr.error(err.data.message);
                    }
                );
            }
        };

    });
