'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Natural.CrearPersonaNaturalController',
    function ($scope, $state, $stateParams, toastr, SGCountryCode, SGTipoDocumento, SGEstadoCivil, SGSexo, SGPersonaNatural) {

        $scope.working = false;

        $scope.view = {
            persona: SGPersonaNatural.$build()
        };

        $scope.combo = {
            pais: undefined,
            tipoDocumento: undefined,
            sexo: undefined,
            estadoCivil: undefined
        };
        $scope.combo.selected = {
            pais: undefined,
            tipoDocumento: undefined,
            sexo: undefined,
            estadoCivil: undefined
        };

        $scope.loadCombos = function(){
            SGCountryCode.$search().then(function(response){
                $scope.combo.pais = response.items;
            });
            SGTipoDocumento.$search({tipoPersona: 'natural'}).then(function(response){
                $scope.combo.tipoDocumento = response.items;
            });
            SGSexo.$search().then(function(response){
                $scope.combo.sexo = response.items;
            });
            SGEstadoCivil.$search().then(function(response){
                $scope.combo.estadoCivil = response.items;
            });
        };
        $scope.loadCombos();

        $scope.loadParams = function () {
            $scope.view.persona.tipoDocumento = $stateParams.tipoDocumento;
            $scope.view.persona.numeroDocumento = $stateParams.numeroDocumento;
        };
        $scope.loadParams();

        $scope.loadDefaultConfiguration = function () {
            $scope.view.persona.codigoPais = 'PER';
        };
        $scope.loadDefaultConfiguration();

        $scope.check = function ($event) {
            if (!angular.isUndefined($event))
                $event.preventDefault();
            if (!angular.isUndefined($scope.combo.selected.tipoDocumento) && !angular.isUndefined($scope.view.persona.numeroDocumento)) {
                SGPersonaNatural.$search({documento:$scope.combo.selected.tipoDocumento.abreviatura, numero:$scope.view.persona.numeroDocumento}).then(function (response) {
                    if (!response.items.length)
                        toastr.info('Documento de identidad disponible');
                    else
                        toastr.warning('Documento de identidad no disponible');
                });
            }
        };

        $scope.save = function () {
            var save = function () {
                $scope.view.persona.sexo = $scope.combo.selected.sexo;
                $scope.view.persona.estadoCivil = $scope.combo.selected.estadoCivil;
                $scope.working = true;
                $scope.view.persona.$save().then(
                    function (response) {
                        toastr.success('Persona creada');
                        $scope.working = false;
                        $state.go('^.editar', {personaNatural: response.id});
                    },
                    function error(err) {
                        toastr.error(err.data.message);
                    }
                );
            };
            SGPersonaNatural.$search({documento:$scope.view.persona.tipoDocumento, numero:$scope.view.persona.numeroDocumento}).then(function (response) {
                if (response.items.length) {
                    toastr.error('Documento de identidad no disponible', 'Error');
                } else {
                    save();
                }
            });
        };

    });
