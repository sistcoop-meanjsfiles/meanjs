'use strict';

// Setting up sidebar
angular.module('socio').controller('SocioSidebarController',
	function ($scope, Auth, $menuItemsSocio) {

		$scope.menuItems = $menuItemsSocio.prepareSidebarMenu().getAll();

	}
);
