'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.EditarPersonaJuridica.DatosPrincipalesController',
    function ($scope, $state, personaJuridica, SGCountryCode, SGTipoDocumento, SGTipoEmpresa, SGPersonaJuridica, toastr) {

        $scope.working = false;

        $scope.combo = {
            pais: undefined,
            tipoDocumento: undefined,
            tipoEmpresa: undefined
        };
        $scope.combo.selected = {
            pais: undefined,
            tipoDocumento: undefined,
            tipoEmpresa: $scope.view.persona.tipoEmpresa
        };

        $scope.loadCombo = function () {
            SGCountryCode.$search().then(function (response) {
                $scope.combo.pais = response.items;
            });
            SGTipoDocumento.$search({tipoPersona: 'juridica'}).then(function (response) {
                $scope.combo.tipoDocumento = response.items;
            });
            SGTipoEmpresa.$search().then(function (response) {
                $scope.combo.tipoEmpresa = response.items;
            });
        };
        $scope.loadCombo();

        $scope.checkPersona = function ($event) {
            if (!angular.isUndefined($event))
                $event.preventDefault();
            if (!angular.isUndefined($scope.combo.selected.tipoDocumento) && !angular.isUndefined($scope.view.persona.numeroDocumento)) {
                SGPersonaJuridica.$search({
                    documento: $scope.combo.selected.tipoDocumento.abreviatura,
                    numero: $scope.view.persona.numeroDocumento
                }).then(function (response) {
                    if (!response.length)
                        toastr.info('Documento de identidad disponible.');
                    else
                        toastr.warning('Documento de identidad no disponible');
                });
            }
        };

        $scope.view = {
            persona: personaJuridica
        };

        $scope.save = function () {
            var save = function () {
                $scope.working = true;
                $scope.view.persona.$save().then(
                    function (data) {
                        $scope.view.personaDB = angular.copy($scope.view.persona);
                        $scope.working = false;
                        toastr.success('Persona actualizada');
                    },
                    function error(err) {
                        toastr.error(err.data.message);
                    }
                );
            };
            SGPersonaJuridica.$search({
                documento: $scope.view.persona.tipoDocumento,
                numero: $scope.view.persona.numeroDocumento
            }).then(function (response) {
                if (response && response.items[0].id === $scope.view.persona.id) {
                    save();
                }
                else {
                    toastr.warning('Documento de identidad no disponible');
                }
            });
        };

    });

