'use strict';

// Setting up sidebar
angular.module('cooperativa').controller('CooperativaSidebarController',
    function ($scope, Auth, $menuItemsCooperativa) {

        $scope.menuItems = $menuItemsCooperativa.prepareSidebarMenu().getAll();

    }
);
