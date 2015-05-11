// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngStorage','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

 app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'js/login/login.html',
                controller: 'LoginController'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'js/profile/profile.html',
                controller: 'ProfileController'
            })
            .state('feed', {
                url: '/feed',
                templateUrl: 'js/feed/feed.html',
                controller: 'FeedController'
            });
    $urlRouterProvider.otherwise('/login');
    });
