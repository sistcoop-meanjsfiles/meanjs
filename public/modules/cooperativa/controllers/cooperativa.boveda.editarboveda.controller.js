'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.EditarBovedaController', function(
    $scope, $state, boveda, toastr, SGDialog){

    $scope.view = {
        boveda: boveda
    };

    $scope.desactivar = function(){

        SGDialog.confirm('Desactivar', 'Estas seguro de querer desactvar permanentemente la boveda?', function() {
            alert('Metodo no implementado');
        });
    };

});
