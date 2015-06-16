'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Caja.CrearCajaController',
    function($scope, $state, SGCaja, SGSucursal, SGAgencia, toastr){

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


        $scope.save = function(){
			$scope.view.caja.agencia = SGAgencia.$new($scope.combo.selected.agencia.id).$getUrl();

			$scope.view.caja.$save().then(
				function(response){
					toastr.success('Caja creada');
					$state.go('^.editar', {caja: response.id});
				},
				function error(error){
					toastr.error(error.data.message);
				}
			);
        };

});
