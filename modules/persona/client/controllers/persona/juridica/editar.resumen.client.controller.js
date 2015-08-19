'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.EditarPersonaJuridica.ResumenController',
	function ($scope, $state, personaJuridica) {

		$scope.view = {
			persona: personaJuridica
		};

		$scope.loadObjects = {
			accionistas: []
		};

		$scope.loadAccionistas = function () {
			$scope.loadObjects.accionistas = $scope.view.persona.$getAccionistas().$object;
		};
		$scope.loadAccionistas();

		$scope.verPersona = function (item) {
			$state.go('^.^.editarPersonaNatural.resumen', {id: item.id});
		};

	});

