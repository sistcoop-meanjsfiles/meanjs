'use strict';

// Configuring the application
angular.module('config').run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
);

angular.module('mean').config(function ($provide, sgKeycloakProvider, REALM) {
    sgKeycloakProvider.restUrl = REALM.authServerUrl + '/admin/realms/' + REALM.name;
});

angular.module('config').config(function (sgIso3166Provider) {
    sgIso3166Provider.restUrl = 'http://localhost:8080/iso3166/rest';
});

angular.module('config').config(function (sgIso4217Provider) {
    sgIso4217Provider.restUrl = 'http://localhost:8080/iso4217/rest';
});

angular.module('config').config(function (sgUbigeoProvider) {
    sgUbigeoProvider.restUrl = 'http://localhost:8080/ubigeo/rest';
});

angular.module('config').config(function (sgProductoProvider) {
    sgProductoProvider.restUrl = 'http://localhost:8080/producto/rest';
});

angular.module('config').config(function (sgPersonaProvider) {
    sgPersonaProvider.restUrl = 'http://localhost:8080/persona/rest';
});

angular.module('config').config(function (sgRrhhProvider) {
    sgRrhhProvider.restUrl = 'http://localhost:8080/rrhh/rest';
});

angular.module('config').config(function (sgCooperativaProvider) {
    sgCooperativaProvider.restUrl = 'http://localhost:8080/cooperativa/rest';
});

angular.module('config').run(function (editableOptions, editableThemes) {
    editableThemes.bs3.inputClass = 'input-sm form-control';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
});
