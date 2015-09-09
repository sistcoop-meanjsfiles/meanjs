'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.Socio.EditarSocio.ResumenController',
    function ($scope, $state, socio, SGPersonaNatural) {

        $scope.view = {
            socio: socio
        };

        $scope.view.load = {
            socioPersonaNatural: undefined,
            representanteLegal: undefined,
            cuentaAporte: undefined,
            cuentasPersonales: undefined
        };

        $scope.loadSocioAsPersonaNatural = function () {
            SGPersonaNatural.$search({
                tipoDocumento: $scope.view.socio.tipoDocumento,
                numeroDocumento: $scope.view.socio.numeroDocumento
            }).then(function (response) {
                $scope.view.load.socioPersonaNatural = response.items[0];
            });
        };
        $scope.loadSocioAsPersonaNatural();

        $scope.loadRepresentanteLegal = function () {
            if ($scope.view.socio.tipoDocumentoRepresentanteLegal && $scope.view.socio.numeroDocumentoRepresentanteLegal) {
                SGPersonaNatural.$search({
                    tipoDocumento: $scope.view.socio.tipoDocumentoRepresentanteLegal,
                    numeroDocumento: $scope.view.socio.numeroDocumentoRepresentanteLegal
                }).then(function (response) {
                    $scope.view.load.representanteLegal = response.items[0];
                });
            }
        };
        $scope.loadRepresentanteLegal();

        $scope.loadCuentaAporte = function () {

        };
        $scope.loadCuentaAporte();

        $scope.loadCuentasPersonales = function () {

        };
        $scope.loadCuentasPersonales();

    });

