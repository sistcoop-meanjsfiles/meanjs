'use strict';

/* jshint -W098 */
angular.module('mean.persona').controller('Persona.CrearPersonaJuridica.RepresentanteController', function(
    $scope, $state, toastr, SGTipoDocumento, SGPersonaNatural){

    $scope.verificarDatos = function(){
        if(angular.isUndefined($scope.view.persona.razonSocial)){
            $state.go('^.datosPrincipales');
        }
    };
    $scope.verificarDatos();

    $scope.combo = {
        tipoDocumento: SGTipoDocumento.$search({tipoPersona: 'natural'}).$object
    };
    $scope.combo.selected = {
        tipoDocumento: undefined
    };

    $scope.goCrearPersonaNatural = function(){
        $state.go('persona.app.personas.crearPersonaNatural');
    };

    $scope.setRepresentante = function($event){
        if(!angular.isUndefined($event))
            $event.preventDefault();
        if(angular.isDefined($scope.combo.selected.tipoDocumento) && angular.isDefined($scope.representante.numeroDocumento)){
            SGPersonaNatural.$findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.abreviatura, $scope.representante.numeroDocumento).then(function(response){
                if(response) {
                    $scope.view.persona.representanteLegal = response;
                    toastr.info('Persona encontrada', 'Info');
                }
                else  {
                    toastr.warning('Persona no encontrada', 'Warning');
                }
            });
        }
    };

});