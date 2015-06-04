'use strict';

// Configuring the Articles module
angular.module('rrhh').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Rrhh', 'rrhh.app', 'item', 'rrhh');
	}
]);
