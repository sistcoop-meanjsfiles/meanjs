'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
    // Init module configuration options
    var applicationModuleName = 'mean';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'angularFileUpload',
        //own
        'ngMessages',
        'ngSanitize',
        'ncy-angular-breadcrumb',
        'restangular',
        'sg-cooperativa',
        'sg-iso3166',
        'sg-iso4217',
        'sg-persona',
        'sg-producto',
        'sg-rrhh',
        'sg-socio',
        'sg-ubigeo',
        'sg-utils',
        'toastr',
        'ui.grid',
        'ui.grid.edit',
        'ui.grid.selection',
        'ui.select',
        'ui.select.utils',
        'ui.utils.masks',
        'xeditable',
        'ngFileUpload',
        'angularSpinner',
        'angular-ui-view-spinner',
        'patternfly'
    ];

    // Add a new vertical module
    var registerModule = function (moduleName, dependencies) {
        // Create angular module
        angular.module(moduleName, dependencies || []);

        // Add the module to the AngularJS configuration file
        angular.module(applicationModuleName).requires.push(moduleName);
    };

    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies,
        registerModule: registerModule
    };
})();
