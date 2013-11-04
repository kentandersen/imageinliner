
var fs = require("fs");
var assert = require("assert")
var scraper = require("../src/scraper.js");
var cssImage = require("../src/image.js");

var cssFixture = fs.readFileSync("test/fixture.css", "utf-8");

describe('scraper', function(){
    describe('findAllBackgrounds', function(){

        it('should find all background images', function(){
            var cssBackgrounds = scraper.findAllBackgrounds(cssFixture);

            // assert.equal(cssBackgrounds.length, 5);
            assert.equal(cssBackgrounds.length, 4);
        });

        it('should return correct startIndex', function(){
            var cssBackgrounds = scraper.findAllBackgrounds(cssFixture);

            var actual = [11, 62, 110, 164, 356];
            cssBackgrounds.forEach(function(background, index) {
                assert.equal(actual[index], background.startIndex);
            });
        });


        it('should return correct endIndex', function(){
            var cssBackgrounds = scraper.findAllBackgrounds(cssFixture);

            var actual = [41, 92, 147, 340, 392];
            cssBackgrounds.forEach(function(background, index) {
                assert.equal(actual[index], background.endIndex);
            });
        });
    });

    describe('getImageUrl', function() {

        it('should get correct image url from css background', function() {
            var imageUrl = scraper.getImageUrl('background: url("image1.png");');
            assert.equal(imageUrl[0], "image1.png");

            imageUrl = scraper.getImageUrl('background-image: url("image3.png") ;');
            assert.equal(imageUrl[0], "image3.png");

            imageUrl = scraper.getImageUrl("background-image: url('image4.png') ;");
            assert.equal(imageUrl[0], "image4.png");

            imageUrl = scraper.getImageUrl("background-image: url(image5.png);");
            assert.equal(imageUrl[0], "image5.png");
        });

        it('should get correct image url for multiple background', function() {
            var imageUrl = scraper.getImageUrl('background: transparent url("image4.png") no-repeat center center, transparent url("image5.png") no-repeat center center, transparent url("image6.png") no-repeat center center;');

            assert.equal(imageUrl[0], "image4.png")
            assert.equal(imageUrl[1], "image5.png")
            assert.equal(imageUrl[2], "image6.png")
        });

    });

});


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



