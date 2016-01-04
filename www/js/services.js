(function(){

    'use strict';

    angular
        .module('gapp')
        .service('wordService', WordService);
    
    WordService.$inject = ['$http', '$filter', 'Anagrams'];
    
    function WordService($http, $filter, Anagrams) {
        var svc = this;
        
        svc.isSaved = isSaved;
        svc.getAnagrams = getAnagrams;
        svc.saveAnagram = saveAnagram;
        svc.getSavedAnagrams = getSavedAnagrams;
        svc.deleteSavedAnagram = deleteSavedAnagram;
        
        function isSaved(anagram) {
            // check to see if anagram is saved
            var foundAnagrams = $filter('filter')(Anagrams.savedAnagrams,
                {word: anagram.word, anagram: anagram.anagram}, true);
            return foundAnagrams.length;
        }
        
        function getAnagrams(word) {
            return $http.get("http://grambler.elasticbeanstalk.com/grambler?w="
                    + encodeURIComponent (word), {cache:true})
                .then(getSuccess, getFail);
        }
        function getSuccess(resp) {
            var anagrams = resp.data.Anagrams;
            anagrams.forEach(function (anagram) {
                anagram.favorite = isSaved(anagram);
            });
            return anagrams;
        }
        function getFail(err) {
            // err.status will contain the status code
            console.error('ERR', err);
            var anagrams = [{'word':'cannot reach grambler service'},{'word':'check your connection'}];
            return anagrams;
        }
        
        function saveAnagram(anagram) {
            // if it's not already in the list, save anagram
            if (!isSaved(anagram))
            {
                Anagrams.savedAnagrams.push(anagram);
            }
        }
        
        function getSavedAnagrams() {
            return Anagrams.savedAnagrams;
        }
        
        function deleteSavedAnagram(anagram) {
            // remove word/anagram from saved list
			var index = Anagrams.savedAnagrams.indexOf(anagram);
			if (index > -1) {
				Anagrams.savedAnagrams.splice(index, 1);
			}
        }
        
    }

}());
