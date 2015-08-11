'use strict';

// Configuring the Chat module
angular.module('socio').run(['Menus',
	function (Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', {
			title: 'Socio',
			state: 'socio.app'
		});
	}
]);
