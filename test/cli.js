var fs = require("fs");
var path = require("path");
var assert = require("assert")
require('shelljs/global');

    
describe('cli interface', function() {
    var inputFile = "test/fixtures/fixture.css";

    var outputFolder = "output/";
    var outputFile = path.join(outputFolder, "file.css");

    beforeEach(function () {
        mkdir(outputFolder);
    });

    afterEach(function () {
        rm("-fr", outputFolder);
    });

    it("should create output file", function() {
        exec("./bin/imageinliner -i "+ inputFile +" -o " + outputFile);

        assert.ok(fs.existsSync(outputFile));
    });

    it("should create output file when --in and --out param is passed", function() {
        exec("./bin/imageinliner --in "+ inputFile +" --out " + outputFile);

        assert.ok(fs.existsSync(outputFile));
    });

    it("should create output file in multiple sub-folders", function() {
        var deepOutputFile = path.join(outputFolder, "some/folder/again/file.css");
        exec("./bin/imageinliner -i "+ inputFile +" -o " + deepOutputFile);

        assert.ok(fs.existsSync(deepOutputFile));
    });

    it("should not include linebreaks when --compress param is passed", function() {
        exec("./bin/imageinliner -i "+ inputFile +" -o " + outputFile + " --compress");

        var cssData = fs.readFileSync(outputFile, "utf-8");
        assert.equal(cssData.match(/\n/g), null);
    });

    it("should overwrite itself when --overwrite param is passed", function() {
        var copiedFolder = "test/fixtures";
        cp("-r", copiedFolder, outputFolder);

        var copiedFile = path.join(outputFolder, "fixtures", "fixture.css");
        
        exec("./bin/imageinliner -i "+ inputFile +" -o " + outputFile);
        exec("./bin/imageinliner -i "+ copiedFile +" --overwrite");

        var originalData = fs.readFileSync(outputFile, "utf-8");
        var overwriteData = fs.readFileSync(copiedFile, "utf-8");

        assert.equal(originalData, overwriteData);
    });

});








