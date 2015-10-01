'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Boveda.CrearController',
    function ($scope, $state, toastr, SUCURSAL, AGENCIA, SGSucursal, SGCurrency, SGBoveda) {

        $scope.working = false;

        $scope.view = {
            boveda: SGBoveda.$build()
        };

        $scope.combo = {
            sucursal: undefined,
            agencia: undefined,
            moneda: undefined
        };
        $scope.combo.selected = {
            sucursal: SUCURSAL ? SUCURSAL : undefined,
            agencia: AGENCIA ? AGENCIA : undefined,
            moneda: undefined
        };

        $scope.directAccess = {
            moneda: [{
                alphabeticCode: 'PEN',
                currency: 'Nuevo Sol',
                entity: 'PERU'
            }, {
                alphabeticCode: 'USD',
                currency: 'US Dollar',
                entity: 'UNITED STATES'
            }, {
                alphabeticCode: 'EUR',
                currency: 'Euro',
                entity: 'EUROPEAN UNION'
            }]
        };

        $scope.loadCombo = function () {
            SGCurrency.$getAll().then(function (response) {
                $scope.combo.moneda = response;
            });

            if ($scope.access.administrarBovedas) {
                SGSucursal.$getAll().then(function (response1) {
                    $scope.combo.sucursal = response1;
                    $scope.$watch('combo.selected.sucursal', function () {
                        if (angular.isDefined($scope.combo.selected.sucursal)) {
                            SGSucursal.$new($scope.combo.selected.sucursal.id).SGAgencia().$getAll().then(function (response2) {
                                $scope.combo.agencia = response2;
                            });
                        }
                    }, true);
                });
            } else if ($scope.access.administrarBovedasAgencia) {
                $scope.combo.sucursal = [SUCURSAL];
                $scope.combo.agencia = [AGENCIA];
            } else {
                console.log('User not authenticated for this action.');
            }
        };
        $scope.loadCombo();


        $scope.save = function () {
            $scope.view.boveda.moneda = $scope.combo.selected.moneda.alphabeticCode;
            $scope.view.boveda.agencia = SGSucursal.$new($scope.combo.selected.agencia.sucursal.id).SGAgencia().$new($scope.combo.selected.agencia.id).$getAbsoluteUrl();

            $scope.working = true;
            $scope.view.boveda.$save().then(
                function (response) {
                    $scope.working = false;
                    toastr.success('Boveda creada');
                    $state.go('^.editar', {boveda: response.id});
                },
                function error(err) {
                    toastr.error(err.data.errorMessage);
                }
            );

        };

    });
