#!/usr/bin/env node
var path = require('path');
var fs = require('fs');
var src = path.join(path.dirname(fs.realpathSync(__filename)), '../src');
require(src + '/main.js');