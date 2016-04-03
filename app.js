var app = angular.module('nihongo', []);

app.controller('nihongoController', nihongoController);

nihongoController.$inject = ['dataFactory'];

function nihongoController(factory) {

    var ctrl = this;

    var phraseData = factory.getPhraseData();
    var generalTimes = factory.getGeneralTimes();
    var futures = factory.getFutures();
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

        var future = {};
        if(phrase.en.indexOf('FUTURE') > -1) {
            future = getFuture();
        }

        var generalTime = {};
        if(phrase.en.indexOf('GENERAL_TIME') > -1) {
            generalTime = getGeneralTime();
        }
        var subject = getSubject();
        var verb = getVerb();
        var article = getArticle();
        var noun = getNoun(verb);

        var builtPhrase = {};
        builtPhrase.en = phrase.en
            .replace('GENERAL_TIME', generalTime.en)
            .replace('FUTURE', future.en)
            .replace('SUB', subject)
            .replace('VERB', conjugateVerb(phrase, subject, verb))
            .replace('NOUN', chooseArticle(article, noun));

        builtPhrase.jp = phrase.jp
            .replace('GENERAL_TIME', generalTime.jp)
            .replace('FUTURE', future.jp)
            .replace('NOUN', noun.jp)
            .replace('VERB', verb.jp);
        return builtPhrase;
    }

    function getPhrase() {
        if (phraseData.length == 0) {
            return factory.getRandomPhraseData();
        }
        var randomIndex = getRandomIndex(phraseData);
        var phrase = phraseData[randomIndex];
        phraseData.splice(randomIndex, 1);
        return phrase;
    }

    function getSubject() {
        if (subjects.length == 0) {
            return factory.getRandomSubject();
        }
        var randomIndex = getRandomIndex(subjects);
        var subject = subjects[randomIndex];
        subjects.splice(randomIndex, 1);
        return subject;
    }

    function getVerb() {
        if (verbs.length == 0) {
            return factory.getRandomVerb();
        }
        var randomIndex = getRandomIndex(verbs);
        var verb = verbs[randomIndex];
        verbs.splice(randomIndex, 1);
        return verb;
    }

    function getArticle() {
        if (articles.length == 0) {
            return factory.getRandomArticle();
        }
        var randomIndex = getRandomIndex(articles);
        var article = articles[randomIndex];
        articles.splice(randomIndex, 1);
        return article;
    }

    function getRandomIndex(array) {
        return Math.floor(array.length * Math.random());
    }

    function conjugateVerb(phrase, subject, verb) {
        if(phrase.en.indexOf('FUTURE') > -1 && phrase.en.future){
            return verb.en.future;
        }
        if (verb.en.heshe && (subject === 'he' || subject === 'she')) {
            return verb.en.heshe;
        }
        return verb.en.i;
    }

    function getFuture(){
        if (futures.length == 0) {
            return factory.getRandomFuture();
        }
        var randomIndex = getRandomIndex(futures);
        var future = futures[randomIndex];
        futures.splice(randomIndex, 1);
        return future;
    }

    function getGeneralTime(){
        if (generalTimes.length == 0) {
            return factory.getRandomGeneralTime();
        }
        var randomIndex = getRandomIndex(generalTimes);
        var generalTime = generalTimes[randomIndex];
        generalTimes.splice(randomIndex, 1);
        return generalTime;
    }

    // NOUNS
    function getNoun(verb) {
        if (verb.type === 'food') {
            return getFoodNoun();
        }
        else if (verb.type === 'drink') {
            return getDrinkNoun();
        }
    }

    function getFoodNoun() {
        if (nouns.food.length == 0) {
            return factory.getRandomFoodNoun()
        }
        var randomIndex = getRandomIndex(nouns.food);
        var noun = nouns.food[randomIndex];
        nouns.food.splice(randomIndex, 1);
        return noun;
    }

    function getDrinkNoun() {
        if (nouns.drink.length == 0) {
            return factory.getRandomDrinkNoun()
        }
        var randomIndex = getRandomIndex(nouns.drink);
        var noun = nouns.drink[randomIndex];
        nouns.drink.splice(randomIndex, 1);
        return noun;
    }

    function chooseArticle(article, noun) {
        //no article but noun needs one
        if (article === 'noArticle' && noun.article === 'discrete') {
            return 'a ' + noun.en;
        }

        //no article or noun can't have an article
        if (article === 'noArticle' || noun.article === 'none') {
            return noun.en;
        }

        //a becomes an
        if (article === 'a' && noun.article === 'irregular') {
            return 'an ' + noun.en;
        }
        return article + ' ' + noun.en;
    }

    //GENERAL
    function checkNewItemsRemaining() {
        return phraseData.length + verbs.length + subjects.length + articles.length
            + nouns.food.length + nouns.drink.length;
    }
}
