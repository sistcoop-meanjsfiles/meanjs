'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Caja.EditarCaja.AbrirController',
    function ($scope, $state, caja, toastr) {

        $scope.view = {
            caja: caja
        };

        $scope.view.loaded = {
            detalle: []
        };

        $scope.loadDetalle = function () {
            $scope.view.caja.$getDetalle().then(function (response) {
                $scope.view.loaded.detalle = response;

                angular.forEach($scope.view.loaded.detalle, function (row) {
                    row.total = 0;
                    angular.forEach(row.detalle, function (subRow) {
                        subRow.getSubTotal = function () {
                            return this.valor * this.cantidad;
                        };
                        row.total = row.total + (subRow.valor * subRow.cantidad);
                    });
                });
            });
        };
        $scope.loadDetalle();

        $scope.submit = function () {

            if ($scope.view.caja.estado === false) {
                toastr.info('Caja inactiva, no se puede actualizar');
                return;
            }
            if ($scope.view.caja.abierto === true) {
                toastr.warning('Caja abierta, no se puede abrir nuevamente');
                return;
            }

            if ($scope.form.$valid) {
                $scope.view.caja.$abrir().then(
                    function (response) {
                        toastr.success('Caja abierta');
                        $scope.view.caja.abierto = true;
                        $scope.view.caja.estadoMovimiento = true;
                        $scope.loadDetalle();
                    },
                    function error(err) {
                        toastr.error(err.data.message);
                    }
                );
            }

        };

    });
