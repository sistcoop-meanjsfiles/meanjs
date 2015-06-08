'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Natural.EditarPersonaNatural.DatosPrincipalesController',
	function ($scope, $state, personaNatural, SGCountryCode, SGSexo, SGEstadoCivil, SGPersonaNatural, toastr) {

		$scope.view = {
			persona: personaNatural
		};

		$scope.combo = {
			pais: SGCountryCode.$search().$object,
			sexo: SGSexo.$search().$object,
			estadoCivil: SGEstadoCivil.$search().$object
		};
		$scope.combo.selected = {
			pais: undefined,
			sexo: undefined,
			estadoCivil: undefined
		};

		$scope.save = function () {
			$scope.view.persona.$save().then(
				function (response) {
					toastr.success('Persona actualizada');
					$scope.view.personaDB = angular.copy($scope.view.persona);
				},
				function error(err) {
					toastr.error(err.data.message, 'Error');
				}
			);
		};

	});
