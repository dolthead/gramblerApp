(function(){
    
    'use strict';

    angular
        .module('gapp')
        .controller('MainController', MainController);
    
    MainController.$inject = ['$state', 'Anagrams', 'wordService', '$timeout'];
    
    function MainController($state, Anagrams, wordService, $timeout) {
        var app = this;
        app.word = 'sample';
		app.scramble = scramble;
		app.keyUp = keyUp;
		app.clear = clear;
		app.saveWord = saveWord;
		
		$timeout(app.scramble())
			.then(function(){
				app.anagrams = Anagrams.anagrams;
				wordService.saveAnagram(app.anagrams[0]);
		});
        
//		$timeout(wordService.saveAnagram(app.anagrams[0]), 2000);
//		wordService.saveAnagram(app.anagrams[0]);

        function scramble() {
            if (app.word === '') {
                app.clear();
            }
            else {
                app.word = app.word.replace(/[^A-Za-z]+/gi, "");
                wordService.getAnagrams(app.word).then(function(anagrams) {
                    app.anagrams = anagrams;
                });
            }
        }
        function keyUp(keyEvent) {
            if (keyEvent.keyCode == 13)
            {
                app.scramble();
            }
            else if (keyEvent.keyCode == 27)
            {
                app.clear();
            }
        }
        function clear() {
            app.word = '';
            //app.anagrams = [];
        }
        function saveWord(anagram) {
            // add source word and anagram to local store
            anagram.favorite = !anagram.favorite;
			anagram.inword = app.word;
            if (anagram.favorite) {
                wordService.saveAnagram(anagram);
            } else {
				wordService.deleteSavedAnagram(anagram);
			}
        }

    }

}());
