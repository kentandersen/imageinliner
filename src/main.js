#!/usr/bin/env node

var fs = require("fs");
var path = require("path");
var argv = require("optimist").argv;
var inliner = require("./inliner.js");


// map config parameters
var baseDirectory = process.cwd();
var inputfile = argv.i || argv.inn;
inputfile = path.resolve(baseDirectory, inputfile);

var outputfile;
if(argv.overwrite) {
    outputfile = inputfile;
} else {
    outputfile = argv.o || argv.out;
    if(!outputfile) {
        throw "no output file defined"
    }

    outputfile =  path.resolve(baseDirectory, outputfile);
}

var cssData = inliner(inputfile, {
    maxImageFileSize: argv.limit || 61440,
    rootImagePath: path.resolve(baseDirectory, (argv.root || argv.i || argv.inn)),
    compressOutput: argv.compress

});


//write file
fs.writeFileSync(outputfile, cssData);