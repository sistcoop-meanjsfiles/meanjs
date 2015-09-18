/**
 * Created by carlos on 18/09/15.
 */
'use strict';

/* jshint -W098 */
angular.module('persona').directive('sgAbreviaturaTipoDocumentoValidate', function ($q, SGTipoDocumento) {
    return {
        restrict: 'AE',
        require: 'ngModel',
        scope: {

        },
        link: function ($scope, elem, attrs, ngModel) {
            ngModel.$asyncValidators.disponible = function (modelValue, viewValue) {
                var value = modelValue || viewValue;
                return SGTipoDocumento.$search({abreviatura:value}).then(
                    function (response) {
                        if (angular.isDefined(response) && angular.isDefined(response.items) && response.items.length) {
                            return $q.reject('Abreviatura de tipoDocumento no disponible');
                        }
                        else {
                            return true;
                        }
                    },
                    function error(response) {
                        return $q.reject('Error al buscar tipoDocumento');
                    }
                );
            };
        }
    };
});
