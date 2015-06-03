'use strict';

/* jshint -W098 */
angular.module('mean.persona').controller('Persona.EditarPersonaJuridica.DatosAdicionalesController', function(
    $scope, personaJuridica, toastr){

    $scope.view = {
        persona: personaJuridica
    };

    $scope.submit = function(){
        if ($scope.form.$valid) {
            $scope.view.persona.$save().then(
                function(data){
                    toastr.success('Persona actualizada');
                },
                function error(err){
                    toastr.error(err.data.message);
                }
            );
        }
    };

});




        