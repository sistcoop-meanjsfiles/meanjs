'use strict';

/* jshint -W098 */
angular.module('mean.persona').controller('Persona.EditarPersonaJuridica.ResumenController', function(
    $scope, $state, personaJuridica){

    $scope.view = {
        persona: personaJuridica
    };

    $scope.loadObjects = {
        accionistas: []
    };

    $scope.loadAccionistas = function(){
        $scope.loadObjects.accionistas = $scope.view.persona.$getAccionistas().$object;
    };
    $scope.loadAccionistas();

    $scope.verPersona = function(item){
        $state.go('^.^.editarPersonaNatural.resumen', {id: item.id});
    };

});

