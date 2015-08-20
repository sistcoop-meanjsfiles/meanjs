'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Caja.CrearController',
    function ($scope, $state, toastr, SUCURSAL, AGENCIA, SGCaja, SGSucursal) {

        $scope.working = false;

        $scope.view = {
            caja: SGCaja.$build()
        };

        $scope.combo = {
            sucursal: undefined,
            agencia: undefined
        };
        $scope.combo.selected = {
            sucursal: SUCURSAL ? SUCURSAL : undefined,
            agencia: AGENCIA ? AGENCIA : undefined
        };

        $scope.loadCombo = function () {
            if ($scope.access.administrarCajas) {
                SGSucursal.$search().then(function (response1) {
                    $scope.combo.sucursal = response1.items;
                    $scope.$watch('combo.selected.sucursal', function () {
                        if (angular.isDefined($scope.combo.selected.sucursal)) {
                            SGSucursal.$new($scope.combo.selected.sucursal.id).SGAgencia().$search().then(function (response2) {
                                $scope.combo.agencia = response2.items;
                            });
                        }
                    }, true);
                });
            } else if ($scope.access.administrarCajasAgencia) {
                $scope.combo.sucursal = [SUCURSAL];
                $scope.combo.agencia = [AGENCIA];
            } else {
                console.log('User not authenticated for this action.');
            }
        };
        $scope.loadCombo();


        $scope.save = function () {
            $scope.working = true;
            $scope.view.caja.agencia = SGSucursal.$new($scope.combo.selected.agencia.sucursal.id).SGAgencia().$new($scope.combo.selected.agencia.id).$getAbsoluteUrl();
            $scope.view.caja.$save().then(
                function (response) {
                    toastr.success('Caja creada');
                    $state.go('^.editar', {caja: response.id});
                    $scope.working = false;
                },
                function error(err) {
                    toastr.error(err.data.message);
                }
            );
        };

    });
