// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

/*
.config(function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
*/

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
})

.controller('MainCtrl', function($scope, $http) {
	var app = this;
	app.word = 'sample';
	app.anagrams = [];

	app.scramble = function() {
		if (app.word === '') {
			app.clear();
		}
		else {
			app.word = app.word.replace(/[^A-Za-z]+/gi, "");
			$http.get('http://tdhale-23cw.xactware.com:8080/grambler/grambler?w=' + escape(app.word)).then(function(resp) {
				app.anagrams = resp.data.Anagrams;
			}, function(err) {
				// err.status will contain the status code
				console.error('ERR', err);
			});
		}
	};
	app.keyPress = function(keyEvent) {
		if (keyEvent.which === 13)
		{
			app.scramble();
		}
	};
	app.clear = function() {
		app.word = '';
		app.anagrams = [];
	};
});

