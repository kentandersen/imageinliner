var path = require("path");
var fs = require("fs");
var assert = require("assert")
var cssImage = require("../src/image.js");


describe('image', function(){

    it("should return css inlined background from filepath", function() {
        var cssBackgrounds = cssImage([ 'fixtures/image1.png',], "test");
        assert.equal(cssBackgrounds, "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0ICQMB9xQAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAE1pY3Jvc29mdCBPZmZpY2V/7TVxAAAADUlEQVQoz2NgGAXIAAABEAAB4vyuKAAAAABJRU5ErkJggg==')");
    });

    it("should return css inlined background from root filepath", function() {
        var cssBackgrounds = cssImage([ '/fixtures/image1.png',], "test", {rootImagePath: "test"});
        assert.equal(cssBackgrounds, "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0ICQMB9xQAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAE1pY3Jvc29mdCBPZmZpY2V/7TVxAAAADUlEQVQoz2NgGAXIAAABEAAB4vyuKAAAAABJRU5ErkJggg==')");
    });

    it("should return css inlined background from root filepath with filesystemRoot", function() {
        var filesystemRoot = path.dirname(fs.realpathSync(__filename));
        var cssBackgrounds = cssImage([ '/fixtures/image1.png',], "test", {rootImagePath: filesystemRoot});
        assert.equal(cssBackgrounds, "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0ICQMB9xQAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAE1pY3Jvc29mdCBPZmZpY2V/7TVxAAAADUlEQVQoz2NgGAXIAAABEAAB4vyuKAAAAABJRU5ErkJggg==')");
    });

    it("should return multiple inlined background from filepath", function() {
        var cssBackgrounds = cssImage([ 'fixtures/image1.png', 'fixtures/image2.png', 'fixtures/image3.png' ], "test");
        assert.equal(cssBackgrounds, "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0ICQMB9xQAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAE1pY3Jvc29mdCBPZmZpY2V/7TVxAAAADUlEQVQoz2NgGAXIAAABEAAB4vyuKAAAAABJRU5ErkJggg=='),url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAABCAYAAAAb4BS0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVJREFUeNpiYGBgMP7//z8DCAMEGAAfugYuMnsrdQAAAABJRU5ErkJggg=='),url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAABCAYAAAAb4BS0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVJREFUeNpiYGBgMP7//z8DCAMEGAAfugYuMnsrdQAAAABJRU5ErkJggg==')");
    });

    it("should return multiple inlined background from root filepath", function() {
        var cssBackgrounds = cssImage([ '/fixtures/image1.png', '/fixtures/image2.png', '/fixtures/image3.png' ], "test", {rootImagePath: "test"});
        assert.equal(cssBackgrounds, "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0ICQMB9xQAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAE1pY3Jvc29mdCBPZmZpY2V/7TVxAAAADUlEQVQoz2NgGAXIAAABEAAB4vyuKAAAAABJRU5ErkJggg=='),url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAABCAYAAAAb4BS0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVJREFUeNpiYGBgMP7//z8DCAMEGAAfugYuMnsrdQAAAABJRU5ErkJggg=='),url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAABCAYAAAAb4BS0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVJREFUeNpiYGBgMP7//z8DCAMEGAAfugYuMnsrdQAAAABJRU5ErkJggg==')");
    });

    it("should return multiple inlined background from root filepath", function() {
        var filesystemRoot = path.dirname(fs.realpathSync(__filename));
        var cssBackgrounds = cssImage([ '/fixtures/image1.png', '/fixtures/image2.png', '/fixtures/image3.png' ], "test", {rootImagePath: filesystemRoot});
        assert.equal(cssBackgrounds, "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0ICQMB9xQAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAE1pY3Jvc29mdCBPZmZpY2V/7TVxAAAADUlEQVQoz2NgGAXIAAABEAAB4vyuKAAAAABJRU5ErkJggg=='),url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAABCAYAAAAb4BS0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVJREFUeNpiYGBgMP7//z8DCAMEGAAfugYuMnsrdQAAAABJRU5ErkJggg=='),url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAABCAYAAAAb4BS0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVJREFUeNpiYGBgMP7//z8DCAMEGAAfugYuMnsrdQAAAABJRU5ErkJggg==')");
    });

    it("should return undefined if image files are bigger than maxImageFileSize", function() {
        var cssBackgrounds = cssImage([ 'fixtures/image1.png'], "test", {maxImageFileSize: 1200 });
        assert.equal(typeof cssBackgrounds, "string");

        cssBackgrounds = cssImage([ 'fixtures/image1.png'], "test", {maxImageFileSize: 12 });
        assert.equal(typeof cssBackgrounds, "undefined");
    });

    it("should return undefined if one of the image files are bigger than maxImageFileSize", function() {
        var cssBackgrounds = cssImage([ 'fixtures/image1.png', 'fixtures/image2.png','fixtures/image3.png'], "test", {maxImageFileSize: 1200 });
        assert.equal(typeof cssBackgrounds, "string");

        cssBackgrounds = cssImage([ 'fixtures/image2.png', 'fixtures/image3.png','fixtures/image1.png'], "test", {maxImageFileSize: 120 });
        assert.equal(typeof cssBackgrounds, "undefined");
    });

    it("should not check image file size if maxImageFileSize is 0", function() {
        var cssBackgrounds = cssImage([ 'fixtures/image1.png',], "test", {maxImageFileSize: 0 });
        assert.equal(typeof cssBackgrounds, "string");
    });

    it("should not check image file size if maxImageFileSize is false", function() {
        var cssBackgrounds = cssImage([ 'fixtures/image1.png',], "test", {maxImageFileSize: false });
        assert.equal(typeof cssBackgrounds, "string");
    });

});