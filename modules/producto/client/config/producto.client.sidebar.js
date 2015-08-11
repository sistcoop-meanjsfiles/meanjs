'use strict';

// Setting up sidebar
angular.module('producto').controller('ProductoSidebarController',
	function ($scope, Auth, $menuItemsProducto) {

		$scope.menuItems = $menuItemsProducto.prepareSidebarMenu().getAll();

	}
);
