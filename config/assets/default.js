'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        'public/lib/patternfly/dist/css/patternfly.css',
        'public/lib/patternfly/dist/css/patternfly-additions.css',
        'public/lib/angular-toastr/dist/angular-toastr.css',
        'public/lib/angular-ui-select/dist/select.css',
        'public/lib/angular-ui-grid/ui-grid.css',
        'public/lib/angular-xeditable/dist/css/xeditable.css',
        'public/lib/angular-ui-view-spinner/src/angular-ui-view-spinner.css'
      ],
      js: [
        'public/lib/angular/angular.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-sanitize/angular-sanitize.js',
        'public/lib/restangular/dist/restangular.js',
        'public/lib/underscore/underscore.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-toastr/dist/angular-toastr.tpls.js',
        'public/lib/angular-breadcrumb/dist/angular-breadcrumb.js',
        'public/lib/angular-input-masks/angular-input-masks-standalone.js',
        'public/lib/angular-ui-select/dist/select.js',
        'public/lib/angular-ui-grid/ui-grid.js',
        'public/lib/select-utils/dist/select.utils.js',
        'public/lib/angular-xeditable/dist/js/xeditable.js',
        'public/lib/spin.js/spin.js',
        'public/lib/angular-spinner/angular-spinner.js',
        'public/lib/angular-ui-view-spinner/src/angular-ui-view-spinner.js',
        'public/lib/angular-patternfly/dist/angular-patternfly.js',
        'public/lib/ng-file-upload/ng-file-upload-all.js',
        'public/lib/sg-cooperativa/dist/sg-cooperativa.js',
        'public/lib/sg-iso3166/dist/sg-iso3166.js',
        'public/lib/sg-iso4217/dist/sg-iso4217.js',
        'public/lib/sg-persona/dist/sg-persona.js',
        'public/lib/sg-producto/dist/sg-producto.js',
        'public/lib/sg-rrhh/dist/sg-rrhh.js',
        'public/lib/sg-socio/dist/sg-socio.js',
        'public/lib/sg-ubigeo/dist/sg-ubigeo.js',
        'public/lib/sg-utils/dist/sg-utils.js'
      ],
      tests: ['public/lib/angular-mocks/angular-mocks.js']
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    less: [
      'modules/*/client/less/*.less'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ],
    js: [
      'modules/core/client/app/config.js',
      'modules/core/client/app/init.js',
      'modules/*/client/*.js',
      'modules/*/client/**/*.js'
    ],
    views: ['modules/*/client/views/**/*.html']
  },
  server: {
    gruntConfig: 'gruntfile.js',
    gulpConfig: 'gulpfile.js',
    allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
    models: 'modules/*/server/models/**/*.js',
    routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
    sockets: 'modules/*/server/sockets/**/*.js',
    config: 'modules/*/server/config/*.js',
    policies: 'modules/*/server/policies/*.js',
    views: 'modules/*/server/views/*.html'
  }
};
