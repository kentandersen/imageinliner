#!/usr/bin/env node

var fs = require("fs");
var mime = require("mime");
var path = require("path");
var inline = require("./inline");


var basePath = process.env.PWD;

var listOfFiles = process.argv.splice(2);
if(!listOfFiles) {
    return;
}

listOfFiles.forEach(function (filePath) {
    var cssFilePath = path.dirname(path.join(basePath, filePath));
    console.log(cssFilePath);
    var reg = /background.*:.*url\((.*)\)/;

    fs.readFile(filePath, "utf-8", function (err, fileData) {
        if (err) throw err;
        
        var fileMimeType = mime.lookup(filePath);
        if(fileMimeType !== "text/css") {
            throw "Filetype has to be css";
        }
        
        var outputFilePath = filePath;
        var strArray = fileData.split("\n");
        var modifiedStrArray = strArray.slice(0);
        var indexOffset = 0;
        
        strArray.forEach(function(line, index){
            var extracted = reg.exec(line);
            if(extracted && extracted[1]) {
                if(cssImage = inline.inlineImage(extracted[1], cssFilePath)) {
                    modifiedStrArray.splice(++indexOffset + index, 0, cssImage);
                }
            }
        });

        fs.writeFile(outputFilePath, modifiedStrArray.join("\n"), function (error) {
            if (error) throw error;
            console.log('File saved: ' + outputFilePath);
        });
    });
});

