// const path = require("path");
var service = require("./envTest");
const rawArgv = process.argv.slice(2);
const args = require("minimist")(rawArgv, {
  boolean: [
    // build
    "modern",
    "report",
    "report-json",
    "inline-vue",
    "watch",
    // serve
    "open",
    "copy",
    "https",
    // inspect
    "verbose",
  ],
});
const command = args._[0];
console.log(command, args, rawArgv);
service(command, args, rawArgv);
