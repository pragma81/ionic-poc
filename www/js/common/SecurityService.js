(function() {
    'use strict';

    angular
        .module('starter')
        .factory('securityservice', securityservice);

    /* @ngInject */
    function securityservice($cordovaOauth, $cordovaOauthUtility, $localStorage) {

        var userProfile = {};
        var accessToken = $localStorage.accessToken;
        var authenticated = accessToken === 'undefined' ? false: true;

        var oauthConf = {
            "facebook": {
                "appKey":"823607484376036"
            },
            "twitter": {
                "appKey":"QHYIHBk6wN9bg7wGN4PLzwO3U",
                "appSecret":"4qMvHewfyaejWXaf6rISsnlwtEfnMqvvEGvYnd2zznsOv1HMLy"
            }
        };

        var service = {
            facebookLogin: facebookLogin,
            twitterLogin: twitterLogin,
            isAuthenticated: isAuthenticated,
            logout: logout
        };

        return service;

        function facebookLogin(loginCallback,errorCallback){
            $cordovaOauth.facebook(oauthConf.facebook.appKey, ["email", "read_stream", "user_website", "user_location", "user_relationships","user_photos","user_likes"]).then(function(result) {
                $localStorage.accessToken = result.access_token;
                accessToken =  $localStorage.accessToken;
                authenticated = true;
                loginCallback(result);
            },function(error){
                errorCallback(error);
            })}

        function twitterLogin(loginCallback,errorCallback){
            $cordovaOauth.twitter(oauthConf.twitter.appKey, oauthConf.twitter.appSecret).then(function(result) {
                alert('twitter response:'+result);
                $localStorage.accessToken = result;
                accessToken =  $localStorage.accessToken;
                authenticated = true;
                loginCallback(resul);
            },function(error){
                errorCallback(error);
            })}

        function createTwitterSignature(method, url,appKey,appSecret) {
        var token = $localStorage.accessToken;
        var oauthObject = {
            oauth_consumer_key: appKey,
            oauth_nonce: $cordovaOauthUtility.createNonce(10),
            oauth_signature_method: "HMAC-SHA1",
            oauth_token: token.oauth_token,
            oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
            oauth_version: "1.0"
        };

        var signatureObj = $cordovaOauthUtility.createSignature(method, url, oauthObject, {}, appSecret, token.oauth_token_secret);
        $http.defaults.headers.common.Authorization = signatureObj.authorization_header;
    }


    function isAuthenticated(){
        return authenticated;
    }

    function logout(){
        delete $localStorage.accessToken ;
        accessToken =  undefined;
        authenticated = false;
    }
}
 })();
