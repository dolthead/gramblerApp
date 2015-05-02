(function(){

    'use strict';

    angular.module('gramblerApp')

    .factory('wordService', function($http) {
        var anagrams = [];
        var savedAnagrams = [];
        return {
            getAnagrams: function(word) {
                return $http.get("http://grambler.elasticbeanstalk.com/grambler?w=" + escape(word), {cache:true})
                .then(function(resp) {
                        anagrams = resp.data.Anagrams;
                        anagrams.forEach(function (anagram) {
                            anagram.favorite = false;
                        });
                        return anagrams;
                    }, function(err) {
                        // err.status will contain the status code
                        console.error('ERR', err);
                        anagrams = [{'word':'cannot reach grambler service'},{'word':'check your connection'}];
                        return anagrams;
                    }
                );
            },
            saveAnagram: function(word, anagram) {
                // if it's not already in the list, save anagram
            },
            getSavedAnagrams: function() {
                if (savedAnagrams.length === 0)
                {
                    // read anagrams from data store into savedAnagrams
                }
            },
            isSaved: function(word, anagram) {
                // check to see if anagram is saved
            },
            deleteSaved: function(word, anagram) {
                // remove word/anagram from saved list
            }
        }
    });

}());
