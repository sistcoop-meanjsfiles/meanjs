'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Trabajador.EditarTrabajadorController',
    function ($scope, $state, toastr, trabajador, SGDialog) {

        $scope.view = {
            trabajador: trabajador
        };

        $scope.remove = function () {
            SGDialog.confirm('Eliminar', 'Estas seguro de eliminar el trabajador?', function () {
                $scope.view.trabajador.$remove().then(
                    function (response) {
                        toastr.success('Trabajador eliminado');
                        $state.go('rrhh.app.rrhh.trabajador.buscar');
                    },
                    function error(err) {
                        toastr.error(err.data.message);
                    }
                );
            });
        };

    });

