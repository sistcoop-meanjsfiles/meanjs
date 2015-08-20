'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Boveda.Editar.Historial.BuscarController',
    function ($scope, $state, toastr, boveda) {

        $scope.view = {
            boveda: boveda
        };

        $scope.view.load = {
            historiales: []
        };

        $scope.filterOptions = {
            desde: undefined,
            hasta: undefined,
            filterText: undefined,
            firstResult: 0,
            maxResults: 10
        };

        $scope.loadHistoriales = function () {
            $scope.view.boveda.SGHistorialBoveda().$search($scope.filterOptions).then(function (response) {
                $scope.view.load.historiales = response.items;
            });
        };
        $scope.loadHistoriales();

        $scope.edit = function (row) {
            $state.go('^.editar', {historial: row.id});
        };

    });
