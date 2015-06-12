'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Trabajador.EditarTrabajador.AccesoSistemaController',
	function ($scope, toastr, trabajador, SGDialog, SGUsuarioKeycloak) {

		$scope.view = {
			trabajador: trabajador
		};

		$scope.view = {
			trabajador: trabajador,
			usuario: trabajador.usuario
		};

		$scope.combo = {
			rol: undefined
		};
		$scope.combo.selected = {
			rol: undefined
		};

		$scope.loadCombo = function () {
			SGUsuarioKeycloak.$getRealmLevelRoles().then(function(response){
				$scope.combo.rol = response;
			});
		};
		$scope.loadCombo();

		$scope.desvincular = function () {
			SGDialog.confirm('Desvincular', 'Estas seguro de quitar el usuario para el trabajador?', function () {
				$scope.view.trabajador.$setUsuario(undefined).then(
					function (response) {
						toastr.success('Trabajador actualizado');
						$scope.view.usuario = undefined;
						$scope.view.trabajador.usuario = undefined;
					},
					function error(err) {
						toastr.error(err.data.message);
					}
				);
			});
		};

		$scope.setUsuario = function(){
			$scope.view.trabajador.$setUsuario($scope.view.usuario).then(
				function (response) {
					toastr.success('Trabajador actualizado');
					$scope.view.trabajador.usuario = $scope.view.usuario;
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);
		};

		$scope.save = function () {

			$scope.view.trabajador.$setUsuario($scope.combo.selected.usuario.username).then(
				function (response) {
					toastr.success('Trabajador actualizado');
					$scope.view.trabajador.usuario = $scope.combo.selected.usuario.username;
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);
		};

	});

