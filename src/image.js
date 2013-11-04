var mime = require("mime");
var path = require("path");
var fs = require("fs");


var cleanXMLData = function(fileData) {
    // remove linebreaks
    fileData = fileData.replace(/(\r\n|\n|\r)/gm,'');
    // removes xml comments
    fileData = fileData.replace(/<!--[^>]*-->/g, '');
    // remove dubble spaces
    fileData = fileData.replace(/ +(?= )/g,'');
    // fileData = fileData.replace(/\'/gm,"\'");

    return fileData;
}


var getFullPath = function(imagePath, cssFilePath, rootPath) {

    if(imagePath.charAt(0) === "/") {
        if(!rootPath) {
            throw "rootPath is not set, but " + imagePath + " requires rootPath";
        }
        return path.join(rootPath, imagePath);
    } else {
        return path.join(cssFilePath, imagePath);
    }
};

var createCSSBackgroundImage = function(inlineImages) {
    var css = 'background-image:';

    inlineImages.forEach(function(image, index) {
        if(index !== 0) {
            css += ","
        }

        css += "url('data:" + image.mimeType + ";"+ image.encoding +"," + image.imageData + "')";
    });
    return css + ';';
}


module.exports = function (imagePaths, cssFilePath, rootPath) {
  
    var inlineImages = [];
    imagePaths.forEach(function(imagePath) {
        var imageData, encoding;

        var fullImagePath = getFullPath(imagePath, cssFilePath, rootPath);

        var mimeType = mime.lookup(fullImagePath);

        if(mimeType === "image/svg+xml") {
            imageData = fs.readFileSync(fullImagePath, "utf-8");
            imageData = cleanXMLData(imageData);
            encoding = "utf-8";
            
        } else {
            imageData = fs.readFileSync(fullImagePath).toString('base64');
            encoding = "base64"
        }
        
        inlineImages.push({
            imageData: imageData,
            encoding: encoding,
            mimeType: mimeType
        });
    });

    return createCSSBackgroundImage(inlineImages);
};


