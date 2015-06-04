'use strict';

// Setting up sidebar
angular.module('rrhh').controller('RrhhSidebarController',
	function ($scope, Auth, $menuItemsRrhh) {

		$scope.menuItems = $menuItemsRrhh.prepareSidebarMenu().getAll();

	}
);
