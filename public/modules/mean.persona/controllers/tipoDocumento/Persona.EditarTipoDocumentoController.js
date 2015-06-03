'use strict';

/* jshint -W098 */
angular.module('mean.persona').controller('Persona.EditarTipoDocumentoController', function(
    $scope, $state, tipoDocumento, SGTipoDocumento, SGTipoPersona, toastr){

    $scope.view = {
        tipoDocumento: tipoDocumento
    };

    $scope.combo = {
        tipoPersona: SGTipoPersona.$search().$object
    };
    $scope.combo.selected = {
        tipoPersona: undefined
    };

    $scope.save = function(){
        if ($scope.form.$valid) {
            $scope.view.tipoDocumento.$save().then(
                function(response){
                    toastr.success('Tipo documento actualizado');
                },
                function error(err){
                    toastr.error(err.data.message);
                }
            );
        }
    };
});