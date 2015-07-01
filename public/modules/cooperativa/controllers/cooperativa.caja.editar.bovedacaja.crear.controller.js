'use strict';

/* jshint -W098 */
angular.module('cooperativa').controller('Cooperativa.Caja.Editar.BovedaCaja.CrearController',
	function ($scope, $state, caja, toastr, SGAgencia, SGCaja, SGBoveda, SGDialog) {

		$scope.view = {
			caja: caja
		};

		$scope.combo = {
			bovedaDisponible: [],
			bovedaAsignada: []
		};
		$scope.combo.selected = {
			bovedaDisponible: [],
			bovedaAsignada: []
		};

		$scope.loadCombo = function () {
			$scope.combo.bovedaDisponible = SGBoveda.$search({agencia: $scope.view.caja.agencia}).$object;
			$scope.combo.bovedaAsignada = $scope.view.caja.SGBovedaCaja().$search().$object;
		};
		$scope.loadCombo();

		$scope.orderCombo = function () {
			for (var i = 0; i < $scope.combo.bovedaDisponible.length; i++) {
				for (var j = 0; j < $scope.combo.bovedaAsignada.length; j++) {
					if(!$scope.combo.bovedaDisponible[i]){
						break;
					}
					if ($scope.combo.bovedaDisponible[i].id === $scope.combo.bovedaAsignada[j].boveda.id) {
						$scope.combo.bovedaDisponible.splice(i, 1);
					}
				}
			}
		};

		$scope.$watch('combo.bovedaDisponible', function (newVal, oldVal) {
			if (newVal.length) {
				$scope.orderCombo();
			}
		}, true);
		$scope.$watch('combo.bovedaAsignada', function (newVal, oldVal) {
			if (newVal.length) {
				$scope.orderCombo();
			}
		}, true);

		$scope.addBovedas = function () {
			if ($scope.view.caja.estado === false) {
				toastr.info('Caja inactiva, no se puede actualizar.');
				return;
			}

			SGDialog.confirm('Vincular', 'Estas seguro de vincular la caja para la boveda', function () {

				var bovedaCajas = [];
				for (var i = 0; i < $scope.combo.selected.bovedaDisponible.length; i++) {
					var bovedaCaja = {
						boveda: {id: $scope.combo.selected.bovedaDisponible[i].id}
					};
					bovedaCajas.push(bovedaCaja);
				}

				$scope.view.caja.SGBovedaCaja().$saveSent(bovedaCajas).then(
					function (response) {
						toastr.success('Bovedas asignadas');
						var nuevo = [];
						for (var i = 0; i < $scope.combo.selected.bovedaDisponible.length; i++) {
							nuevo.push({
								boveda: $scope.combo.selected.bovedaDisponible[i],
								saldo: 0
							});
						}
						$scope.combo.bovedaAsignada = $scope.combo.bovedaAsignada.concat(nuevo);
					},
					function error(err) {
						toastr.error(err.data.message);
					}
				);
			});
		};

	});
