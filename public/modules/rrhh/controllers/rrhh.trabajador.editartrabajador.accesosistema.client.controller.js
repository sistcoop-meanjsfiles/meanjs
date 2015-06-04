'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Trabajador.EditarTrabajador.AccesoSistemaController',
	function ($scope, toastr, trabajador, SGDialog, SGUsuarioKeycloak) {

		$scope.view = {
			trabajador: trabajador
		};

		$scope.combo = {
			usuario: undefined
		};
		$scope.combo.selected = {
			usuario: undefined
		};

		$scope.refreshComboUsuario = function (filterText) {
			var queryParams = {
				search: filterText,
				first: 0,
				max: 5
			};
			if ($scope.combo.usuario) {
				$scope.combo.usuario = SGUsuarioKeycloak.$search(queryParams).$object;
			}
			else {
				queryParams.search = $scope.view.trabajador.usuario;
				$scope.combo.usuario = SGUsuarioKeycloak.$search(queryParams).$object;
			}
		};

		$scope.desvincular = function () {
			/*SGDialog.confirm('Desvincular', 'Estas seguro de quitar el usuario para el trabajador?', function () {
				SGTrabajadorUsuario.$remove($scope.view.loaded.trabajadorUsuario.id).then(
					function (response) {
						toastr.success('Trabajador actualizado');
						$scope.view.loaded.trabajadorUsuario = undefined;
					},
					function error(err) {
						toastr.error(err.data.message);
					}
				);
			});*/
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

