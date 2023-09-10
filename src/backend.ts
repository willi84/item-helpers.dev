// import 'vite/modulepreload-polyfill'
export {}
const fs = require('fs');
 
const projects = {
    time: Math.floor(Date.now() / 1000),
    projects: ['bahn-helpers.dev', 'tiny-helpers.dev', 'ng-helpers.dev']
}
// TODO: make watch just re-cycle once
fs.writeFileSync("src/_data/projects.json", JSON.stringify(projects));