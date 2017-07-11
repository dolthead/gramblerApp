(function(){

    'use strict';

    angular
        .module('gapp')
        .factory('Anagrams', Anagrams);
    
    Anagrams.$inject = [];

    function Anagrams() {
        var data = this;
        data.anagrams = [];
        data.savedAnagrams = [];

        return {
            anagrams: data.anagrams,
            savedAnagrams: data.savedAnagrams
        }
        // Other methods or objects can go here
    }

}());
