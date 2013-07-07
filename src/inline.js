var fs = require("fs");
var mime = require("mime");
var path = require("path");

function cleanFileData(fileData) {
    // remove linebreaks
    fileData = fileData.replace(/(\r\n|\n|\r)/gm,'');
    // removes xml comments
    fileData = fileData.replace(/<!--[^>]*-->/g, '');
    // remove dubble spaces
    fileData = fileData.replace(/ +(?= )/g,'');
    // fileData = fileData.replace(/\'/gm,"\'");

    return fileData;
}

function createCSSBackgroundImage(mimeType, encoding, fileData) {
    var css = '    background-image:';
    css += "url('data:" + mimeType + ";"+ encoding+"," + fileData + "');";
    return css;    
}

function inlineImage(imagePath, cssFileBasePath) {

    imagePath = imagePath.replace(/\"|\'/g, "");
    imagePath = path.join(basePath, cssFileBasePath, imagePath);
    var mimeType = mime.lookup(imagePath);

    if(fs.statSync(imagePath).size > fileSizeLimit) {
        return; 
    }

    var cssImage;
    if(mimeType === "image/svg+xml") {
        var fileData = fs.readFileSync(imagePath, "utf-8");
        cssImage = createCSSBackgroundImage(mimeType, "utf-8", cleanFileData(fileData));            
    } else {
        var fileData = fs.readFileSync(imagePath).toString('base64');
        cssImage = createCSSBackgroundImage(mimeType, "base64", fileData);
    }

    return cssImage;
}

exports.inline = inlineImage;