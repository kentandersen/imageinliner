var parse = require('css-parse');
var stringify = require('css-stringify');
var _ = require("underscore");
var fs = require("fs");
var path = require("path");
var image = require("./image.js");


var multipleExec = function(reg, matcher, callback, context) {

    var searchData = matcher;
    var search = reg.exec(searchData);
    var offset = 0;

    while (search) {
        var fullMatch = search[0];

        var start = search.index + offset;
        var endIndex = start + fullMatch.length;

        callback.call(context || this, search);

        offset = endIndex;

        searchData = matcher.substr(offset);

        search = reg.exec(searchData);
    }
};

var getImageUrl = function (background) {
    var reg = /url\((.*?)\)/;
    var imageUrls = [];

    multipleExec(reg, background, function (extracted) {
        var imagePath = extracted[1];
        imagePath = imagePath.replace(/\"|\'/g, "");

        imageUrls.push(imagePath);
    });

    return imageUrls;
};

var inlineImages = function(parsedCss, imageBasePath, options) {
    // loop trough all selectors (rules)
    _.each(parsedCss.stylesheet.rules, function(rule, index) {
        var declarations = rule.declarations;

        // skip for mediaqueries etc
        if(rule.type !== 'rule' || !declarations) {
            return;
        }

        // and then all declarations for that selector
        for (var i = 0, length = declarations.length; i < length; i++) {
            var declaration = declarations[i];

            // find background declarations,
            if(declaration.property && declaration.property.indexOf("background") > -1) {

                // with a url()
                var backgroundImages = getImageUrl(declaration.value);
                if(backgroundImages.length === 0) {
                    break;
                }

                // where images is below the legal maxImageFileSize
                var inlinedBackground = image(backgroundImages, imageBasePath, options);
                if(!inlinedBackground) {
                    break;
                }

                // and add data-uri background images declatration after the current
                declarations.splice(i+1, 0, {
                    type: 'declaration',
                    property: 'background-image',
                    value: inlinedBackground
                });
                // add to length of the array

                length++;
                // and skip the newly added for next run-loop
                i++;
            }
        }
    });
};


module.exports = function (cssFile, options) {
    options = options || {};
    var cssData = fs.readFileSync(cssFile, "utf-8");
    var parsedCss = parse(cssData);

    inlineImages(parsedCss, path.dirname(cssFile), options);

    return stringify(parsedCss, { compress: options.compressOutput });
};