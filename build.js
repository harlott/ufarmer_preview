const path = require("path")
const fs = require("fs-extra")
const languages = require("./config.json"); 
const dataPath = path.join(__dirname, "cms/data");
const modulesPath =  path.join(__dirname, "node_modules");
const sitePath = path.join(__dirname, "site");
const { exec } = require("child_process");

// READ AND COPY SITES FOR LANG

// COPY PAGES
exec("rsync -zrvh data/pages/" + languages.lang + "/  " +  " src/pages", {maxBuffer: 2048 * 500}, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

// COPY BLOG
exec("rsync -zrvh data/blog/" + languages.lang + "/  src/pages/blog", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

