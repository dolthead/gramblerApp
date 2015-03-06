'use strict';

angular.module('gramblerControllers', ['gramblerServices'])

.controller('MainCtrl', function($state, wordService) {
	var app = this;
	app.word = 'sample';
	app.anagrams = [];

	app.scramble = function() {
		if (app.word === '') {
			app.clear();
		}
		else {
			app.word = app.word.replace(/[^A-Za-z]+/gi, "");
            wordService.getAnagrams(app.word).then(function(anagrams) {
                app.anagrams = anagrams;
            });
		}
	};
	app.keyUp = function(keyEvent) {
		if (keyEvent.keyCode == 13)
		{
			app.scramble();
		}
        else if (keyEvent.keyCode == 27)
		{
			app.clear();
		}
	};
	app.clear = function() {
		app.word = '';
		//app.anagrams = [];
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
