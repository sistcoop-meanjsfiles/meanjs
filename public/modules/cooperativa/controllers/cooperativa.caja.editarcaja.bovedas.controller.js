'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Caja.EditarCaja.BovedasController',
    function ($scope, $state, $filter, caja, toastr, SGAgencia, SGBoveda, SGBovedaCaja, SGDialog) {

        $scope.view = {
            caja: caja
        };

        $scope.view.loaded = {
            bovedasAsignadas: []
        };

        $scope.combo = {
            boveda: undefined
        };
        $scope.combo.selected = {
            boveda: undefined
        };

        $scope.loadCombo = function () {
			$scope.combo.boveda = SGBoveda.$search({agencia: $scope.view.caja.agencia}).$object;
        };
        $scope.loadCombo();

        $scope.loadBovedasAsignadas = function () {
            $scope.view.loaded.bovedasAsignadas = $scope.view.caja.$getBovedaCajas().$object;
        };
        $scope.loadBovedasAsignadas();

        $scope.save = function () {
			if ($scope.view.caja.estado === false) {
				toastr.info('Caja inactiva, no se puede actualizar.');
				return;
			}
			if ($scope.view.caja.abierto) {
				toastr.warn('Caja abierta, debe cerrarla antes de vincular boveda.');
				return;
			}

			for (var i = 0; i < $scope.view.loaded.bovedasAsignadas.length; i++) {
				if ($scope.view.loaded.bovedasAsignadas[i].boveda.id === $scope.combo.selected.boveda.id) {
					toastr.warning('Boveda ya fue asignada');
					return;
				}
				if ($scope.view.loaded.bovedasAsignadas[i].boveda.moneda === $scope.combo.selected.boveda.moneda) {
					toastr.warn('Boveda con moneda ' + $scope.combo.selected.boveda.moneda + ' ya fue asignada');
					return;
				}
			}

			SGDialog.confirm('Vincular', 'Estas seguro de vincular la caja para la boveda', function () {

				var bovedaCaja = {
					boveda: {
						id: $scope.combo.selected.boveda.id
					}
				};

				$scope.view.caja.$addBovedaCaja(bovedaCaja).then(
					function (response) {
						toastr.success('Boveda vinculada');
						if (angular.isDefined($scope.view.loaded.bovedasAsignadas)) {
							$scope.view.loaded.bovedasAsignadas.push({
								boveda: $scope.combo.selected.boveda,
								saldo: 0
							});
						} else {
							$scope.view.loaded.bovedasAsignadas = [];
							$scope.view.loaded.bovedasAsignadas.push({
								boveda: $scope.combo.selected.boveda,
								saldo: 0
							});
						}
						$scope.combo.selected.boveda = undefined;
					},
					function error(err) {
						toastr.error(err.data.message);
					}
				);
			});
        };

        $scope.removeBoveda = function ($index, item) {
            if ($scope.view.caja.abierto) {
                toastr.warning('Caja abierta, debe cerrarla antes de desvincular boveda');
                return;
            }

            for (var i = 0; i < $scope.view.loaded.bovedasAsignadas.length; i++) {
                if ($scope.view.loaded.bovedasAsignadas[i].saldo !== 0) {
                    toastr.warning('Caja tiene saldo diferente de 0.00, no puede desvincularla');
                    return;
                }
            }

            SGDialog.confirm('Eliminar', 'Estas seguro de desvincular la boveda para la caja. Debes de asegurarte que no existe saldo en caja para la boveda.', function () {

                SGBovedaCaja.$new(item.id).$disable().then(
                    function (response) {
                        toastr.success('Boveda desvinculada');
                        $scope.view.loaded.bovedasAsignadas.splice($index, 1);
                        $scope.combo.selected.boveda = undefined;
                    },
                    function error(err) {
                        toastr.error(err.data.message);
                    }
                );

            });

        };

    });
