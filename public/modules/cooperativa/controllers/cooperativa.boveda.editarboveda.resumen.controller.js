'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.EditarBoveda.ResumenController',
    function($scope, boveda, SGAgencia){

        $scope.view = {
            boveda: boveda
        };

        $scope.view.load = {
          agencia: undefined
        };

        $scope.loadAgencia = function(){
          $scope.view.load.agencia = SGAgencia.$findByCodigo($scope.view.boveda.agencia).$object;
        };
        $scope.loadAgencia();

    }
);
