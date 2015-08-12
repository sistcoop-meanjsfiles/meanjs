'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        // Redirect to 404 when route not found
        $urlRouterProvider.otherwise('not-found');

        $urlRouterProvider.when('/console/:agencia', '/console/:agencia/home');

        // Home state routing
        $stateProvider
            .state('console', {
                url: '/console/:agencia',
                abstract: true,
                templateUrl: 'modules/core/views/console.client.view.html'
            })
            .state('console.home', {
                url: '/home',
                templateUrl: 'modules/core/views/home.client.view.html'
            })
            .state('not-found', {
                url: '/not-found',
                templateUrl: 'modules/core/views/404.client.view.html'
            });
    }
]);
