var app = angular.module('nihongo', []);

app.controller('nihongoController', nihongoController);

nihongoController.$inject = ['dataFactory'];

function nihongoController(factory) {

    var ctrl = this;

    var phraseData = factory.getPhraseData();
    var subjects = factory.getSubjects();
    var verbs = factory.getVerbs();
    var articles = factory.getArticles();
    var nouns = factory.getNouns();

    var numberOfNewItemsRemaining = checkNewItemsRemaining();
    ctrl.phrases = [];

    while (numberOfNewItemsRemaining > 0) {
        ctrl.phrases.push(buildPhrase());
        numberOfNewItemsRemaining = checkNewItemsRemaining();
    }

    function buildPhrase() {
        var phrase = getPhrase();
        var subject = getSubject();
        var verb = getVerb();
        var article = getArticle();
        var noun = getNoun();

        var builtPhrase = {};
        builtPhrase.en = phrase.en
            .replace('SUB', subject)
            .replace('VERB', getVerbConjugation(subject, verb))
            .replace('NOUN', getArticleAndNoun(article, noun));

        builtPhrase.jp = phrase.jp
            .replace('NOUN', noun.jp)
            .replace('VERB', verb.jp);
        return builtPhrase;
    }

    function getPhrase() {
        if (phraseData.length > 0) {
            var randomIndex = getRandomIndex(phraseData);
            var phrase = phraseData[randomIndex];
            phraseData.splice(randomIndex, 1);
            return phrase;
        } else {
            return factory.getPhraseData()[getRandomIndex(phraseData)];
        }
    }

    function getSubject() {
        if (subjects.length > 0) {
            var randomIndex = getRandomIndex(subjects);
            var subject = subjects[randomIndex];
            subjects.splice(randomIndex, 1);
            return subject;
        } else {
            return factory.getSubjects()[getRandomIndex(subjects)];
        }
    }

    function getVerb() {
        if (verbs.length > 0) {
            var randomIndex = getRandomIndex(verbs);
            var verb = verbs[randomIndex];
            verbs.splice(randomIndex, 1);
            return verb;
        } else {
            return factory.getVerbs()[getRandomIndex(verbs)];
        }
    }

    function getArticle() {
        if (articles.length > 0) {
            var randomIndex = getRandomIndex(articles);
            var article = articles[randomIndex];
            articles.splice(randomIndex, 1);
            return article;
        } else {
            return factory.getArticles()[getRandomIndex(articles)];
        }
    }

    function getNoun() {
        if (nouns.length > 0) {
            var randomIndex = getRandomIndex(nouns);
            var noun = nouns[randomIndex];
            nouns.splice(randomIndex, 1);
            return noun;
        } else {
            return factory.getNouns()[getRandomIndex(nouns)];
        }
    }

    function getRandomIndex(list) {
        return Math.floor(list.length * Math.random());
    }

    function getVerbConjugation(subject, verb) {
        if (verb.en.he && (subject === 'he' || subject === 'she' || subject === 'it')) {
            return verb.en.he;
        }
        return verb.en.i;
    }

    function getArticleAndNoun(article, noun) {
        if (article === 'noArticle' && noun.article === 'discrete') {
            return 'a ' + noun.en;
        }
        if (article === 'noArticle' || noun.article === 'none') {
            return noun.en;
        }
        if (article === 'a' && noun.article === 'irregular') {
            return 'an ' + noun.en;
        }
        return article + ' ' + noun.en;
    }

    function checkNewItemsRemaining() {
        return phraseData.length + nouns.length + verbs.length + subjects.length + articles.length;
    }
}

//TODO PUT NOUNS IN CATEGORIES
