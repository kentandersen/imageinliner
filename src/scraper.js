
var reg = /background.*:.*url\((.*)\)/g;

exports.findAllBackgrounds = function (cssData) {

    var searchData = cssData;
    var search = reg.exec(searchData);
    var backgrounds = [];


    while (search) {
        var fullMatch = search[0];
        var lastSearch = search.index + fullMatch.length;

        backgrounds.push({
            startIndex: search.index,
            endIndex: lastSearch,
            background: fullMatch
        });

        searchData.slice(lastSearch)
        search = reg.exec(searchData);
    }

    return backgrounds;
}
