'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.Socio.CrearSocioController',
    function ($scope, $state, SGSocio, SGTipoPersona, SGTipoDocumento, SGPersonaNatural, SGPersonaJuridica, toastr) {

        $scope.working = false;

        $scope.view = {
            socio: SGSocio.$build()
        };

        $scope.view.load = {
            persona: undefined
        };

        $scope.combo = {
            tipoPersona: undefined,
            tipoDocumento: undefined
        };
        $scope.combo.selected = {
            tipoPersona: undefined,
            tipoDocumento: undefined
        };

        $scope.loadCombo = function () {
            SGTipoPersona.$getAll().then(function (response) {
                $scope.combo.tipoPersona = response;
            });
            $scope.$watch('combo.selected.tipoPersona', function (newValue) {
                if (newValue) {
                    SGTipoDocumento.$search({tipoPersona: newValue, estado: true}).then(function (response) {
                        $scope.combo.tipoDocumento = response.items;
                    });
                }
            }, true);
        };
        $scope.loadCombo();

        $scope.check = function ($event) {
            if (!angular.isUndefined($event)) {
                $event.preventDefault();
            }

            var sgPersona;
            switch ($scope.combo.selected.tipoPersona.toUpperCase()) {
                case 'NATURAL':
                    sgPersona = SGPersonaNatural;
                    break;
                case 'JURIDICA':
                    sgPersona = SGPersonaJuridica;
                    break;
                default:
                    toastr.info('Tipo de persona no valida');
                    return;
            }
            sgPersona.$search({
                tipoDocumento: $scope.combo.selected.tipoDocumento.abreviatura,
                numeroDocumento: $scope.view.socio.numeroDocumento
            }).then(function (response) {
                $scope.view.load.persona = response.items[0];
                if ($scope.view.load.persona)
                    toastr.info('Persona encontrada');
                else
                    toastr.warning('Persona no encontrada');
            });

        };

        $scope.save = function () {
            $scope.view.socio.tipoPersona = $scope.combo.selected.tipoPersona;
            $scope.view.socio.tipoDocumento = $scope.combo.selected.tipoDocumento.abreviatura;

            $scope.working = true;

            $scope.view.socio.$save().then(
                function (response) {
                    toastr.success('Socio creado');
                    $scope.working = false;
                    $state.go('^.editar', {socio: response.id});
                },
                function error(err) {
                    toastr.error(err.data.message);
                }
            );
        };

        $scope.cancel = function () {
            $state.go('^.buscar');
        };

    });
