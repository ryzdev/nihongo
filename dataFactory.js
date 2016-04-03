app.factory('dataFactory', function () {

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
            en: 'yes, go ahead',
            jp: 'hai, dōzo'
        },
        {
            en: 'SUB VERB NOUN',
            jp: 'NOUN VERB'
        },
        {
            en: 'FUTURE SUB VERB NOUN',
            jp: 'FUTURE NOUN VERB'
        }
    ];

    var nouns = {
        food: [
            {en: 'ice cream', jp: 'aisu kurīmu', article: 'irregular'},
            {en: 'sandwich', jp: 'sandoicchi', article: 'discrete'},
            {en: 'sushi', jp: 'sushi', article: 'none'}
        ],
        drink: [
            {en: 'coffee', jp: 'kōhī'},
            {en: 'juice', jp: 'jūsu'},
            {en: 'beer', jp: 'bīru'}
        ],
        generic: [
            {en: 'this', jp: 'kore', article: 'none'},
            {en: 'that', jp: 'sore', article: 'none'},
            {en: 'that over there', jp: 'are', article: 'none'}
        ]
    };

    angular.forEach(nouns.generic, function (item) {
        nouns.food.push(item);
        nouns.drink.push(item);
    });

    var futures = [
        {en: 'tomorrow', jp: 'ashita'}
    ];


    var verbs = [
        {en: {i: 'eat', heshe: 'eats', future: 'will eat'}, jp: 'o tabemasu', type: 'food'},
        {en: {i: 'drink', heshe: 'drinks', future: 'will drink'}, jp: 'o nomimasu', type: 'drink'},
    ];

    angular.forEach(angular.copy(verbs), function (verb) {
        if(verb.en.future) {
            verbs.push({jp: verb.jp, type: verb.type, en: {i: verb.en.future}});
        }
    });

    var subjects = [
        'I', 'you', 'he', 'she', 'we', 'they'
    ];

    var articles = [
        'a', 'the', 'noArticle'
    ];

    function getRandomIndex(array) {
        return Math.floor(array.length * Math.random());
    }

    return {
        getPhraseData: function () {
            return angular.copy(phraseData);
        },
        getRandomPhraseData: function () {
            return phraseData[getRandomIndex(phraseData)];
        },
        getNouns: function () {
            return angular.copy(nouns);
        },
        getRandomFoodNoun: function () {
            return nouns.food[getRandomIndex(nouns.food)];
        },
        getRandomDrinkNoun: function () {
            return nouns.drink[getRandomIndex(nouns.drink)];
        },
        getVerbs: function () {
            return angular.copy(verbs);
        },
        getRandomVerb: function () {
            return verbs[getRandomIndex(verbs)];
        },
        getSubjects: function () {
            return angular.copy(subjects);
        },
        getRandomSubject: function () {
            return subjects[getRandomIndex(subjects)];
        },
        getArticles: function () {
            return angular.copy(articles);
        },
        getRandomArticle: function () {
            return articles[getRandomIndex(articles)];
        },
        getFutures: function () {
            return angular.copy(futures);
        },
        getRandomFuture: function () {
            return futures[getRandomIndex(futures)];
        }
    }
});