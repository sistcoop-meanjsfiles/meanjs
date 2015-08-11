'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
    function ($locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
    }
]);

angular.module(ApplicationConfiguration.applicationModuleName).run(function ($rootScope, $state, Authentication) {
    // Check authentication before changing state
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
            var allowed = false;
            toState.data.roles.forEach(function (role) {
                if (Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(role) !== -1) {
                    allowed = true;
                    return true;
                }
            });

            if (!allowed) {
                event.preventDefault();
                $state.go('authentication.signin', {}, {
                    notify: false
                }).then(function () {
                    $rootScope.$broadcast('$stateChangeSuccess', 'authentication.signin', {}, toState, toParams);
                });
            }
        }
    });

    // Record previous state
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $state.previous = {
            state: fromState,
            params: fromParams,
            href: $state.href(fromState, fromParams)
        };
    });
});

// Global variables
window.auth = {};

//Then define the init function for starting up the application
angular.element(document).ready(function () {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') {
        window.location.hash = '#!';
    }

    /* jshint ignore:start */
    var keycloak = new Keycloak({
        url: 'https://keycloak-softgreen.rhcloud.com/auth',
        realm: 'sistcoop',
        clientId: 'sistcoop'
    });

    keycloak.init({onLoad: 'login-required'}).success(function () {
        window.auth.authz = keycloak;
        angular.module('mean').factory('Auth', function () {
            return window.auth;
        });

        //Then init the app
        angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
    }).error(function () {
        window.location.reload();
    });
    /* jshint ignore:end */

});


