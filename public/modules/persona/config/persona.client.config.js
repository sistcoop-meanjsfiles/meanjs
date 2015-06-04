'use strict';

// Configuring the Articles module
angular.module('persona').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//               (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position)
		Menus.addMenuItem('topbar', 'Persona', 'persona.app', 'item', 'persona');
	}
]);
