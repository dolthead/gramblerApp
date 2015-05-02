(function(){
    
    // Ionic Starter App
    'use strict';

    // angular.module is a global place for creating, registering and retrieving Angular modules
    // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
    // the 2nd parameter is an array of 'requires'
    var gapp = angular.module('gramblerApp', ['ionic']);

    gapp.config(function($stateProvider, $urlRouterProvider) {

    	$stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'templates/search.html',
                controller: 'MainCtrl as app'
            })
            .state('favorites', {
                url: '/favorites',
                templateUrl: 'templates/favorites.html'
//                controller: 'MainCtrl as app'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'templates/settings.html'
            });
        
        $urlRouterProvider.otherwise('/');
    });

    gapp.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });

}());
