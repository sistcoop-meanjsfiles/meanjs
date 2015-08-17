'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Natural.EditarPersonaNatural.DatosAdicionalesController',
	function ($scope, personaNatural, toastr) {

		$scope.view = {
			persona: personaNatural
		};

		$scope.save = function () {
			$scope.view.persona.$save().then(
				function (response) {
					toastr.success('Persona actualizada');
				},
				function error(err) {
					toastr.error(err.data.message, 'Error');
				}
			);
		};

	});
