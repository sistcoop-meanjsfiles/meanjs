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

//Config
window.auth = {};
window.auth.sistcoop = {};
window.realm = {};

//Then define the init function for starting up the application
angular.element(document).ready(function () {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') {
        window.location.hash = '#!';
    }

    var consoleIndex = window.location.href.indexOf('/console');
    if (consoleIndex == -1) {
        alert('Parametro: http://localhost:3000/console/sucursal-agencia');
        return;
    }

    var consoleBaseUrl = window.location.href;
    consoleBaseUrl = consoleBaseUrl.substring(consoleBaseUrl.indexOf('/console/'), consoleBaseUrl.length);
    window.realm.name = consoleBaseUrl.split('/')[2];

    var sucursal;
    var agencia;
    if(window.realm.name === 'master') {
        sucursal = realm.name;
        agencia = realm.name;
    } else {
        sucursal = window.realm.name.split('-')[0];
        agencia = window.realm.name.split('-')[1];
    }

    var keycloak = new Keycloak({
        url: 'https://keycloak-softgreen.rhcloud.com/auth',
        realm: 'sistcoop',
        clientId: 'sistcoop'
    });

    keycloak.init({onLoad: 'login-required'}).success(function () {

        var sistcoop = new Sistcoop({
            url: 'http://localhost:8080/rrhh',
            username: keycloak.idTokenParsed.preferred_username,
            sucursal: sucursal,
            agencia: agencia,
            token: keycloak.token
        });

        sistcoop.init({onLoad: 'login-required'}).success(function () {
            window.auth.authz = keycloak;
            window.auth.sistcoop = sistcoop;
            angular.module('mean').factory('Auth', function () {
                return auth;
            });

            window.realm.name = keycloak.realm;
            window.realm.authServerUrl = keycloak.authServerUrl;
            angular.module('mean').constant('REALM', window.realm);

            //Then init the app
            angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);

        }).error(function () {
            alert('No se pudo verificar el origen de sucursal y agencia para el usuario');
        });
    }).error(function () {
        window.location.reload();
    });
});
