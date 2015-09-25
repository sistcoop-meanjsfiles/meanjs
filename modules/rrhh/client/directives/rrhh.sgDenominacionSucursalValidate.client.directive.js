'use strict';

/* jshint -W098 */
angular.module('persona').directive('sgDenominacionSucursalValidate',function($q, SGSucursal){
    return {
        restrict: 'AE',
        require: 'ngModel',
        scope: {
            sgExclude: '=sgExclude'
        },
        link: function ($scope, elem, attrs, ngModel) {
            //var selfInclude = $scope.$eval(attrs.sgSelfInclude);

            ngModel.$asyncValidators.disponible = function (modelValue, viewValue) {
                var value = modelValue || viewValue;
                return SGSucursal.$search({denominacion: value}).then(
                    function (response) {
                        if (angular.isDefined(response) && response.items.length) {
                            if ($scope.sgExclude) {
                                if (response.items[0].id === $scope.sgExclude.id) {
                                    return true;
                                }
                            }
                            return $q.reject('Denominacion de sucursal no disponible');
                        }
                        else {
                            return true;
                        }
                    },
                    function error(response) {
                        return $q.reject('Error al buscar sucursal');
                    }
                );
            };
        }
    };
});
