'use strict';

/* jshint -W098 */
angular.module('socio').controller('SocioController', ['$scope', 'Auth',
    function ($scope, Auth) {

        $scope.package = {
            name: 'socio'
        };

        function getAccess(role) {
            if (!Auth) {
                return false;
            }

            var rolesSession = Auth.authz.resourceAccess.socio.roles;
            if (rolesSession.indexOf(role) !== -1) {
                return true;
            }

            return false;
        }

        $scope.access = {
            get createRealm() {
                return Auth.user && Auth.user.createRealm;
            },

            get verSocios() {
                return getAccess('ver-socios');
            },

            get administrarSocios() {
                return getAccess('administrar-socios');
            }
        };

    }
]);
