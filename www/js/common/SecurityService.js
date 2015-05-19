(function() {
    'use strict';

    angular
        .module('starter')
        .factory('securityservice', securityservice);

    /* @ngInject */
    function securityservice($cordovaOauth, $localStorage) {

        var userProfile = {};
        var accessToken = $localStorage.accessToken;
        var isAuthenticated = accessToken === 'undefined' ? false: true;

        var oauthConf = {
            "facebook": {
                "appKey":"823607484376036"
            },
            "twitter": {
                "appKey":"QHYIHBk6wN9bg7wGN4PLzwO3U",
                "appSecret":"4qMvHewfyaejWXaf6rISsnlwtEfnMqvvEGvYnd2zznsOv1HMLy"
            }
        }

        var service = {
            facebookLogin: facebookLogin,
            twitterLogin: getCustomers,
            isAuthenticated: isAuthenticated,
            logout: logout
        };

        return service;

        function getCustomer(id) {
            return $http.get('/api/customer/' + id)
                .then(getCustomerComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getCustomer')(message);
                    $location.url('/');
                });

            function getCustomerComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getCustomers() {
            return $http.get('/api/customers')
                .then(getCustomersComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getCustomers')(message);
                    $location.url('/');
                });

            function getCustomersComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getReady() {
            if (!readyPromise) {
                // Apps often pre-fetch session data ("prime the app")
                // before showing the first view.
                // This app doesn't need priming but we add a
                // no-op implementation to show how it would work.
                logger.info('Primed the app data');
                readyPromise = $q.when(service);
            }
            return readyPromise;
        }

        function ready(promisesArray) {
            return getReady()
                .then(function() {
                    return promisesArray ? $q.all(promisesArray) : readyPromise;
                })
                .catch(exception.catcher('"ready" function failed'));
        }
    }
})();
