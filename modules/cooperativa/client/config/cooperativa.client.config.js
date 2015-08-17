'use strict';

// Configuring the Chat module
angular.module('cooperativa').run(['Menus',
    function (Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', {
            title: 'Cooperativa',
            state: 'cooperativa.app'
        });
    }
]);
