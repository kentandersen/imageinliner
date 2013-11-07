
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



