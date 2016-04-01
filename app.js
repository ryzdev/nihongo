var app = angular.module('nihongo', []);

app.controller('nihongoController', nihongoController);

nihongoController.$inject = ['dataFactory'];

function nihongoController (dataFactory) {

    var phraseData = dataFactory.getPhraseData();
    var nouns = dataFactory.getNouns();
    var verbs = dataFactory.getVerbs();
    var subjects = dataFactory.getSubjects();
    var articles = dataFactory.getArticles();

    var phrases = [];
    angular.forEach(phraseData, function (phrase) {
        angular.forEach(nouns, function (noun) {
            angular.forEach(verbs, function (verb) {
                angular.forEach(subjects, function (subject) {
                    angular.forEach(articles, function (article) {
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
        if (verb.en.he && (subject === 'he' || subject === 'she' || subject === 'it')) {
            return verb.en.he;
        }
        return verb.en.i;
    }

    function getArticleAndNoun(article, noun) {
        if (noun.article === 'none') {
            return noun.en;
        }
        if (noun.article === 'irregular' && article === 'a') {
            return 'an ' + noun.en;
        }
        return article + ' ' + noun.en;
    }
}

// todo refactor into actual solution and to remove pointless looping - should later be able to replace counters with random
// todo don't forget you have skipped 'none' article
