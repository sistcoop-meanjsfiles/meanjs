'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Trabajador.EditarTrabajador.DatosPrincipalesController',
    function ($scope, toastr, trabajador, SUCURSAL, AGENCIA, SGSucursal, SGPersonaNatural) {

        $scope.working = false;

        $scope.view = {
            trabajador: trabajador
        };

        $scope.view.loaded = {
            persona: undefined
        };

        $scope.combo = {
            sucursal: undefined,
            agencia: undefined
        };
        $scope.combo.selected = {
            sucursal: trabajador.agencia.sucursal,
            agencia: trabajador.agencia
        };

        $scope.loadCombo = function () {
            if ($scope.access.administrarTrabajadores) {
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
            } else if ($scope.access.administrarTrabajadoresAgencia) {
                $scope.combo.sucursal = [SUCURSAL];
                $scope.combo.agencia = [AGENCIA];
            } else {
                console.log('User not authenticated for this action.');
            }
        };
        $scope.loadCombo();

        $scope.loadPersona = function () {
            var tipoDocumento = $scope.view.trabajador.tipoDocumento;
            var numeroDocumento = $scope.view.trabajador.numeroDocumento;
            SGPersonaNatural.$search({
                tipoDocumento: tipoDocumento,
                numeroDocumento: numeroDocumento
            }).then(function (response) {
                $scope.view.loaded.persona = response.items[0];
            });
        };
        $scope.loadPersona();

        $scope.save = function () {

            var trabajajador = {};
            angular.extend(trabajajador,
                $scope.view.trabajador,
                {
                    agencia: {
                        id: $scope.combo.selected.agencia.id,
                        sucursal: {
                            id: $scope.combo.selected.sucursal.id
                        }
                    }
                }
            );

            $scope.working = true;

            trabajajador.$save().then(
                function (response) {
                    $scope.working = false;
                    toastr.success('Trabajador actualizado satisfactoriamente');
                },
                function error(err) {
                    toastr.error(err.data.errorMessage);
                }
            );

        };

    }
);
