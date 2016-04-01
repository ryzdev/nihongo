var app = angular.module('nihongo', []);

app.controller('nihongoController', function () {


    var nouns = [
        {en: 'ice cream', jp: 'aisu kurīmu', article: 'irregular'},
        {en: 'this', jp: 'kore', article: 'none'},
        {en: 'that', jp: 'sore', article: 'none'},
        {en: 'that over there', jp: 'are', article: 'none'},
        {en: 'sandwich', jp: 'sandoicchi', article: 'discrete'}
    ];

    var verbs = [
        {en: {i: 'eat', he: 'eats'}, jp: 'o tabemasu'}
    ];

    var subjects = [
        'I', 'you', 'he', 'she', 'it', 'we', 'they'
    ];

    var articles = [
        'a', 'the'
    ];


    var phraseData = [
        {
            en: 'Excuse me, please may I have NOUN?',
            jp: 'sumimasen NOUN o kudasai'
        },
        {
            en: 'Please may I have NOUN?',
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
                    angular.forEach(articles, function(article){
                        phrases.push(buildPhrase(phrase, subject, verb, article, noun));
                    });
                });
            })
        });
    });
    this.phrases = phrases;

    function buildPhrase(phrase, subject, verb, article, noun) {
        var builtPhrase = {};
        builtPhrase.en = phrase.en
            .replace('NOUN', getArticleAndNoun(article, noun))
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

    function getArticleAndNoun(article, noun) {
        if(noun.article === 'none') {
            return noun.en;
        }
        if(noun.article === 'irregular' && article === 'a') {
            return 'an ' + noun.en;
        }
        return article + ' ' + noun.en;
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

// todo refactor into actual solution and to remove pointless looping - should later be able to replace counters with random
// todo don't forget you have skipped 'none' article
