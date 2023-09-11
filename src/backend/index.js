"use strict";
exports.__esModule = true;
var result_1 = require("./result/result");
var fs = require('fs');
var projects = (0, result_1.getProjects)();
// TODO: make watch just re-cycle once
fs.writeFileSync("src/_data/projects.json", JSON.stringify(projects));
