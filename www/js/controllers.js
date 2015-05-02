(function(){
    
    'use strict';

    angular.module('gramblerApp')
        
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
        this.clear = function() {
            app.word = '';
            //app.anagrams = [];
        };
        app.toAbout = function() {
            $state.go('about');
        };
        app.saveWord = function(index) {
            var anagram = app.anagrams[index];
            anagram.favorite = !anagram.favorite;
            // add source word and anagram to local store
            wordService.saveAnagram(app.word, anagram.word);
        };

    })

    .controller('FavoritesCtrl', function(wordService) {
        this.deleteFavorite = function(word, anagram){
            // remove
            wordService.deleteSaved(word, anagram);
        }
    });

}());
