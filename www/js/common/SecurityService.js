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
            twitterLogin: twitterLogin,
            isAuthenticated: isAuthenticated,
            logout: logout
        };

        return service;

        function facebookLogin(successCallback,errorCallback) {
            $cordovaOauth.facebook(oauthConf.facebook.appKey, ["email", "read_stream", "user_website", "user_location", "user_relationships","user_photos","user_likes"]).then(function(result) {
            $localStorage.accessToken = result.access_token;
            isAuthenticated = true;
                if(successCallback != 'undefined') successCallback(result);
                if(errorCallback != 'undefined') errorCallback(result);
            $state.go('app.profile');
        }, errorCallback);        }

        function twitterLogin(successCallback,errorCallback) {
            $cordovaOauth.facebook(oauthConf.facebook.appKey, ["email", "read_stream", "user_website", "user_location", "user_relationships","user_photos","user_likes"]).then(function(result) {
            $localStorage.accessToken = result.access_token;
            isAuthenticated = true;
                if(successCallback != 'undefined') successCallback(result);
                if(errorCallback != 'undefined') errorCallback(result);
            $state.go('app.profile');
        }, errorCallback);        }

        function isAuthenticated(){
            return isAuthenticated;
        }

        function logout(){
            delete $localStorage.accessToken;
            isAuthenticated = false;
        }

    }
})();
