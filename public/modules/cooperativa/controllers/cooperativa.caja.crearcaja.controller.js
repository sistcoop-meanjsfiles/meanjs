'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.CrearCajaController',
    function($scope, $state, SGCaja, SGSucursal, toastr){

        $scope.view = {
            caja: SGCaja.$build()
        };

        $scope.combo = {
            sucursal: undefined,
            agencia: undefined
        };
        $scope.combo.selected = {
            sucursal: undefined,
            agencia: undefined
        };

        $scope.loadCombo = function(){
            $scope.combo.sucursal = SGSucursal.$search().$object;
            $scope.$watch('combo.selected.sucursal', function(){
                if(angular.isDefined($scope.combo.selected.sucursal)){
                    $scope.combo.agencia = $scope.combo.selected.sucursal.$getAgencias().$object;
                }
            }, true);
        };
        $scope.loadCombo();


        $scope.submit = function(){
            if($scope.form.$valid){

                $scope.view.caja.agencia = $scope.combo.selected.agencia.codigo;

                $scope.view.caja.$save().then(
                    function(response){
                        toastr.success('Caja creada');
                        $state.go('^.editarCaja.resumen', {id: response.id});
                    },
                    function error(error){
                        toastr.error(error.data.message);
                    }
                );
            }
        };

});
