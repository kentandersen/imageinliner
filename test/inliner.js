var assert = require("assert")
var inliner = require("../src/inliner.js");
var _ = require("underscore");

describe('inliner with fixture', function(){

    var assertInliner = function(cssFile, totalBackgrounds, options) {

        var buildArguments = function(options) {
            return _.defaults(options || {}, {
                maxImageFileSize:   10240,
                compressOutput:     true
            });
        };

        it("should return string", function() {
            result = inliner(cssFile, buildArguments(options));
            assert.equal(typeof result, "string");
        });

        it("should inline correct amount of backgrounds", function() {
            result = inliner(cssFile, buildArguments(options));
            assert.equal(result.match(/url\(\'data/g).length, totalBackgrounds);
        });
    };

    assertInliner("test/fixtures/style.css", 9);
    assertInliner("test/fixtures/compressed.css", 8);
    assertInliner("test/fixtures/root.css", 9, {
        rootImagePath: "test"
    });
    assertInliner("test/fixtures/compressedRoot.css", 8, {
        rootImagePath: "test"
    });
});