'use strict';

// Configuring the Chat module
angular.module('persona').run(['Menus',
	function (Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', {
			title: 'Persona',
			state: 'persona.app'
		});
	}
]);
