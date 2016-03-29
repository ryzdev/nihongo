angular.module('nihongo', []).controller('nihongoController', function () {


    var nouns = [
        {en: 'ice cream', jp: 'aisu kurīmu', article: 'an'},
        {en: 'this', jp: 'kore'},
        {en: 'that', jp: 'sore'},
        {en: 'that over there', jp: 'are'}
    ];

    var phraseData = [
        {
            en: 'Excuse me, please may I have INDEF NOUN?',
            jp: 'sumimasen NOUN o kudasai'
        },
        {
            en: 'Please may I have INDEF NOUN?',
            jp: 'NOUN o kudasai'
        }
    ];

    var phrases = [];
    angular.forEach(phraseData, function (phrase) {
        angular.forEach(nouns, function (noun) {
            phrases.push(buildPhrase(phrase, noun));
        });
    });
    this.phrases = phrases;

    function buildPhrase(phrase, noun) {
        var builtPhrase = {};
        builtPhrase.en = phrase.en.replace('NOUN', noun.en).replace('INDEF', noun.article ? noun.article : '');
        builtPhrase.jp = phrase.jp.replace('NOUN', noun.jp);
        return builtPhrase;
    }

});

