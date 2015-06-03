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
					toastr.success('Persona actualizada', 'Success');
					$scope.view.personaDB = angular.copy($scope.view.persona);
				},
				function error(err) {
					toastr.error(err.data.message, 'Error');
				}
			);
		};

	});
