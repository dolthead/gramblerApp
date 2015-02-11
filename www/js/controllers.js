'use strict';
angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope, $state, $http) {
	var app = this;
	app.word = 'sample';
	app.anagrams = [];

	app.scramble = function() {
		if (app.word === '') {
			app.clear();
		}
		else {
			app.word = app.word.replace(/[^A-Za-z]+/gi, "");
			$http.get("http://tdhale-23cw.xactware.com:8080/grambler/grambler?w=" + escape(app.word)).then(
				function(resp) {
					app.anagrams = resp.data.Anagrams;
				}, function(err) {
					// err.status will contain the status code
					console.error('ERR', err);
					app.anagrams = [{'word':'cannot reach grambler service'},{'word':'check your connection'}];
				}
			);
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

  // Called to navigate to the main app
  $scope.toAbout = function() {
    $state.go('about');
  };
})

.controller('AboutCtrl', function($scope, $state) {
  $scope.toMain = function(){
    $state.go('main');
  }
});
