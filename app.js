var app = angular.module('nihongo', []);

app.controller('nihongoController', function () {


    var nouns = [
        {en: 'ice cream', jp: 'aisu kurīmu', article: 'an'},
        {en: 'this', jp: 'kore'},
        {en: 'that', jp: 'sore'},
        {en: 'that over there', jp: 'are'}
    ];

    var verbs = [
        {en: {i: 'eat', he: 'eats'}, jp: 'o tabemasu'}
    ];

    var subjects = [
        'I', 'you', 'he', 'she', 'it', 'we', 'they'
    ];

    var phraseData = [
        {
            en: 'Excuse me, please may I have INDEF NOUN?',
            jp: 'sumimasen NOUN o kudasai'
        },
        {
            en: 'Please may I have INDEF NOUN?',
            jp: 'NOUN o kudasai'
        },
        {
            en: 'SUB VERB NOUN',
            jp: 'NOUN VERB'
        }
    ];

    var phrases = [];
    angular.forEach(phraseData, function (phrase) {
        angular.forEach(nouns, function (noun) {
            angular.forEach(verbs, function(verb){
                angular.forEach(subjects, function (subject) {
                    phrases.push(buildPhrase(phrase, subject, verb, noun));
                });
            })
        });
    });
    this.phrases = phrases;

    function buildPhrase(phrase, subject, verb, noun) {
        var builtPhrase = {};
        builtPhrase.en = phrase.en
            .replace('NOUN', noun.en)
            .replace('INDEF', noun.article ? noun.article : '')
            .replace('SUB', subject)
            .replace('VERB', getVerbConjugation(subject, verb));

        builtPhrase.jp = phrase.jp
            .replace('NOUN', noun.jp)
            .replace('VERB', verb.jp);
        return builtPhrase;
    }

    function getVerbConjugation(subject, verb) {
        if(verb.en.he && (subject === 'he' || subject === 'she' || subject === 'it')) {
            return verb.en.he;
        }
        return verb.en.i;
    }
});

app.filter('unique', function() {
    return function(phrases) {
        var keys = [];
        var output = [];

        angular.forEach(phrases, function(phrase) {
            if(keys.indexOf(phrase.en) === -1) {
                output.push(phrase);
                keys.push(phrase.en);
            }
        });
        return output;
    };
});

app.filter('capitalise', function() {
    return function(phrase) {
        return phrase.slice(0,1).toUpperCase() + phrase.slice(1);
    };
});

