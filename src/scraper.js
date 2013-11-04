var multipleExec = function(reg, matcher, callback, context) {

    var searchData = matcher;
    var search = reg.exec(searchData);
    var offset = 0;

    while (search) {
        var fullMatch = search[0];

        var start = search.index + offset;
        var endIndex = start + fullMatch.length;

        callback.call(context || this, start, endIndex, search);

        offset = endIndex;

        searchData = matcher.substr(offset);

        search = reg.exec(searchData);
    }


};


exports.findAllBackgrounds = function (cssData) {

    var backgrounds = [];
    var reg = /background.*:.*url\((.*)\).*?(;|})/m;
    
    multipleExec(reg, cssData, function (start, endIndex, extracted) {
        backgrounds.push({
            startIndex: start,
            endIndex:   endIndex,
            background: extracted[0]
        });
    });

    return backgrounds;
};

exports.getImageUrl = function (background) {
    var reg = /url\((.*?)\)/;
    var imageUrls = [];

    multipleExec(reg, background, function (start, endIndex, extracted) {
        var imagePath = extracted[1];
        imagePath = imagePath.replace(/\"|\'/g, "");

        imageUrls.push(imagePath);
    });

    return imageUrls;
}
