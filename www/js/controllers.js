'use strict';
angular.module('grambler.controllers', [])

.controller('MainCtrl', function($state, $http) {
	var app = this;
	app.word = 'sample';
	app.anagrams = [];

	app.scramble = function() {
		if (app.word === '') {
			app.clear();
		}
		else {
			app.word = app.word.replace(/[^A-Za-z]+/gi, "");
			$http.get("http://tdhale-23cw.xactware.com:8080/grambler/grambler?w=" + escape(app.word), {cache:true})
				.then(function(resp) {
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
	app.toAbout = function() {
		$state.go('about');
	};

})

.controller('AboutCtrl', function($state) {
	var app = this;
	app.toMain = function(){
		$state.go('main');
	}
});
