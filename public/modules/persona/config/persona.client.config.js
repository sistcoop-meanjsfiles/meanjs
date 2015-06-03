'use strict';

// Configuring the Articles module
angular.module('persona').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Persona', 'persona.app.administracion.documento.buscar', 'item');
	}
]);
