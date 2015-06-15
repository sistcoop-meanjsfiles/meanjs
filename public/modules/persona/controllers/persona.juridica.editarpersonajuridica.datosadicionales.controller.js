'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Juridica.EditarPersonaJuridica.DatosAdicionalesController',
	function ($scope, personaJuridica, toastr) {

		$scope.view = {
			persona: personaJuridica
		};

		$scope.save = function () {
			$scope.view.persona.$save().then(
				function (data) {
					toastr.success('Persona actualizada');
				},
				function error(err) {
					toastr.error(err.data.message);
				}
			);
		};

	});




