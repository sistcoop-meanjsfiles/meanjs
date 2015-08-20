'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Boveda.EditarController',
    function ($scope, $state, boveda, toastr, SGDialog) {

        $scope.view = {
            boveda: boveda
        };

        $scope.disable = function () {
            SGDialog.confirm('Desactivar', 'Estas seguro de querer desactivar permanentemente la boveda?', function () {
                $scope.view.boveda.$disable().then(
                    function (response) {
                        toastr.success('Boveda deshabilitada');
                        $state.go('^.buscar');
                    },
                    function error(err) {
                        toastr.error(err.data.message);
                    }
                );
            });
        };

        $scope.remove = function () {
            SGDialog.confirmDelete($scope.view.boveda.denominacion, 'Boveda', function () {
                $scope.view.boveda.$remove().then(
                    function (response) {
                        toastr.success('Boveda eliminada');
                        $state.go('^.buscar');
                    },
                    function error(err) {
                        toastr.error(err.data.message);
                    }
                );
            });
        };

    });
