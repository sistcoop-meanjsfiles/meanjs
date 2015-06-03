'use strict';

/* jshint -W098 */
angular.module('mean.persona').controller('Persona.EditarPersonaJuridica.DatosPrincipalesController', function(
    $scope, $state, personaJuridica, SGCountryCode, SGTipoDocumento, SGTipoEmpresa, SGPersonaJuridica, toastr){

    $scope.combo = {
        pais: SGCountryCode.$search().$object,
        tipoDocumento: SGTipoDocumento.$search({tipoPersona: 'juridica'}).$object,
        tipoEmpresa: SGTipoEmpresa.$search().$object
    };
    $scope.combo.selected = {
        pais: undefined,
        tipoDocumento: undefined,
        tipoEmpresa: undefined
    };

    $scope.checkPersona = function($event){
        if(!angular.isUndefined($event))
            $event.preventDefault();
        if(!angular.isUndefined($scope.combo.selected.tipoDocumento) && !angular.isUndefined($scope.view.persona.numeroDocumento)){
            SGPersonaJuridica.$findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.abreviatura, $scope.view.persona.numeroDocumento).then(function(data){
                if(!data)
                    toastr.info('Documento de identidad disponible.');
                else
                    toastr.warning('Documento de identidad no disponible');
            });
        }
    };

    $scope.view = {
        persona: personaJuridica
    };

    $scope.submit = function(){
        if ($scope.form.$valid) {
            var save = function(){
                $scope.view.persona.$save().then(
                    function(data){
                        $scope.view.personaDB = angular.copy($scope.view.persona);
                        toastr.success('Persona actualizada');
                    },
                    function error(err){
                        toastr.error(err.data.message);
                    }
                );
            };
            SGPersonaJuridica.$findByTipoNumeroDocumento($scope.view.persona.tipoDocumento, $scope.view.persona.numeroDocumento).then(function(data){
                if(data && data.id === $scope.view.persona.id){
                    save();
                }
                else {
                    toastr.warning('Documento de identidad no disponible');
                }
            });
        }
    };

});

        