'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('Rrhh.Trabajador.EditarTrabajador.AccesoSistemaController',
	function ($scope, $window, toastr, trabajador, SGDialog, SGTrabajador, SGUsuarioKeycloak) {

		$scope.view = {
			trabajador: trabajador,
			usuario: trabajador.usuario
		};

		$scope.crearUsuarioKeycloak = function(){
			$window.open(SGUsuarioKeycloak.$getCreateRealmUserUrl());
		};

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

		$scope.save = function () {

			SGUsuarioKeycloak.$find($scope.view.usuario).then(
				function(){
					SGTrabajador.$findByAtributos({usuario: $scope.view.usuario}).then(function(response){
						if(!response){
							$scope.view.trabajador.$setUsuario($scope.view.usuario).then(
								function () {
									toastr.success('Trabajador actualizado');
									$scope.view.trabajador.usuario = $scope.view.usuario;
								},
								function error(err) {
									toastr.error(err.data.message);
								}
							);
						} else {
							toastr.warning('Usuario ya fue asignado a otro trabajador');
						}
					});
				}, function error(err){
					toastr.warning('Usuario no encontrado');
				}
			);

		};

	});

