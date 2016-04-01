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