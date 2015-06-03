'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.EditarPersonaJuridicaController', function(
    $scope, $state, personaJuridica, SGPersonaJuridica, toastr){

    $scope.view = {
        persona: personaJuridica
    };

});

