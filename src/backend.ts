// import 'vite/modulepreload-polyfill'
export {}
// console.log('run');
const fs = require('fs');
 
const projects = {
    time: new Date().getTime(),
    projects: ['bahn-helpers.dev', 'tiny-helpers.dev', 'ng-helpers.dev']
}
// TODO: make watch just re-cycle once
fs.writeFileSync("src/_data/projects.json", JSON.stringify(projects));