'use strict';

/* jshint -W098 */
angular.module('persona').directive('sgDenominacionAgenciaValidate',function($q, SGSucursal){
    return {
        restrict: 'AE',
        require: 'ngModel',
        scope: {
            sgSucursal: '=sgSucursal',
            sgExclude: '=sgExclude'
        },
        link: function ($scope, elem, attrs, ngModel) {
            ngModel.$asyncValidators.disponible = function (modelValue, viewValue) {
                var value = modelValue || viewValue;
                return SGSucursal.$new($scope.sgSucursal.id).SGAgencia().$search({denominacion: value}).then(
                    function (response) {
                        if (angular.isDefined(response) && response.items.length) {
                            if ($scope.sgExclude) {
                                if (response.items[0].id === $scope.sgExclude.id) {
                                    return true;
                                }
                            }
                            return $q.reject('Denominacion de agencia no disponible');
                        }
                        else {
                            return true;
                        }

                    },
                    function error(response) {
                        return $q.reject('Error');
                    }
                );
            };
        }
    };
});

