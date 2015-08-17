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

window.auth = {};

//Then define the init function for starting up the application
angular.element(document).ready(function () {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') {
        window.location.hash = '#!';
    }

    var keycloakUrl = 'https://keycloak-softgreen.rhcloud.com/auth';
    var rrhhUrl = 'http://localhost:8080/rrhh';
    var keycloakRealm = 'sistcoop';
    var keycloakClientId = 'sistcoop';

    /* jshint ignore:start */
    var keycloak = new Keycloak({
        url: keycloakUrl,
        realm: keycloakRealm,
        clientId: keycloakClientId
    });
    /* jshint ignore:end */

    /* jshint ignore:start */
    keycloak.init({onLoad: 'login-required'}).success(function () {
        var sistcoop = new Sistcoop({
            url: rrhhUrl,
            authenticatedToken: keycloak.token
        });

        sistcoop.init({onLoad: 'login-required'}).success(function () {
            window.auth.authz = keycloak;
            angular.module('mean').factory('Auth', function () {
                return window.auth;
            });

            angular.module('mean').constant('REALM', {name: keycloakRealm, authServerUrl: keycloakUrl});
            angular.module('mean').constant('SUCURSAL', sistcoop.sucursal);
            angular.module('mean').constant('AGENCIA', sistcoop.agencia);
            angular.module('mean').constant('TRABAJADOR', sistcoop.trabajador);

            //Then init the app
            angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);

        }).error(function () {
            alert('No se pudo verificar el origen de sucursal y agencia para el usuario');
        });
    }).error(function () {
        window.location.reload();
    });
    /* jshint ignore:end */

});

angular.module('mean').controller('KeycloakController',
    function ($scope, Auth, SUCURSAL, AGENCIA, TRABAJADOR) {

        $scope.logout = function () {
            Auth.authz.logout();
        };
        $scope.accountManagement = function () {
            Auth.authz.accountManagement();
        };

        $scope.user = {
            username: Auth.authz.idTokenParsed.preferred_username,
            roles: []
        };

        $scope.loadRoles = function () {
            var realmRoles = Auth.authz.realmAccess.roles;
            for (var i = 0; i < realmRoles.length; i++) {
                $scope.user.roles.push(realmRoles[i]);
            }
        };
        $scope.loadRoles();

        $scope.sucursal = SUCURSAL;
        $scope.agencia = AGENCIA;
        $scope.trabajador = TRABAJADOR;
    }
);

var resourceRequests = 0;
var loadingTimer = -1;

angular.module('mean').factory('authInterceptor', function ($q, Auth) {
    return {
        request: function (config) {
            if (!config.url.match(/.html$/)) {
                var deferred = $q.defer();
                if (Auth.authz.token) {
                    Auth.authz.updateToken(5).success(function () {
                        config.headers = config.headers || {};
                        config.headers.Authorization = 'Bearer ' + Auth.authz.token;

                        deferred.resolve(config);
                    }).error(function () {
                        location.reload();
                    });
                }
                return deferred.promise;
            } else {
                return config;
            }
        }
    };
});

angular.module('mean').factory('spinnerInterceptor', function ($q, $window, $rootScope, $location) {
    return function (promise) {
        return promise.then(function (response) {
            resourceRequests--;
            if (resourceRequests === 0) {
                if (loadingTimer !== -1) {
                    window.clearTimeout(loadingTimer);
                    loadingTimer = -1;
                }
                //$('#loading').hide();
            }
            return response;
        }, function (response) {
            resourceRequests--;
            if (resourceRequests === 0) {
                if (loadingTimer !== -1) {
                    window.clearTimeout(loadingTimer);
                    loadingTimer = -1;
                }
                //$('#loading').hide();
            }
            return $q.reject(response);
        });
    };
});

angular.module('mean').factory('errorInterceptor', function ($q, $window, $rootScope, $location, Auth) {
    return function (promise) {
        return promise.then(function (response) {
            return response;
        }, function (response) {
            if (response.status === 401) {
                Auth.authz.logout();
            } else if (response.status === 403) {
                $location.path('/forbidden');
            } else if (response.status === 404) {
                $location.path('/notfound');
            } else if (response.status) {
                if (response.data && response.data.errorMessage) {
                    alert(response.data.errorMessage);
                } else {
                    alert.error("An unexpected server error has occurred");
                }
            }
            return $q.reject(response);
        });
    };
});

angular.module('mean').config(function ($httpProvider) {
    $httpProvider.interceptors.push('errorInterceptor');
    var spinnerFunction = function (data, headersGetter) {
        if (resourceRequests === 0) {
            loadingTimer = window.setTimeout(function () {
                //$('#loading').show();
                loadingTimer = -1;
            }, 500);
        }
        resourceRequests++;
        return data;
    };
    $httpProvider.defaults.transformRequest.push(spinnerFunction);
    $httpProvider.interceptors.push('spinnerInterceptor');
    $httpProvider.interceptors.push('authInterceptor');
});
