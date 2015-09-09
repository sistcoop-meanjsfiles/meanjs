'use strict';

/* jshint -W098 */
angular.module('socio').controller('Socio.Socio.EditarSocioController',
    function ($scope, $state, toastr, socio, SGDialog) {

        $scope.view = {
            socio: socio
        };

        $scope.remove = function(){
            SGDialog.confirm('Eliminar', 'Estas seguro de eliminar el socio?', function () {
                $scope.view.socio.$remove().then(
                    function (response) {
                        toastr.success('Socio eliminado');
                        $state.go('socio.app.socio.socio.buscar');
                    },
                    function error(err) {
                        toastr.error(err.data.message);
                    }
                );
            });
        };

    });
