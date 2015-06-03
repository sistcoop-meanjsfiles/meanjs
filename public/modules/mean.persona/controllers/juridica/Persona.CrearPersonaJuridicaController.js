'use strict';

/* jshint -W098 */
angular.module('mean.persona').controller('Persona.CrearPersonaJuridicaController', function(
    $scope, $state, $stateParams, SGTipoEmpresa, SGTipoDocumento, SGCountryCode, SGPersonaJuridica, toastr){

    $scope.view = {
        persona: SGPersonaJuridica.$build()
    };

    $scope.loadParams = function(){
        $scope.view.persona.tipoDocumento = $stateParams.tipoDocumento;
        $scope.view.persona.numeroDocumento = $stateParams.numeroDocumento;
    };
    $scope.loadParams();

    $scope.loadDefaultConfiguration = function() {
        $scope.view.persona.codigoPais = 'PER';
    };
    $scope.loadDefaultConfiguration();

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
                    toastr.info('Documento de identidad disponible', 'Info');
                else
                    toastr.warn('Documento de identidad no disponible', 'Warning');
            });
        }
    };


    $scope.goTabRepresentante = function(){
        if($scope.form.$valid){
            $state.go('persona.app.personas.crearPersonaJuridica.representante');
        } else {
            $scope.form.$setSubmitted();
        }
    };


    $scope.submit = function(){
        if ($scope.form.$valid) {

            if(angular.isUndefined($scope.view.persona.representanteLegal)){
                toastr.warning('Representante legal no definido.', 'Warning');
                return;
            }
            if(angular.isUndefined($scope.view.persona.representanteLegal.id)){
                toastr.warning('Representante legal no definido.', 'Warning');
                return;
            }

            SGPersonaJuridica.$findByTipoNumeroDocumento($scope.view.persona.tipoDocumento, $scope.view.persona.numeroDocumento).then(function(response){
                if(response) {
                    toastr.error('Documento de identidad no disponible');
                } else {
                    $scope.save();
                }
            });
        }
    };

    $scope.save = function(){
        $scope.view.persona.representanteLegal = {
            tipoDocumento: $scope.view.persona.representanteLegal.tipoDocumento,
            numeroDocumento: $scope.view.persona.representanteLegal.numeroDocumento
        };
        $scope.view.persona.$save().then(
            function(response){
                toastr.success('Persona creada', 'Info');
                $state.go('persona.app.personas.editarPersonaJuridica.resumen', {id: response.id});
            },
            function error(err){
                toastr.error(err.data.message);
            }
        );
    };

});