'use strict';

/* jshint -W098 */
angular.module('mean.persona').controller('Persona.EditarPersonaJuridica.AccionistasController', function(
    $scope, $state, SGTipoDocumento, SGPersonaNatural, toastr){

    $scope.entradas = {
        tipoDocumento: undefined,
        numeroDocumento: undefined,
        porcentaje: undefined
    };
    $scope.buscados = {
        persona: undefined
    };

    $scope.combo = {
        tipoDocumento: SGTipoDocumento.$search({tipoPersona: 'natural'}).$object
    };
    $scope.combo.selected = {
        tipoDocumento: undefined
    };

    $scope.checkAccionista = function($event){
        if(!angular.isUndefined($event))
            $event.preventDefault();
        if(!angular.isUndefined($scope.combo.selected.tipoDocumento) && !angular.isUndefined($scope.entradas.numeroDocumento)){
            SGPersonaNatural.$findByTipoNumeroDocumento($scope.combo.selected.tipoDocumento.abreviatura, $scope.entradas.numeroDocumento).then(function(response){
                if(!response)
                    toastr.warning('Persona no encontrada');
                $scope.buscados.persona = response;
            });
        }
    };

    $scope.crearAccionista = function(){
        if($scope.form.$valid){
            var accionista = {
                tipoDocumento: $scope.entradas.tipoDocumento,
                numeroDocumento: $scope.entradas.numeroDocumento,
                porcentajeParticipacion: $scope.entradas.porcentaje
            };
            $scope.view.persona.$addAccionista(accionista).then(
                function(data){
                    toastr.success('Accionista agregado');
                    $scope.buscados.persona.porcentajeParticipacion = $scope.entradas.porcentaje;
                    $scope.view.persona.accionistas.push($scope.buscados.persona);
                    $scope.view.personaDB.accionistas.push($scope.buscados.persona);
                },
                function error(err){
                    toastr.error(err.data.message);
                }
            );
        }
    };

    $scope.editarPersonaNatural = function(item){
        $state.go('^.^.editarPersonaNatural.resumen', {id:item.id});
    };

    $scope.goCrearPersonaNatural = function(){
        $state.go('^.^.crearPersonaNatural.datosPrincipales');
    };

});