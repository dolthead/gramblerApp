(function(){
    
    'use strict';

    angular.module('gapp', ['ionic'])

    .config(function($stateProvider, $urlRouterProvider) {

    	$stateProvider
            .state('main', {
                url: '/search',
                templateUrl: 'templates/search.html',
                controller: 'MainController as app'
            })
            .state('favorites', {
                url: '/favorites',
                templateUrl: 'templates/favorites.html',
                controller: 'FavoritesController as favs'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'templates/settings.html'
            });
        
        $urlRouterProvider.otherwise('/search');
    })

    .run(function($ionicPlatform) {
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
