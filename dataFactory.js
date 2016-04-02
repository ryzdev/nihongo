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
            en: 'SUB VERB NOUN',
            jp: 'NOUN VERB'
        }
    ];

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

    return {
        getPhraseData: function () {
            return angular.copy(phraseData);
        },
        getNouns: function () {
            return angular.copy(nouns);
        },
        getVerbs: function () {
            return angular.copy(verbs);
        },
        getSubjects: function () {
            return angular.copy(subjects);
        },
        getArticles: function () {
            return angular.copy(articles);
        }
    }
});