'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Trabajador.EditarTrabajador.AccesoSistemaController',
    function ($scope, $window, toastr, trabajador, SGDialog, SGTrabajador, SGUsuarioKeycloak) {

        $scope.working = false;

        $scope.view = {
            trabajador: trabajador,
            usuario: trabajador.usuario
        };

        $scope.crearUsuarioKeycloak = function () {
            $window.open(SGUsuarioKeycloak.$getCreateRealmUserUrl());
        };

        $scope.desvincular = function () {
            SGDialog.confirm('Desvincular', 'Estas seguro de quitar el usuario para el trabajador?', function () {
                $scope.view.trabajador.$removeUsuario().then(
                    function (response) {
                        toastr.success('Trabajador actualizado');
                        $scope.view.usuario = undefined;
                        $scope.view.trabajador.usuario = undefined;
                    },
                    function error(err) {
                        toastr.error(err.data.errorMessage);
                    }
                );
            });
        };

        $scope.save = function () {

            SGUsuarioKeycloak.$search({username: $scope.view.usuario, max: 1}).then(function (response1) {
                if (response1.length) {
                    SGTrabajador.$search({usuario: $scope.view.usuario}).then(function (response2) {
                        if (!response2.items.length) {

                            $scope.working = true;
                            $scope.view.trabajador.usuario = $scope.view.usuario;
                            $scope.view.trabajador.$setUsuario().then(
                                function () {
                                    toastr.success('Trabajador actualizado');
                                    $scope.working = false;
                                    $scope.view.trabajador.usuario = $scope.view.usuario;
                                },
                                function error(err) {
                                    toastr.error(err.data.errorMessage);
                                }
                            );
                        } else {
                            toastr.warning('Usuario ya fue asignado a otro trabajador');
                        }
                    });
                } else {
                    toastr.warning('Usuario no encontrado en Keycloak');
                }
            });

        };

    });

