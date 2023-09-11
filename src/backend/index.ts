import { getProjects } from "./result/result";

// import 'vite/modulepreload-polyfill'
export {}
const fs = require('fs');
 
const projects = getProjects();
// TODO: make watch just re-cycle once
fs.writeFileSync("src/_data/projects.json", JSON.stringify(projects));