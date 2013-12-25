var assert = require("assert")
var inliner = require("../src/inliner.js");
var _ = require("underscore");

describe('inliner with fixture', function(){

    var assertInliner = function(cssFile, options) {
        var result;
        beforeEach(function () {
            result = inliner(cssFile, _.defaults(options || {}, {
                maxImageFileSize:   10240,
                compressOutput:     true
            }));
        });

        it("should return string", function() {
            assert.equal(typeof result, "string");
        });

        // it("should return string", function() {
        //     assert.equal(typeof result, "string");
        // });
    };

    assertInliner("test/fixtures/style.css");
    assertInliner("test/fixtures/compressed.css");
    assertInliner("test/fixtures/root.css", {
        rootImagePath: "test"
    });
    assertInliner("test/fixtures/compressedRoot.css", {
        rootImagePath: "test"
    });
});