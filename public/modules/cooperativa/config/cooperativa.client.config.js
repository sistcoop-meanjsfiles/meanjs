'use strict';

// Configuring the Articles module
angular.module('cooperativa').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//               (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position)
		Menus.addMenuItem('topbar', 'Cooperativa', 'cooperativa.app', 'item', 'cooperativa');
	}
]);
