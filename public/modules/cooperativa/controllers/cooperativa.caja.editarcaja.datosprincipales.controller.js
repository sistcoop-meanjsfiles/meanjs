'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.EditarCaja.DatosPrincipalesController',
    function($scope, caja, toastr){

        $scope.view = {
            caja: caja
        };

        $scope.submit = function(){
            if ($scope.form.$valid) {

                if($scope.view.caja.estado === false){
                    toastr.info('Caja inactiva, no se puede actualizar');
                    return;
                }

                $scope.view.caja.$save().then(
                    function(response){
                        toastr.success('Caja actualizada');
                    },
                    function error(err){
                        toastr.error(err.data.message);
                    }
                );
            }
        };


    });
