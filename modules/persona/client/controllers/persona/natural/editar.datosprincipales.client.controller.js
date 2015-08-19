'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Natural.EditarPersonaNatural.DatosPrincipalesController',
    function ($scope, $state, toastr, personaNatural, SGCountryCode, SGSexo, SGEstadoCivil) {

        $scope.working = false;

        $scope.view = {
            persona: personaNatural
        };

        $scope.combo = {
            pais: undefined,
            sexo: undefined,
            estadoCivil: undefined
        };
        $scope.combo.selected = {
            pais: undefined,
            sexo: personaNatural.sexo,
            estadoCivil: personaNatural.estadoCivil
        };

        $scope.loadCombos = function () {
            SGCountryCode.$search().then(function (response) {
                $scope.combo.pais = response.items;
            });
            SGSexo.$search().then(function (response) {
                $scope.combo.sexo = response.items;
            });
            SGEstadoCivil.$search().then(function (response) {
                $scope.combo.estadoCivil = response.items;
            });
        };
        $scope.loadCombos();

        $scope.save = function () {
            $scope.view.persona.sexo = $scope.combo.selected.sexo;
            $scope.view.persona.estadoCivil = $scope.combo.selected.estadoCivil;
            $scope.working = true;
            $scope.view.persona.$save().then(
                function (response) {
                    $scope.working = false;
                    toastr.success('Persona actualizada');
                },
                function error(err) {
                    toastr.error(err.data.message, 'Error');
                }
            );
        };

    });
