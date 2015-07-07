'use strict';

// Setting up sidebar
angular.module('cooperativa').controller('SocioSidebarController',
	function ($scope, Auth, $menuItemsSocio) {

		$scope.menuItems = $menuItemsSocio.prepareSidebarMenu().getAll();

	}
);
