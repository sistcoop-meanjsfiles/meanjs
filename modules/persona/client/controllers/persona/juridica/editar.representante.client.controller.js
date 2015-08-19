'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.EditarPersonaJuridica.RepresentanteController',
    function ($scope, $state, SGTipoDocumento, SGPersonaNatural, toastr) {

        $scope.working = false;

        $scope.representante = {
            tipoDocumento: undefined,
            numeroDocumento: undefined
        };

        $scope.combo = {
            tipoDocumento: undefined
        };
        $scope.combo.selected = {
            tipoDocumento: undefined
        };

        $scope.loadCombo = function () {
            SGTipoDocumento.$search({tipoPersona: 'natural'}).then(function (response) {
                $scope.combo.tipoDocumento = response.items;
            });
        };
        $scope.loadCombo();

        $scope.setRepresentante = function ($event) {
            if (!angular.isUndefined($event))
                $event.preventDefault();

            if (angular.isDefined($scope.combo.selected.tipoDocumento) && angular.isDefined($scope.representante.numeroDocumento)) {
                SGPersonaNatural.$search({
                    documento: $scope.combo.selected.tipoDocumento.abreviatura,
                    numero: $scope.representante.numeroDocumento
                }).then(function (response) {
                    if (response.items.length)
                        $scope.view.persona.representanteLegal = response.items[0];
                    else
                        toastr.warning('Persona no encontrada');
                });
            }
        };

        $scope.save = function () {
            alert('guardando');
        };

    });
