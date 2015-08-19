'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.EditarPersonaJuridicaController',
    function ($scope, $state, personaJuridica) {

        $scope.view = {
            persona: personaJuridica
        };

    });

