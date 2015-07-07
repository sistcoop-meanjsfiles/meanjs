'use strict';

// Configuring the Articles module
angular.module('producto').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//               (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position)
		Menus.addMenuItem('topbar', 'Producto', 'producto.app', 'item', 'producto');
	}
]);
