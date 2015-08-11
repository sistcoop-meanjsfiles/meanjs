'use strict';

// Configuring the Chat module
angular.module('producto').run(['Menus',
	function (Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', {
			title: 'Producto',
			state: 'producto.app'
		});
	}
]);
