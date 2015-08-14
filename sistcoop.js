(function (window, undefined) {

    var Sistcoop = function (config) {
        if (!(this instanceof Sistcoop)) {
            return new Sistcoop(config);
        }

        var sc = this;
        var adapter;
        var refreshQueue = [];

        var loginIframe = {
            enable: true,
            callbackMap: [],
            interval: 5
        };

        sc.init = function (initOptions) {
            sc.authenticated = false;

            if (window.Cordova) {
                adapter = loadAdapter('cordova');
            } else {
                adapter = loadAdapter();
            }

            if (initOptions) {
                if (typeof initOptions.checkLoginIframe !== 'undefined') {
                    loginIframe.enable = initOptions.checkLoginIframe;
                }

                if (initOptions.checkLoginIframeInterval) {
                    loginIframe.interval = initOptions.checkLoginIframeInterval;
                }

                if (initOptions.onLoad === 'login-required') {
                    sc.loginRequired = true;
                }
            }

            var promise = createPromise();

            var initPromise = createPromise();
            initPromise.promise.success(function () {
                sc.onReady && sc.onReady(sc.authenticated);
                promise.setSuccess(sc.authenticated);
            }).error(function () {
                promise.setError();
            });

            var configPromise = loadConfig(config);

            function onLoad() {
                var doLogin = function (prompt) {
                    if (!prompt) {
                        options.prompt = 'none';
                    }
                    sc.login(options).success(function () {
                        initPromise.setSuccess();
                    }).error(function () {
                        initPromise.setError();
                    });
                };

                var options = {};
                switch (initOptions.onLoad) {
                    case 'check-sso':
                        if (loginIframe.enable) {
                            setupCheckLoginIframe().success(function () {
                                checkLoginIframe().success(function () {
                                    doLogin(false);
                                }).error(function () {
                                    initPromise.setSuccess();
                                });
                            });
                        } else {
                            doLogin(false);
                        }
                        break;
                    case 'login-required':
                        doLogin(true);
                        break;
                    default:
                        throw 'Invalid value for onLoad';
                }
            }

            function processInit() {
                var callback = parseCallback(window.location.href);

                if (callback) {
                    setupCheckLoginIframe();
                    window.history.replaceState({}, null, callback.newUrl);
                    processCallback(callback, initPromise);
                    return;
                } else if (initOptions) {
                    if (initOptions.token || initOptions.refreshToken) {
                        setToken(initOptions.token, initOptions.refreshToken, initOptions.idToken);

                        if (loginIframe.enable) {
                            setupCheckLoginIframe().success(function () {
                                checkLoginIframe().success(function () {
                                    initPromise.setSuccess();
                                }).error(function () {
                                    if (initOptions.onLoad) {
                                        onLoad();
                                    }
                                });
                            });
                        } else {
                            initPromise.setSuccess();
                        }
                    } else if (initOptions.onLoad) {
                        onLoad();
                    }
                } else {
                    initPromise.setSuccess();
                }
            }

            configPromise.success(processInit);
            configPromise.error(function () {
                promise.setError();
            });

            return promise.promise;
        };

        sc.login = function (options) {
            return adapter.login(options);
        };

        sc.logout = function (options) {
            return adapter.logout(options);
        };

        function loadConfig(url) {
            var promise = createPromise();
            var configUrl;

            if (!config) {
                configUrl = 'sistcoop.json';
            } else if (typeof config === 'string') {
                configUrl = config;
            }

            if (configUrl) {
                var req = new XMLHttpRequest();
                req.open('GET', configUrl, true);
                req.setRequestHeader('Accept', 'application/json');

                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.status == 200) {
                            var config = JSON.parse(req.responseText);

                            sc.authServerUrl = config['auth-server-url'];
                            sc.sucursal = config['sucursal'];
                            sc.agencia = config['agencia'];
                            sc.authenticatedToken = config['authenticatedToken'];
                            sc.clientSecret = (config['credentials'] || {})['secret'];

                            promise.setSuccess();
                        } else {
                            promise.setError();
                        }
                    }
                };

                req.send();
            } else {
                if (!config['url']) {
                    var scripts = document.getElementsByTagName('script');
                    for (var i = 0; i < scripts.length; i++) {
                        if (scripts[i].src.match(/.*sistcoop\.js/)) {
                            config.url = scripts[i].src.substr(0, scripts[i].src.indexOf('/js/sistcoop.js'));
                            break;
                        }
                    }
                }

                if (!config.sucursal) {
                    throw 'sucursal missing';
                }

                if (!config.agencia) {
                    throw 'agencia missing';
                }

                sc.authServerUrl = config.url;
                sc.sucursal = config.sucursal;
                sc.agencia = config.agencia;
                sc.authenticatedToken = config.authenticatedToken;
                sc.clientSecret = (config.credentials || {}).secret;

                promise.setSuccess();
            }

            return promise.promise;
        }

        function setToken(token, refreshToken, idToken) {
            if (token) {
                sc.token = token;
                sc.tokenParsed = decodeToken(token);
                var sessionId = sc.realm + '/' + sc.tokenParsed.sub;
                if (sc.tokenParsed.session_state) {
                    sessionId = sessionId + '/' + sc.tokenParsed.session_state;
                }
                sc.sessionId = sessionId;
                sc.authenticated = true;
                sc.subject = sc.tokenParsed.sub;
                sc.realmAccess = sc.tokenParsed.realm_access;
                sc.resourceAccess = sc.tokenParsed.resource_access;
            } else {
                delete sc.token;
                delete sc.tokenParsed;
                delete sc.subject;
                delete sc.realmAccess;
                delete sc.resourceAccess;

                sc.authenticated = false;
            }

            if (refreshToken) {
                sc.refreshToken = refreshToken;
                sc.refreshTokenParsed = decodeToken(refreshToken);
            } else {
                delete sc.refreshToken;
                delete sc.refreshTokenParsed;
            }

            if (idToken) {
                sc.idToken = idToken;
                sc.idTokenParsed = decodeToken(idToken);
            } else {
                delete sc.idToken;
                delete sc.idTokenParsed;
            }
        }

        function decodeToken(str) {
            str = str.split('.')[1];

            str = str.replace('/-/g', '+');
            str = str.replace('/_/g', '/');
            switch (str.length % 4) {
                case 0:
                    break;
                case 2:
                    str += '==';
                    break;
                case 3:
                    str += '=';
                    break;
                default:
                    throw 'Invalid token';
            }

            str = (str + '===').slice(0, str.length + (str.length % 4));
            str = str.replace(/-/g, '+').replace(/_/g, '/');

            str = decodeURIComponent(escape(atob(str)));

            str = JSON.parse(str);
            return str;
        }

        function createUUID() {
            var s = [];
            var hexDigits = '0123456789abcdef';
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = '4';
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
            s[8] = s[13] = s[18] = s[23] = '-';
            var uuid = s.join('');
            return uuid;
        }

        sc.callback_id = 0;

        function createCallbackId() {
            var id = '<id: ' + (sc.callback_id++) + (Math.random()) + '>';
            return id;
        }

        function parseCallback(url) {
            if (url.indexOf('?') != -1) {
                var oauth = {};

                oauth.newUrl = url.split('?')[0];
                var paramString = url.split('?')[1];
                var fragIndex = paramString.indexOf('#');
                if (fragIndex != -1) {
                    paramString = paramString.substring(0, fragIndex);
                }
                var params = paramString.split('&');
                for (var i = 0; i < params.length; i++) {
                    var p = params[i].split('=');
                    switch (decodeURIComponent(p[0])) {
                        case 'code':
                            oauth.code = p[1];
                            break;
                        case 'error':
                            oauth.error = p[1];
                            break;
                        case 'state':
                            oauth.state = decodeURIComponent(p[1]);
                            break;
                        case 'redirect_fragment':
                            oauth.fragment = decodeURIComponent(p[1]);
                            break;
                        case 'prompt':
                            oauth.prompt = p[1];
                            break;
                        default:
                            oauth.newUrl += (oauth.newUrl.indexOf('?') == -1 ? '?' : '&') + p[0] + '=' + p[1];
                            break;
                    }
                }

                var sessionState = sessionStorage.oauthState && JSON.parse(sessionStorage.oauthState);

                if (sessionState && (oauth.code || oauth.error) && oauth.state && oauth.state == sessionState.state) {
                    delete sessionStorage.oauthState;

                    oauth.redirectUri = sessionState.redirectUri;

                    if (oauth.fragment) {
                        oauth.newUrl += '#' + oauth.fragment;
                    }

                    return oauth;
                }
            }
        }

        function createPromise() {
            var p = {
                setSuccess: function (result) {
                    p.success = true;
                    p.result = result;
                    if (p.successCallback) {
                        p.successCallback(result);
                    }
                },

                setError: function (result) {
                    p.error = true;
                    p.result = result;
                    if (p.errorCallback) {
                        p.errorCallback(result);
                    }
                },

                promise: {
                    success: function (callback) {
                        if (p.success) {
                            callback(p.result);
                        } else if (!p.error) {
                            p.successCallback = callback;
                        }
                        return p.promise;
                    },
                    error: function (callback) {
                        if (p.error) {
                            callback(p.result);
                        } else if (!p.success) {
                            p.errorCallback = callback;
                        }
                        return p.promise;
                    }
                }
            };
            return p;
        }

        function setupCheckLoginIframe() {
            var promise = createPromise();

            if (!loginIframe.enable) {
                promise.setSuccess();
                return promise.promise;
            }

            if (loginIframe.iframe) {
                promise.setSuccess();
                return promise.promise;
            }

            var iframe = document.createElement('iframe');
            loginIframe.iframe = iframe;

            iframe.onload = function () {
                var realmUrl = getRealmUrl();
                if (realmUrl.charAt(0) === '/') {
                    loginIframe.iframeOrigin = getOrigin();
                } else {
                    loginIframe.iframeOrigin = realmUrl.substring(0, realmUrl.indexOf('/', 8));
                }
                promise.setSuccess();

                setTimeout(check, loginIframe.interval * 1000);
            };

            var src = getRealmUrl() + '/protocol/openid-connect/login-status-iframe.html?client_id=' + encodeURIComponent(sc.clientId) + '&origin=' + getOrigin();
            iframe.setAttribute('src', src);
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            var messageCallback = function (event) {
                if (event.origin !== loginIframe.iframeOrigin) {
                    return;
                }
                var data = JSON.parse(event.data);
                var promise = loginIframe.callbackMap[data.callbackId];
                delete loginIframe.callbackMap[data.callbackId];

                if ((!sc.sessionId || sc.sessionId == data.session) && data.loggedIn) {
                    promise.setSuccess();
                } else {
                    sc.clearToken();
                    promise.setError();
                }
            };
            window.addEventListener('message', messageCallback, false);

            var check = function () {
                checkLoginIframe();
                if (sc.token) {
                    setTimeout(check, loginIframe.interval * 1000);
                }
            };

            return promise.promise;
        }

        function checkLoginIframe() {
            var promise = createPromise();

            if (loginIframe.iframe && loginIframe.iframeOrigin) {
                var msg = {};
                msg.callbackId = createCallbackId();
                loginIframe.callbackMap[msg.callbackId] = promise;
                var origin = loginIframe.iframeOrigin;
                loginIframe.iframe.contentWindow.postMessage(JSON.stringify(msg), origin);
            } else {
                promise.setSuccess();
            }

            return promise.promise;
        }

        function loadAdapter(type) {
            if (!type || type == 'default') {
                return {
                    login: function (options) {
                        var p = createPromise();

                        // @POST serverUrl/authentication/login
                        var  url = sc.authServerUrl + '/rest/authentication/login';
                        var params = 'sucursal=' + sc.sucursal + '&agencia=' + sc.agencia;

                        //Create post
                        var req = new XMLHttpRequest();
                        req.open('POST', url, true);
                        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        req.setRequestHeader('Authorization', 'Bearer ' + sc.authenticatedToken);

                        req.onreadystatechange = function () {
                            if (req.readyState == 4) {
                                if (req.status == 200) {
                                    //var tokenResponse = JSON.parse(req.responseText);
                                    //setToken(tokenResponse['access_token'], tokenResponse['refresh_token'], tokenResponse['id_token']);
                                    //kc.onAuthRefreshSuccess && kc.onAuthRefreshSuccess();
                                    //for (var p = refreshQueue.pop(); p != null; p = refreshQueue.pop()) {
                                    p.setSuccess(true);
                                    //}
                                } else {
                                    //kc.onAuthRefreshError && kc.onAuthRefreshError();
                                    //for (var p = refreshQueue.pop(); p != null; p = refreshQueue.pop()) {
                                    p.setError(true);
                                    //}
                                }
                            }
                        };
                        req.send(params);

                        //var promise = createPromise();
                        //promise.setSuccess();
                        return p.promise;
                    },

                    logout: function (options) {
                        return createPromise().promise;
                    }
                };
            }

            throw 'invalid adapter type: ' + type;
        }
    };

    if (typeof module === "object" && module && typeof module.exports === "object") {
        module.exports = Sistcoop;
    } else {
        window.Sistcoop = Sistcoop;

        if (typeof define === "function" && define.amd) {
            define("sistcoop", [], function () {
                return Sistcoop;
            });
        }
    }
})(window);
