'use strict';

/* jshint -W098 */
angular.module('persona').controller('Persona.Natural.EditarPersonaNatural.CambiarFotoModalController',
	function ($scope, $modalInstance, toastr, Upload, personaNatural) {

		$scope.persona = personaNatural;

		$scope.upload = function (files) {
			if (files && files.length) {
				var file = files[0];

				$scope.persona.$setFoto(file).progress(function (evt) {
					$scope.uploader = {};
					$scope.uploader.progress = parseInt(100.0 * evt.loaded / evt.total);
				}).success(function (data, status, headers, config) {
					toastr.success('Foto actualizada satisfactoriamente');
					$scope.ok();
				}).error(function(){
					toastr.error('Error al subir el archivo');
				});

			}
		};

		$scope.ok = function () {
			$modalInstance.close();
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

	});
