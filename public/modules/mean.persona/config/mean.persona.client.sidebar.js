'use strict';

// Setting up sidebar
angular.module('mean.persona').controller('PersonaSidebarController',
	function ($scope, Auth, $menuItemsPersona) {

		$scope.menuItems = $menuItemsPersona.prepareSidebarMenu().getAll();

	}
);
