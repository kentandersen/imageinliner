var assert = require("assert")
var fs = require("fs");
var inliner = require("../src/inliner.js");
var _ = require("underscore");

describe('inliner with fixture', function(){

    var assertInlinerString = function(cssFile, options) {
        var css = fs.readFileSync(cssFile, "utf-8");

        var buildArguments = function(options) {
            return _.defaults(options || {}, {
                imageBasePath:      "test/fixtures",
                maxImageFileSize:   10240,
                compressOutput:     true
            });
        };

        it("should return string when using files", function() {
            result = inliner.css(css, buildArguments(options));
            assert.equal(typeof result, "string");
        });
    };

    var assertInlinerFile = function(cssFile, options) {

        var buildArguments = function(options) {
            return _.defaults(options || {}, {
                maxImageFileSize:   10240,
                compressOutput:     true
            });
        };

        it("should return string when using files", function() {
            result = inliner.file(cssFile, buildArguments(options));
            assert.equal(typeof result, "string");
        });
    };

    assertInlinerFile("test/fixtures/style.css");
    assertInlinerFile("test/fixtures/compressed.css");
    assertInlinerFile("test/fixtures/root.css", {
        rootImagePath: "test"
    });
    assertInlinerFile("test/fixtures/compressedRoot.css", {
        rootImagePath: "test"
    });

    assertInlinerString("test/fixtures/style.css");
    assertInlinerString("test/fixtures/compressed.css");
    assertInlinerString("test/fixtures/root.css", {
        rootImagePath: "test"
    });
    assertInlinerString("test/fixtures/compressedRoot.css", {
        rootImagePath: "test"
    });
});