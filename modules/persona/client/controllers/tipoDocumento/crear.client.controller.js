'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.TipoDocumento.CrearTipoDocumentoController',
    function ($scope, $state, SGTipoDocumento, SGTipoPersona, toastr) {

        $scope.changed = false;

        $scope.view = {
            tipoDocumento: SGTipoDocumento.$build()
        };

        $scope.combo = {
            tipoPersona: SGTipoPersona.$search().$object
        };
        $scope.combo.selected = {
            tipoPersona: undefined
        };

        $scope.save = function () {
            $scope.view.tipoDocumento.tipoPersona = $scope.combo.selected.tipoPersona;

            $scope.changed = true;

            $scope.view.tipoDocumento.$save().then(
                function (response) {
                    toastr.success('Tipo documento creado');
                    $scope.changed = false;
                    $state.go('^.editar', {documento: $scope.view.tipoDocumento.abreviatura});
                },
                function error(err) {
                    toastr.error(err.data.message);
                }
            );
        };

    });
