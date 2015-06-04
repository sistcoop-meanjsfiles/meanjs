'use strict';

/* jshint -W098 */
angular.module('rrhh').controller('RrhhController',
	function ($scope, Rrhh, Auth) {

		$scope.package = {
			name: 'rrhh'
		};

		function getAccess(role) {
			if (!Auth) {
				return false;
			}

			var rolesSession = Auth.authz.resourceAccess.rrhh.roles;
			if (rolesSession.indexOf(role) !== -1) {
				return true;
			}

			return false;
		}

		$scope.access = {

			get createRealm() {
				return Auth.user && Auth.user.createRealm;
			},


			get verSucursales() {
				return getAccess('ver-sucursales');
			},
			get verTrabajadores() {
				return getAccess('ver-trabajadores');
			},


			get administrarSucursales() {
				return getAccess('administrar-sucursales');
			},
			get administrarTrabajadores() {
				return getAccess('administrar-trabajadores');
			},
			get administrarTrabajadoresAgencia() {
				return getAccess('administrar-trabajadores-agencia');
			},


			get elminarTrabajadores() {
				return getAccess('elminar-trabajadores');
			}

		};

	});
