'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Trabajador.CrearTrabajadorController',
    function ($scope, $state, toastr, SUCURSAL, AGENCIA, SGSucursal, SGTrabajador, SGPersonaNatural, SGTipoDocumento) {

        $scope.working = false;

        $scope.view = {
            trabajador: SGTrabajador.$build()
        };

        $scope.view.loaded = {
            persona: undefined,
            trabajador: undefined
        };

        $scope.combo = {
            sucursal: undefined,
            agencia: undefined,
            tipoDocumento: undefined
        };
        $scope.combo.selected = {
            sucursal: SUCURSAL ? SUCURSAL : undefined,
            agencia: AGENCIA ? AGENCIA : undefined,
            tipoDocumento: undefined
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

            SGTipoDocumento.$search({tipoPersona: 'natural'}).then(function (response) {
                $scope.combo.tipoDocumento = response.items;
            });
        };
        $scope.loadCombo();

        $scope.check = function ($event) {
            if (!angular.isUndefined($event)) {
                $event.preventDefault();
            }
            SGPersonaNatural.$search({
                tipoDocumento: $scope.combo.selected.tipoDocumento.abreviatura,
                numeroDocumento: $scope.view.trabajador.numeroDocumento
            }).then(function (response) {
                $scope.view.loaded.persona = response.items[0];
                if ($scope.view.loaded.persona) {
                    toastr.info('Persona encontrada');
                } else {
                    toastr.warning('Persona no encontrada');
                }
            });
            SGTrabajador.$search({
                tipoDocumento: $scope.combo.selected.tipoDocumento.abreviatura,
                numeroDocumento: $scope.view.trabajador.numeroDocumento
            }).then(function (response) {
                $scope.view.loaded.trabajador = response.items[0];
            });
        };

        $scope.save = function () {

            if (angular.isUndefined($scope.view.loaded.persona)) {
                toastr.warning('Debe de seleccionar una persona.');
                return;
            }
            if (angular.isDefined($scope.view.loaded.trabajador)) {
                toastr.warning('El trabajador ya fue registrado, no puede continuar.');
                return;
            }

            var trabajador = angular.copy($scope.view.trabajador);
            trabajador.tipoDocumento = $scope.combo.selected.tipoDocumento.abreviatura;
            trabajador.agencia = {
                id: $scope.combo.selected.agencia.id,
                sucursal: {
                    id: $scope.combo.selected.agencia.sucursal.id
                }
            };

            $scope.working = true;

            trabajador.$save().then(
                function (response) {
                    toastr.success('Trabajador creado');
                    $scope.working = false;
                    $state.go('^.editar.resumen', {trabajador: response.id});
                },
                function error(err) {
                    toastr.error(err.data.errorMessage);
                }
            );

        };
    });
