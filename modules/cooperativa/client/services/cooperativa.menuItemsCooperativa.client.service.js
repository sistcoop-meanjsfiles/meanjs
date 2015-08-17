'use strict';

angular.module('cooperativa').service('$menuItemsCooperativa', [
    function () {

        this.menuItems = [];

        var $menuItemsRef = this;

        var menuItemObj = {
            parent: null,

            title: '',
            link: '', // starting with "./" will refer to parent link concatenation
            state: '', // will be generated from link automatically where "/" (forward slashes) are replaced with "."
            icon: '',

            isActive: false,
            label: null,

            menuItems: [],

            setLabel: function (label, color, hideWhenCollapsed) {
                if (typeof hideWhenCollapsed === 'undefined')
                    hideWhenCollapsed = true;

                this.label = {
                    text: label,
                    classname: color,
                    collapsedHide: hideWhenCollapsed
                };

                return this;
            },

            addItem: function (title, link, icon) {
                var parent = this,
                    item = angular.extend(angular.copy(menuItemObj), {
                        parent: parent,

                        title: title,
                        link: link,
                        icon: icon
                    });

                if (item.link) {
                    if (item.link.match(/^\./))
                        item.link = parent.link + item.link.substring(1, link.length);

                    if (item.link.match(/^-/))
                        item.link = parent.link + '-' + item.link.substring(2, link.length);

                    item.state = $menuItemsRef.toStatePath(item.link);
                }

                this.menuItems.push(item);

                return item;
            }
        };

        this.addItem = function (title, link, icon) {
            var item = angular.extend(angular.copy(menuItemObj), {
                title: title,
                link: link,
                state: this.toStatePath(link),
                icon: icon
            });

            this.menuItems.push(item);

            return item;
        };

        this.getAll = function () {
            return this.menuItems;
        };

        this.prepareSidebarMenu = function () {
            this.menuItems = [];

            var estructura = this.addItem('Estructura', '', 'linecons-user');
            var transaccionInterna = this.addItem('Transaccion interna', '', 'linecons-user');
            var transaccionCliente = this.addItem('Transaccion clientes', '', 'linecons-user');

            estructura.addItem('Bovedas', 'cooperativa.app.estructura.boveda');
            estructura.addItem('Cajas', 'cooperativa.app.estructura.caja');

            transaccionInterna.addItem('Boveda/Caja', 'cooperativa.app.transaccionInterna.buscarTransaccionesBovedaCaja');
            transaccionInterna.addItem('Caja/Caja', 'cooperativa.app.transaccionInterna.buscarTransaccionesCajaCaja');

            transaccionCliente.addItem('Transaccion aporte', 'cooperativa.app.transaccionCliente.buscarTransaccionesAporte');
            transaccionCliente.addItem('Transaccion cta.personal', 'cooperativa.app.transaccionCliente.buscarTransaccionesAporte');
            transaccionCliente.addItem('Transaccion compra/venta', 'cooperativa.app.transaccionCliente.buscarTransaccionesAporte');


            return this;
        };

        this.instantiate = function () {
            return angular.copy(this);
        };

        this.toStatePath = function (path) {
            return path.replace(/\//g, '.').replace(/^\./, '');
        };

    }
]);
