'use strict';

/* jshint -W098 */
angular.module('mean.persona').controller('Persona.EditarPersonaNaturalController', function(
    $scope, $state, $modal, personaNatural, SGDialog, toastr){

    $scope.view = {
        persona: personaNatural
    };

    $scope.desactivar = function(){
        SGDialog.confirm('Desactivar', 'Estas seguro de querer desactivar el/la persona', function() {
            toastr.info('Las personas no pueden ser desactivadas, solo actualizadas');
        });
    };

    $scope.openCambiarFotoModal = function(){

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'persona/views/natural/form-editar-cambiarFoto.html',
            controller: 'Persona.EditarPersonaNatural.CambiarFotoModalController',
            size: 'lg',
            resolve: {
                personaNatural: function () {
                    return $scope.view.persona;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
        });

    };

});