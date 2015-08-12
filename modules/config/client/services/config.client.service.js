'use strict';

angular.module('config').provider('sgKeycloak', function () {

    this.restUrl = 'http://localhost';

    this.$get = function () {
        var restUrl = this.restUrl;
        return {
            getRestUrl: function () {
                return restUrl;
            }
        };
    };

    this.setRestUrl = function (restUrl) {
        this.restUrl = restUrl;
    };
});


angular.module('config').factory('KeycloakRestangular', ['Restangular', 'sgKeycloak', function (Restangular, sgKeycloak) {
    return Restangular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(sgKeycloak.getRestUrl());
    });
}]);

angular.module('config').factory('SGUsuarioKeycloak', ['KeycloakRestangular', 'REALM', function (KeycloakRestangular, REALM) {

    var url = 'users';

    var modelMethos = {
        $find: function (username) {
            return KeycloakRestangular.one(url, username).get();
        },
        $search: function (queryParams) {
            return KeycloakRestangular.all(url).getList(queryParams);
        },
        $roleMappings: function (username) {
            return KeycloakRestangular.one(url + '/' + username + '/role-mappings').get();
        },
        $realmRoles: function (username) {
            return KeycloakRestangular.one(url + '/' + username + '/role-mappings/realm').get();
        },

        $getRealmLevelRoles: function () {
            return KeycloakRestangular.all('roles').getList();
        },
        $getCreateRealmUserUrl: function () {
            return REALM.authServerUrl + '/admin/' + REALM.name + '/console/#/create/user/' + REALM.name;
        }

    };

    return modelMethos;

}]);
