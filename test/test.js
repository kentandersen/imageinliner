
var fs = require("fs");
var assert = require("assert")
var scraper = require("../src/scraper.js");

var cssFixture = fs.readFileSync("test/fixture.css", "utf-8");




describe('scrape css', function(){
    it('should find all background images', function(){
        var cssBackgrounds = scraper.findAllBackgrounds(cssFixture);
        // console.log(cssBackgrounds);

        console.log(cssFixture[ cssBackgrounds[3].endIndex -1 ]);
    });
})

