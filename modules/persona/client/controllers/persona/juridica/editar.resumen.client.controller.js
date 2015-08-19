'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.EditarPersonaJuridica.ResumenController',
    function ($scope, $state, personaJuridica) {

        $scope.view = {
            persona: personaJuridica
        };

        $scope.view.loadObjects = {
            accionistas: []
        };

        $scope.loadAccionistas = function () {
            $scope.view.persona.SGAccionista().$search().then(function (response) {
                $scope.view.loadObjects.accionistas = response.items;
            });
        };
        $scope.loadAccionistas();

        $scope.verPersona = function (item) {
            $state.go('^.^.editarPersonaNatural.resumen', {id: item.id});
        };

    });

