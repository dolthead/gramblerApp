(function(){
    
    'use strict';

    angular
        .module('gapp')
        .controller('FavoritesController', FavoritesController);
    
    FavoritesController.$inject = ['Anagrams', 'wordService'];
   
    function FavoritesController(Anagrams, wordService) {
        var favs = this;
        favs.savedAnagrams = Anagrams.savedAnagrams;
		
        this.deleteSavedAnagram = function(anagram){
            // remove
            wordService.deleteSavedAnagram(anagram);
        };
    }

}());
