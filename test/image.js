
var assert = require("assert")
var cssImage = require("../src/image.js");


describe('image', function(){
    describe('inline image', function(){
        it("should return css inlined background from filepath", function() {
            var cssBackgrounds = cssImage([ 'fixtures/image1.png',], "test", "");
            assert.equal(cssBackgrounds, "background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0ICQMB9xQAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAE1pY3Jvc29mdCBPZmZpY2V/7TVxAAAADUlEQVQoz2NgGAXIAAABEAAB4vyuKAAAAABJRU5ErkJggg==');");

        });
        it("should return multiple inlined background from filepath", function() {
            var cssBackgrounds = cssImage([ 'fixtures/image1.png', 'fixtures/image2.png', 'fixtures/image3.png' ], "test", "");
            assert.equal(cssBackgrounds, "background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0ICQMB9xQAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAE1pY3Jvc29mdCBPZmZpY2V/7TVxAAAADUlEQVQoz2NgGAXIAAABEAAB4vyuKAAAAABJRU5ErkJggg=='),url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAABCAYAAAAb4BS0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVJREFUeNpiYGBgMP7//z8DCAMEGAAfugYuMnsrdQAAAABJRU5ErkJggg=='),url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAABCAYAAAAb4BS0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABVJREFUeNpiYGBgMP7//z8DCAMEGAAfugYuMnsrdQAAAABJRU5ErkJggg==');");

        });
    });

});