import { getProjects } from "./result/result";
// import { config } from "./../../project.config.js"
const config = require("./../../project.config.js");

// import 'vite/modulepreload-polyfill'
export {}
const fs = require('fs');
 
const projects = getProjects();
// TODO: make watch just re-cycle once
fs.writeFileSync("src/_data/tag.json", JSON.stringify(projects));
// fs.writeFileSync("src/_data/projects.json", JSON.stringify(projects));